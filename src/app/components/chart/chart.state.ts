import {Injectable} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {CandleChartInterval_LT} from "binance-api-node";
import * as Highcharts from "highcharts/highstock";
import {
    combineLatest,
    switchMap,
} from "rxjs";
import {BinanceCandleService} from "../../services/binance-candle.service";
import {BinanceTokenPair} from "./chart.models";
import {
    convertCandleChartData2HighchartsCandlesData,
    generateRandomMarkers,
} from "./chart.utils";

interface State {
    options: Highcharts.Options,
    tokenPair: BinanceTokenPair,
    interval: CandleChartInterval_LT,
}

@Injectable()
export class ChartState extends RxState<State> {
    constructor(private binanceCandleService: BinanceCandleService) {
        super();
        this.connect("options", combineLatest([
                this.select("tokenPair"),
                this.select("interval"),
            ]).pipe(switchMap(([tokenPair, interval]) =>
                binanceCandleService.getCandles({
                    symbol: tokenPair,
                    interval,
                })
            )),
            (oldState, candleChartData) => ({
                title: {text: "Binance Candles"},
                // subtitle: {text: tokenPair},
                chart: {
                    events: {
                        load: () => {
                            console.log(">>> LOAD");
                        },
                        render: (event) => {
                            console.log(">>> render: ", event);
                        },
                        redraw: (event) => { // THATS
                            console.log(">>> redraw: ", event);
                        },
                    },
                },
                rangeSelector: {
                    buttons: [
                        {
                            type: "all",
                            text: "All",
                            events: {
                                click: (event) => {
                                    console.log(">>> click ALL: ", event);
                                },
                            },
                        },
                        {
                            type: "year",
                            count: 1,
                            text: "1Y",
                        },
                        {
                            type: "month",
                            count: 6,
                            text: "6M",
                        },
                        {
                            type: "month",
                            count: 1,
                            text: "1M",
                        },
                        {
                            type: "day",
                            count: 1,
                            text: "1D",
                        },
                    ],
                    selected: 0, // All
                },
                plotOptions: {
                    series: {
                        // pointStart: Date.now(),
                        pointInterval: 86400000, // 1 day
                        dataGrouping: {
                            enabled: false,
                        },
                    },
                    candlestick: {
                        color: "pink",
                        lineColor: "red",
                        upColor: "lightgreen",
                        upLineColor: "green",
                    },
                },
                series: [
                    {
                        type: "candlestick",
                        data: convertCandleChartData2HighchartsCandlesData(candleChartData),
                    },
                    {
                        type: "scatter",
                        name: "Signal",
                        animation: false,
                        data: generateRandomMarkers(candleChartData, 10),
                        tooltip: {
                            headerFormat: "<b>{series.name}</b><br>",
                            pointFormat: "First: {point.x}, Second: {point.y}, Third: {point.contact_notes}",
                        },
                    },
                ],
            }));
    }
}
