import {Injectable} from "@angular/core";
import {
    CandleChartResult,
    CandlesOptions,
} from "binance-api-node";

const Binance = require("binance-api-node").default;
const client = Binance();

@Injectable({
    providedIn: "root",
})
export class BinanceCandleService {
    public getCandles(options: CandlesOptions): Promise<CandleChartResult[]> {
        return client.candles(options);
    }
}
