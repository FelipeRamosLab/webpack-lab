const binance = require('./jobs/connect');
const botRules = require('./core/bot-rules');

// Models
const {KlineStreamModel, KlineDataStreamModel, HistoricalTickers} = require('./models/assets');
const {DemoAccount} = require('./models/trades');

// Inicialization
const account = new DemoAccount({
    initialBalance: 1000
});
let buff = [];
const symbolToTrade = 'SANDUSDT';
const interval = '1m';
binance.klines(symbolToTrade, interval, {
    limit: 3
}).then(res=>{
    buff = [...buff, ...new HistoricalTickers(symbolToTrade, res.data).data];
});

binance.tickerPrice(symbolToTrade).then(res=>{
    const klineCallbacks = {
        open: () => binance.logger.log('open'),
        close: () => binance.logger.log('closed'),
        message: data => {
            let parsed = new KlineStreamModel(JSON.parse(data));            
            let trade = account.openedPositions.length && account.openedPositions.find(position=>position.symbol === parsed.symbol);
            let prev2 = buff[buff.length - 3];
            let prev = buff[buff.length - 2];
            let curr = parsed.kline;

            account.updateBalance();
            trade && trade.update(curr.closePrice);
            buff.splice(0, 1);
            buff.push(curr);

            if(!trade) {
                if(botRules.topBreak(prev, curr)){
                    account.openPosition({
                        symbol: symbolToTrade,
                        quantity: 50,
                        openPrice: curr.closePrice
                    });
                }
            } else {
                if(botRules.bottomBreak(prev2, prev)){
                    account.closePosition(symbolToTrade)
                }
                console.log(account.closedPositions, account.balance)
                account.updateBalance();
                trade.update(curr.closePrice);
            }
        }
    }
    const sand = binance.klineWS(symbolToTrade, interval, klineCallbacks);
})

// const btc = binance.klineWS('btcusdt', '1m', klineCallbacks);


// setInterval(()=>console.log(account), 5000);


// // unsubscribe the stream above
// setTimeout(() => binance.unsubscribe(kline), 60000)

// const symbolToTrade = 'BTCUSDT';

// binance.klines(symbolToTrade, '15m', {
//     limit: 1000,
// }).then(response=>{
//     let history = new HistoricalTickers(symbolToTrade, response.data).data;
//     let index = 0;

//     let backtest = setInterval(()=>{
//         if(!history[index]) {
//             clearInterval(backtest);
//             return
//         } else {
//             if(index > 1){
//                 let prev = history[index - 1];
//                 let curr = history[index];
//                 let trade = account.openedPositions.find(position=>position.symbol === curr.symbol);

//                 if(!trade) {
//                     if(botRules.topBreak(prev, curr)){
//                         account.openPosition({
//                             symbol: symbolToTrade,
//                             quantity: 0.001,
//                             openPrice: curr.openPrice
//                         });
//                     }
//                 } else {
//                     if(botRules.bottomBreak(prev, curr)){
//                         account.closePosition(symbolToTrade)
//                         console.log(trade, account.balance)
//                     }

//                     account.updateBalance();
//                     trade.update(curr.closePrice);
//                 }
//             }
            
//             index++;
//         }
//     }, 10);
// });


