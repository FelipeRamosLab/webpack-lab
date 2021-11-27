const binance = require('../jobs/connect');

class DemoAccount {
    constructor({
        initialBalance,
    }){
        this.availableBalance = initialBalance;
        this.balance = this.availableBalance;
        this.openedPositions = [];
        this.closedPositions = [];
    }

    async openPosition({symbol, quantity, openPrice}){
        // const ticker = await binance.tickerPrice(symbol);
        // const openTradePrice = openPrice //  Number(ticker.data.price);
        const amount = openPrice * quantity;

        this.openedPositions.push(new Position({
            symbol,
            openPrice: openPrice,
            quantity
        }));
        this.availableBalance = this.availableBalance - amount;
    }

    closePosition(symbol){
        let current = [...this.openedPositions];
        
        current.map((curr, i)=>{
            if(curr.symbol === symbol) {
                const spliced = this.openedPositions.splice(i, 1);
                this.closedPositions.push(spliced[0]);
                this.availableBalance = this.availableBalance + spliced[0].tradeBalance;
            }
        });

    }

    updateBalance(){
        let result = 0;

        this.openedPositions.map(trade=>{
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
        this.tradeBalance = (this.openPrice * this.quantity);
        this.pl = -(this.tradeBalance * 0.15);
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