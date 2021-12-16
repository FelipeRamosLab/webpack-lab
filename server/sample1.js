const express = require('express');
const app = express();
const binance = require('./jobs/connect');
const botRules = require('./core/bot-rules');
const {log} = require('./core/logs');
const {simpleHighAVG, simpleLowAVG, calcPorcentage} = require('./core/math');
const {SMA} = require('technicalindicators');

// Routes
const {getBalance} = require('./routes/get-balance');

// Models
const {KlineStreamModel, HistoricalTickers, KlineDataStreamModel} = require('./models/assets');
const {DemoAccount} = require('./models/trades');

// Inicialization
let buff = [];
const account = new DemoAccount({ initialBalance: 1000 });
const symbolToTrade = 'COCOSUSDT';
const interval = '4h';

binance.klines(symbolToTrade, interval, {
    limit: 1000
}).then(res=>{
    let index = 0;
    let treatRes = new HistoricalTickers(symbolToTrade, res.data).data
    buff = [...buff, ...treatRes];

    setInterval(()=>{
        klineCallbacks.message(false, treatRes[index]);
        index++;
    }, 10);
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
    
            log.assetCurrentData({symbolToTrade, interval, curr});
            log.currentResult(account);

            if(curr.isKlineClosed) {
                buff.splice(0, 1);
                buff.push(curr);
            } else {
                buff[buff.length - 1] = curr;
            }

            
            if(!trade) {
                if(botRules.topBreak(buff)){
                    account.openPosition({
                        symbol: symbolToTrade,
                        quantity: 0.01,
                        openPrice: curr.closePrice,
                    });
                }
            } else {
                if(botRules.bottomBreak(buff)){
                    account.closePosition(symbolToTrade, curr.closePrice)
                }
                trade.update(curr.closePrice, account);
            }
        }
    }
}
// const sand = binance.klineWS(symbolToTrade, interval, klineCallbacks);
