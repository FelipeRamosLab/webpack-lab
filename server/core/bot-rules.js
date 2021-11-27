function topBreak(prevTicker, ticker){
    if (ticker.highPrice > prevTicker.highPrice) {
        return true;
    }
}

function bottomBreak(prevTicker, ticker){
    if (ticker.lowPrice < prevTicker.lowPrice) {
        return true;
    }
}

module.exports = {
    topBreak,
    bottomBreak
};