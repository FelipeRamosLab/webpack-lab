const {SMA} = require('technicalindicators');

function simpleHighAVG(tickers, period){
    let sum = 0;

    tickers.map((tick, i)=>{
        if(period <= i){
            sum += tick.highPrice;
        }
    });

    return sum / tickers.length;
}

function simpleLowAVG(tickers, period){
    let sum = 0;

    tickers.map(tick=>{
        sum += tick.lowPrice;
    });

    return sum / tickers.length;
}

function sma(data, period){
    let values = [];

    data.map(ticker=>{
        values.push(ticker.closePrice);
    });

    return SMA.calculate({period, values});
}

function calcPorcentage(total, ref){
    return ref * 100 / total;
}

module.exports = {
    simpleHighAVG,
    simpleLowAVG,
    sma,
    calcPorcentage
};
