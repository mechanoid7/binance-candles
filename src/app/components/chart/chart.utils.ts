import {CandleChartResult} from "binance-api-node";
import * as Highcharts from "highcharts/highstock";
import {
    CandleMarkerDirection,
    HighchartsCandlesData,
} from "./chart.models";

export function convertCandleChartData2HighchartsCandlesData(chartResults: CandleChartResult[]): HighchartsCandlesData[] {
    return chartResults.map(({openTime, open, high, low, close}) => ({
        x: openTime,
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
    }));
}

export function generateRandomMarkers(chartResults: CandleChartResult[], count: number, offset: number = 50, size: number = 5): Highcharts.PointOptionsObject[] {
    const getRandomValue = () => Math.random();
    const markers: Highcharts.PointOptionsObject[] = [];

    for (let i = 0; i < count; i++) {
        const chartData = chartResults[Math.floor(chartResults.length * getRandomValue())];
        const direction = getRandomValue() > 0.5 ? CandleMarkerDirection.UP : CandleMarkerDirection.DOWN;
        markers.push({
            x: chartData.openTime,
            y: direction === CandleMarkerDirection.UP
                ? Number(chartData.low) - offset
                : Number(chartData.high) + offset,

            // options: {customProperty: "123"},
            marker: {
                symbol: direction === CandleMarkerDirection.UP ? "triangle" : "triangle-down",
                fillColor: direction === CandleMarkerDirection.UP ? "green" : "red",
                radius: size,
            },
        })
    }

    return markers;
}
