const binance = require('./jobs/connect');

// Models
const {KlineStreamModel, HistoricalTickers} = require('./models/assets');
const {DemoAccount} = require('./models/trades');

// Inicialization
const account = new DemoAccount({
    initialBalance: 1000
});

const klineCallbacks = {
    open: () => binance.logger.log('open'),
    close: () => binance.logger.log('closed'),
    message: data => {
        let parsed = new KlineStreamModel(JSON.parse(data));
        let trade = account.trades.find(position=>position.symbol === parsed.symbol)

        account.updateBalance();
        trade.update(parsed);
    }
}
// const sand = binance.klineWS('sandusdt', '1m', klineCallbacks);
// const btc = binance.klineWS('btcusdt', '1m', klineCallbacks);


// setInterval(()=>console.log(account), 5000);


// // unsubscribe the stream above
// setTimeout(() => binance.unsubscribe(kline), 60000)


binance.klines('SANDUSDT', '1d', {
    limit: 1000,
}).then(response=>{
    let history = new HistoricalTickers('SANDUSDT', response.data).data;
    let index = 0;

    account.openPosition({
        symbol: 'SANDUSDT',
        quantity: 1500,
        openPrice: history[0].closePrice
    });

    let backtest = setInterval(()=>{
        if(!history[index]) {
            clearInterval(backtest);
            return
        } else {
            let curr = history[index];
            let trade = account.trades.find(position=>position.symbol === curr.symbol);
    
            account.updateBalance();
            trade.update(curr.closePrice);
            index++;
        }
        console.log(account)
    }, 1);
});


