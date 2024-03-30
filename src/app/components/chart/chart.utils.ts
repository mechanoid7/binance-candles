import {CandleChartResult} from "binance-api-node";
import {HighchartsCandlesData} from "./chart.models";

export function convertCandleChartData2HighchartsCandlesData(chartResults: CandleChartResult[]): HighchartsCandlesData[] {
    return chartResults.map(({openTime, open, high, low, close}) => ({
        x: openTime,
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
    }));
}
