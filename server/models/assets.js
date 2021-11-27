class KlineStreamModel {
    constructor({
        e, // Event type
        E, // Event time
        s, // Symbol
        k,
    }) {
        this.eventType = e;
        this.eventTime = new Date(E).toLocaleString();
        this.symbol = s;
        this.kline = new KlineDataStreamModel(k);
    }
}

class KlineDataStreamModel {
    constructor({
        t, // Kline start time
        T, // Kline close time
        s, // Symbol
        i, // Interval
        f, // First trade ID
        L, // Last trade ID
        o, // Open price
        c, // Close price
        h, // High price
        l, // Low price
        v, // Base asset volume
        n, // Number of trades
        x, // Is this kline closed?
        q, // Quote asset volume
        V, // Taker buy base asset volume
        Q, // Taker buy quote asset volume
        B, // Ignore
    }) {
        if (t) this.startTime = new Date(t).toLocaleString();
        if (T) this.closeTime = new Date(T).toLocaleString();
        if (s) this.symbol = s;
        if (i) this.interval = i;
        if (o) this.openPrice = Number(o);
        if (c) this.closePrice = Number(c);
        if (h) this.highPrice = Number(h);
        if (l) this.lowPrice = Number(l);
        if (v) this.baseAssetVolume = Number(v);
        if (n) this.numberOfTrades = Number(n);
        if (x) this.isKlineClosed = x;
        if (q) this.quoteAssetVolume = q;
    }
}

class HistoricalTickers {
    constructor(symbol, history){
        let result = [];

        history.map(ticker=>{
            result.push(new KlineDataStreamModel({
                s: symbol,
                t: ticker[0],
                o: ticker[1],
                h: ticker[2],
                l: ticker[3],
                c: ticker[4],
            }));
        })

        this.data = result;
        this.rawHistory = history;
    }
}

module.exports = {
    KlineStreamModel,
    HistoricalTickers
}
