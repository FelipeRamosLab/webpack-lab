const binance = require('./jobs/connect');
const botRules = require('./core/bot-rules');
const {log} = require('./core/logs');
const {simpleHighAVG} = require('./core/math');

// Models
const {KlineStreamModel, HistoricalTickers} = require('./models/assets');
const {DemoAccount} = require('./models/trades');

// Inicialization
let buff = [];
const account = new DemoAccount({ initialBalance: 1000 });
const symbolToTrade = 'COCOSUSDT';
const interval = '1m';

binance.klines(symbolToTrade, interval, {
    limit: 60
}).then(res=>{
    buff = [...buff, ...new HistoricalTickers(symbolToTrade, res.data).data];
});

binance.tickerPrice(symbolToTrade).then(res=>{
    const klineCallbacks = {
        open: () => log.currentResult(account),
        close: () => binance.logger.log('closed'),
        message: data => {
            let parsed = new KlineStreamModel(JSON.parse(data));            
            let trade = account.openedPositions.length && account.openedPositions.find(position=>position.symbol === parsed.symbol);
            let prev2 = buff[buff.length - 3];
            let prev = buff[buff.length - 2];
            let curr = parsed.kline;

            account.updateBalance();
            trade && trade.update(curr.closePrice, account);

            console.log('--------------------------------------------');
            console.log('Symbol: ' + symbolToTrade)
            console.log('Top Average: ' + simpleHighAVG(buff))
            console.log('Current price: ' + curr.closePrice)
            console.log('--------------------------------------------');
            if(curr.startTime !== buff[buff.length-1].startTime) {
                buff.splice(0, 1);
                buff.push(curr);
            }
            if(!trade) {
                if(botRules.topBreak(prev, curr)){
                    account.openPosition({
                        symbol: symbolToTrade,
                        quantity: 80,
                        openPrice: curr.closePrice,
                    });
                }
            } else {
                if(botRules.bottomBreak(prev, curr)){
                    account.closePosition(symbolToTrade, curr.closePrice)
                }
                trade.update(curr.closePrice, account);
                log.currentResult(account);
            }
        }
    }
    const sand = binance.klineWS(symbolToTrade, interval, klineCallbacks);
});
