import {Injectable} from "@angular/core";
import Binance, {
    CandleChartResult,
    CandlesOptions,
} from "binance-api-node";

const client = Binance();

@Injectable({
    providedIn: "root",
})
export class BinanceCandleService {

    constructor() {
    }

    public getCandles(options: CandlesOptions): Promise<CandleChartResult[]> {
        return client.candles(options)
    }
}
