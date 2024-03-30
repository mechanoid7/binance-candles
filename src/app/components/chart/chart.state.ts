import {Injectable} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {
    CandleChartInterval_LT,
    CandlesOptions,
} from "binance-api-node";
import * as Highcharts from "highcharts/highstock";
import {
    combineLatest,
    debounceTime,
    switchMap,
} from "rxjs";
import {BinanceCandleService} from "../../services/binance-candle.service";
import {
    BinanceTokenPair,
    DataInterval,
} from "./chart.models";
import {
    convertCandleChartData2HighchartsCandlesData,
    generateRandomMarkers,
} from "./chart.utils";

interface State {
    options: Highcharts.Options,
    tokenPair: BinanceTokenPair,
    interval: CandleChartInterval_LT,
    dataInterval: DataInterval,
    currentPoint: {min: number, max: number}
}

function getDays(ms: number): number {
    return ms / 86400000;
}

enum Times {
    DAY = 86400000,
    WEEK = 604800000,
}

const initValues: Partial<State> = {
    tokenPair: BinanceTokenPair.BTCUSDT,
    interval: "1M",
    dataInterval: {startTime: undefined, endTime: undefined},
};

@Injectable()
export class ChartState extends RxState<State> {

    private loaded = false;

    constructor(private binanceCandleService: BinanceCandleService) {
        super();
        this.connect("options", combineLatest([
                this.select("tokenPair"),
                this.select("interval"),
                this.select("dataInterval"),
            ]).pipe(switchMap(([tokenPair, interval, dataInterval]) => {
                const options: CandlesOptions = {
                    symbol: tokenPair,
                    interval,
                };
                dataInterval.startTime && (options["startTime"] = dataInterval.startTime);
                dataInterval.endTime && (options["endTime"] = dataInterval.endTime);
                return binanceCandleService.getCandles(options);
            })),
            (oldState, candleChartData) => ({
                title: {text: "Binance Candles"},
                xAxis: {
                    events: {
                        pointBreakOut: (e) => {
                            console.log(">>> pointBreakOut: ", e);
                        },
                        afterSetExtremes: (event) => {
                            console.log(">>> setExtremes: ", event);
                            const daysDiff = getDays(Math.round(event.max) - Math.round(event.min));
                            if (daysDiff < 0.5) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "1m"});
                            } else if(daysDiff < 1) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "5m"});
                            } else if(daysDiff < 3) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "15m"});
                            }else if(daysDiff < 7) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "1h"});
                            }                            else if(daysDiff < 15) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "2h"});
                            }else if(daysDiff < 30) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "4h"});
                            }                            else if(daysDiff < 45) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "8h"});
                            }else if(daysDiff < 90) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "12h"});
                            }else if(daysDiff < 180) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "1d"});
                            }else if(daysDiff < 600) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "3d"});
                            }
                            else if(daysDiff < 3600) {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "1w"});
                            }else {
                                !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}, interval: "1m"});
                            }

                            // !this.loaded && this.set({dataInterval: {startTime: Math.round(event.min), endTime: Math.round(event.max)}});
                            this.loaded = true;

                            setTimeout(() => this.loaded = false, 800)
                        },
                    },
                },
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
                    allButtonsEnabled: true,
                    buttons: [
                        // {
                        //     type: "all",
                        //     text: "All",
                        //     events: {
                        //         click: (event) => {
                        //             console.log(">>> click ALL: ", event);
                        //         },
                        //     },
                        // },
                        {
                            type: "year",
                            count: 10,
                            text: "10Y",
                            // events: {
                            //     click: (event) => {
                            //         console.log(">>> click ALL: ", event);
                            //     },
                            // },
                        },
                        {
                            type: "year",
                            count: 1,
                            text: "1Y",
                            // events: {
                            //     click: (event) => {
                            //         console.log(">>> click ALL: ", event);
                            //     },
                            // },
                        },
                        {
                            type: "month",
                            count: 6,
                            text: "6M",
                            // events: {
                            //     click: (event: ClickButtonEvent) => {
                            //         console.log(">>> click ALL: ", event);
                            //     },
                            // },
                        },
                        {
                            type: "month",
                            count: 1,
                            text: "1M",
                            events: {
                                click: (event) => {
                                    console.log(">>> click 1M: ", event);

                                    // const lookCenterX = (event as ClickButtonEvent).xAxis[1].value - (event as ClickButtonEvent).xAxis[0].value;
                                    //
                                    // this.set({dataInterval: {startTime: lookCenterX - 15*24*60*60*100, endTime: lookCenterX + 15*24*60*60*100}, interval: "1d"})
                                },
                            },
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
                        // pointInterval: 86400000, // 1 day
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
                            headerFormat: "<b>{point.custom.signalType}</b><br>",
                            pointFormat: "Price: {point.custom.price}<br>Volume: {point.custom.volume}<br>Time: {point.custom.time}",
                        },
                    },
                ],
            }));

        this.set(initValues);
    }
}
