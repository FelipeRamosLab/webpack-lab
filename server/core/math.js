function simpleHighAVG(tickers){
    let sum = 0;

    tickers.map(tick=>{
        sum += tick.highPrice;
    });

    return sum / tickers.length;
}

module.exports = {
    simpleHighAVG
};
