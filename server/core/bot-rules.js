const {simpleHighAVG, simpleLowAVG, sma} = require('./math');

function topBreak(tickers){
    let last = tickers.length - 1;

    if (tickers[last].highPrice > tickers[last-1].highPrice) {
        return true;
    }
}

function bottomBreak(tickers){
    let last = tickers.length - 1;

    if (tickers[last].lowPrice < tickers[last-1].lowPrice) {
        return true;
    }
}

function highAvgBreak(tickers){
    let last = tickers.length - 1;
    if (tickers[last].closePrice > simpleHighAVG(tickers)){
        return true;
    }
}

function lowAvgBreak(tickers){
    let last = tickers.length - 1;
    if (tickers[last].closePrice < simpleLowAVG(tickers)){
        return true;
    }
}

function crossSma({data, period, direction}){
    let last = data[data.length-1];

    switch(direction){
        case 'up': {
            if(sma(data, period)[0] < last.closePrice) {
                return true;
            }
            break;
        }
        case 'down': {
            if(sma(data, period)[0] > last.closePrice) {
                return true;
            }
            break;
        }
        default: {
            throw new Error('The parameter "direction" is missing at crossSma()!');
        }
    }
}

module.exports = {
    topBreak,
    bottomBreak,
    highAvgBreak,
    lowAvgBreak,
    crossSma
};