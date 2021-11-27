const binance = require('../jobs/connect');

class DemoAccount {
    constructor({
        initialBalance,
    }){
        this.availableBalance = initialBalance;
        this.balance = this.availableBalance;
        this.trades = [];
    }

    async openPosition({symbol, quantity, openPrice}){
        // const ticker = await binance.tickerPrice(symbol);
        // const openTradePrice = openPrice //  Number(ticker.data.price);
        const amount = openPrice * quantity;

        this.trades.push(new Position({
            symbol,
            openPrice: 0.04,
            quantity
        }));
        this.availableBalance = this.availableBalance - amount;
    }

    updateBalance(){
        let result = 0;

        this.trades.map(trade=>{
            result = result + trade.tradeBalance;
        });

        this.balance = this.availableBalance + result;
    }
}

class Position {
    constructor({
        symbol,
        openPrice,
        quantity,
    }){
        this.symbol = symbol;
        this.openTime = Date.now();
        this.openPrice = openPrice;
        this.quantity = quantity;
        this.closePrice;
        this.pl = 0;
        this.tradeBalance = (this.openPrice * this.quantity) + this.pl;
    }
    
    update(currentPrice){
        this.pl = (currentPrice - this.openPrice) * this.quantity;
        this.tradeBalance = (this.openPrice * this.quantity) + this.pl;

        return {
            pl: this.pl,
            tradeBalance: this.tradeBalance
        };
    }
}

module.exports = {
    DemoAccount,
    Position,
}