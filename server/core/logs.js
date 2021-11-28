const log = {
    currentResult: (account)=>{
        console.log(
            '\n--------------------------------------------------------------\n' +
            'Current Balance: ' + account.balance.toFixed(2) + '\n' +
            'Open positions: ' + account.openedPositions.length + '\n' +
            'Close positions: ' + account.closedPositions.length + '\n' +
            '--------------------------------------------------------------\n'
        );
    }
}

module.exports = {
    log
}