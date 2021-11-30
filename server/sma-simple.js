const binance = require('./jobs/connect');
const botRules = require('./core/bot-rules');
const {log} = require('./core/logs');
const {simpleHighAVG, simpleLowAVG} = require('./core/math');

// Models
const {KlineStreamModel, HistoricalTickers, KlineDataStreamModel} = require('./models/assets');
const {DemoAccount} = require('./models/trades');

// Inicialization
let buff = [];
const account = new DemoAccount({ initialBalance: 1000 });
const symbolToTrade = 'BTCUSDT';
const interval = '1m';

binance.klines(symbolToTrade, interval, {
    limit: 21
}).then(res=>{
    let index = 0;
    let treatRes = new HistoricalTickers(symbolToTrade, res.data).data
    buff = [...buff, ...treatRes];

    // setInterval(()=>{
    //     klineCallbacks.message(false, treatRes[index]);
    //     index++;
    // }, 10);
});

const klineCallbacks = {
    open: () => log.currentResult(account),
    close: () => binance.logger.log('closed'),
    message: (json, data) => {
        let parsed = json ? new KlineStreamModel(JSON.parse(json)) : data; 
        
        if(parsed){
            let curr = parsed.kline || parsed;
            let trade = account.openedPositions.length && account.openedPositions.find(position=>position.symbol === parsed.symbol);
    
            account.updateBalance();
            trade && trade.update(curr.closePrice, account);
    
            console.log('--------------------------------------------');
            console.log('Symbol: ' + symbolToTrade);
            console.log('High Average: ' + simpleHighAVG(buff));
            console.log('Low Average: ' + simpleLowAVG(buff));
            console.log('Current price: ' + curr.closePrice);
            console.log('--------------------------------------------');
            log.currentResult(account);
    
            // if(curr.startTime !== buff[buff.length-1].startTime) {
                buff.splice(0, 1);
                buff.push(curr);
            // }
            if(!trade) {
                if(botRules.crossSma({data: buff, period: 21, direction: 'up'})){
                    account.openPosition({
                        symbol: symbolToTrade,
                        quantity: 0.01,
                        openPrice: curr.closePrice,
                    });
                }
            } else {
                if(botRules.crossSma({data: buff, period: 21, direction: 'down'})){
                    account.closePosition(symbolToTrade, curr.closePrice)
                }
                trade.update(curr.closePrice, account);
            }
        }
    }
}
const sand = binance.klineWS(symbolToTrade, interval, klineCallbacks);

