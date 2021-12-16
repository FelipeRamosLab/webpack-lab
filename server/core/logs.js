const log = {
    currentResult: (account)=>{
        console.log(
            '--------------------------------------------------------------\n' +
            'Current Balance: ' + account.balance.toFixed(2) + '\n' +
            'Open positions: ' + account.openedPositions.length + '\n' +
            'Close positions: ' + account.closedPositions.length + '\n' +
            '--------------------------------------------------------------'
        );
    },
    assetCurrentData: ({symbolToTrade, interval, curr})=>{
        console.log('--------------------------------------------');
        console.log('Symbol: ' + symbolToTrade);
        console.log('Interval: ' + interval);
        console.log('Time: ' + Date());
        console.log('Current price: ' + curr.closePrice);
        console.log('--------------------------------------------');
    }
}

module.exports = {
    log
}