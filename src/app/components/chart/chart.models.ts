export interface HighchartsCandlesData {
    x: number,
    open: number,
    high: number,
    low: number,
    close: number,
    name?: string,
    color?: string
}

export enum BinanceTokenPair {
    BTCUSDT="BTCUSDT",
    ETHUSDT="ETHUSDT",
}

export enum CandleMarkerDirection {
    UP,
    DOWN,
}
