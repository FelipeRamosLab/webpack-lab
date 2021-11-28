const binance = require('../jobs/connect');
const {commission} = require('../../binance-config.json');

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
        const newPosition = new Position({
            symbol,
            openPrice: openPrice,
            quantity,
            tradeCommission: commission
        });

        this.openedPositions.push(newPosition);
        this.availableBalance = this.availableBalance - newPosition.calculations.grossBalance();
    }

    closePosition(symbol, currentPrice){
        let current = [...this.openedPositions];
        
        current.map((curr, i)=>{
            if(curr.symbol === symbol) {
                curr.commission += curr.calculations.commission(commission);
                currentPrice && curr.update(currentPrice);

                const spliced = this.openedPositions.splice(i, 1);
                this.closedPositions.push(spliced[0]);
                this.availableBalance = this.availableBalance + spliced[0].tradeBalance;
            }
        });
        this.updateBalance();
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
        tradeCommission,
    }){
        this.symbol = symbol;
        this.openTime = Date.now();
        this.openPrice = openPrice;
        this.currentPrice = this.openPrice;
        this.quantity = quantity;
        this.closePrice;
        this.grossBalance = this.calculations.grossBalance();
        this.commission = this.calculations.commission(tradeCommission);
        this.inicialBalance = this.grossBalance;
        this.pl = this.calculations.pl();
        this.tradeBalance = this.calculations.tradeBalance();
    }
    
    update(currentPrice, accountToUpdate){
        this.currentPrice = currentPrice;
        this.grossBalance = this.calculations.grossBalance();
        this.pl = this.calculations.pl();
        this.tradeBalance = this.calculations.tradeBalance();

        if(accountToUpdate) {
            accountToUpdate.updateBalance();
        }

        return {
            pl: this.pl,
            tradeBalance: this.tradeBalance
        };
    }

    calculations = {
        grossBalance: ()=> this.currentPrice * this.quantity,
        commission: (tradeCommission)=> this.calculations.grossBalance() * ((tradeCommission || this.commission) / 100),
        pl: ()=> (this.calculations.grossBalance() - this.inicialBalance) - this.commission,
        tradeBalance: ()=> this.inicialBalance + this.calculations.pl(),
    }
}

module.exports = {
    DemoAccount,
    Position,
}