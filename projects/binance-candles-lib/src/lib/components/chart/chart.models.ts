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
    BTCUSDT = "BTCUSDT",
    ETHUSDT = "ETHUSDT",
    BTCETH = "ETHBTC",
}

export interface TokenPairSelectorItem {
    value: string;
    viewValue: string;
}

export enum CandleMarkerDirection {
    UP,
    DOWN,
}

export interface CandleMarkerCustomData {
    time: string;
    price: string;
    volume: string;
    signalType: "Buy" | "Sell";
}

export interface DataInterval {
    startTime?: number;
    endTime?: number;
}

export interface ClickButtonEvent extends Event {
    xAxis: {value: number}[];
    yAxis: {value: number}[];
}
