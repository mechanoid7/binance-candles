import {Injectable} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RxState} from "@rx-angular/state";
import {
    CandleChartInterval_LT,
    CandlesOptions,
} from "binance-api-node";
import * as Highcharts from "highcharts/highstock";
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    filter,
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
    getDays,
    getMs,
} from "./chart.utils";

interface State {
    options: Highcharts.Options,
    tokenPair: BinanceTokenPair,
    interval: CandleChartInterval_LT,
    dataInterval: DataInterval,
    currentView: { min: number, max: number },
    chartInstance: Highcharts.Chart,
}

const initValues: Partial<State> = {
    tokenPair: BinanceTokenPair.BTCUSDT,
    interval: "1M",
    dataInterval: {startTime: undefined, endTime: undefined},
};

@Injectable()
export class ChartState extends RxState<State> {
    private isChangeDataIntervalBlocked: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private binanceCandleService: BinanceCandleService) {
        super();
        this.isChangeDataIntervalBlocked
            .pipe(
                filter(Boolean),
                debounceTime(2000),
                takeUntilDestroyed(),
            )
            .subscribe(() => this.isChangeDataIntervalBlocked.next(false));

        this.connect("options", combineLatest([
                this.select("tokenPair"),
                this.select("interval"),
                this.select("dataInterval"),
            ]).pipe(
                debounceTime(500),
                switchMap(([tokenPair, interval, dataInterval]) => {
                    const options: CandlesOptions = {
                        symbol: tokenPair,
                        interval,
                    };
                    dataInterval.startTime && (options["startTime"] = dataInterval.startTime);
                    dataInterval.endTime && (options["endTime"] = dataInterval.endTime);
                    return binanceCandleService.getCandles(options);
                }),
            ),
            (oldState, candleChartData) => ({
                title: {text: "Binance Candles"},
                xAxis: {
                    events: {
                        afterSetExtremes: event => this.handleInterval(event.min, event.max),
                    },
                },
                // chart: {height: "100%", width: "100%"},
                rangeSelector: {
                    allButtonsEnabled: true,
                    buttons: [
                        {
                            type: "year",
                            count: 10,
                            text: "10Y",
                            events: {
                                click: () => this.clickRangeSelector(3600),
                            },
                        },
                        {
                            type: "year",
                            count: 1,
                            text: "1Y",
                            events: {
                                click: () => this.clickRangeSelector(360),
                            },
                        },
                        {
                            type: "month",
                            count: 6,
                            text: "6M",
                            events: {
                                click: () => this.clickRangeSelector(182),
                            },
                        },
                        {
                            type: "month",
                            count: 1,
                            text: "1M",
                            events: {
                                click: () => this.clickRangeSelector(30),
                            },
                        },
                        {
                            type: "day",
                            count: 1,
                            text: "1D",
                            events: {
                                click: () => this.clickRangeSelector(1),
                            },
                        },
                    ],
                    selected: 0,
                },
                plotOptions: {
                    series: {
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

    private clickRangeSelector(days: number): void {
        const currentView = this.get("currentView");
        const chartInstance = this.get("chartInstance");
        const min = currentView?.min || chartInstance.xAxis[0].min || 0;
        const max = currentView?.max || chartInstance.xAxis[0].max || 1901545600000;
        const viewCenter = Math.round((min + max) / 2);
        const halfPeriod = Math.round(getMs(days / 2));
        this.handleInterval(viewCenter - halfPeriod, viewCenter + halfPeriod);
    }

    private handleInterval(min: number, max: number): void {
        if (!min || !max || this.isChangeDataIntervalBlocked.value) {
            return;
        }

        this.set({currentView: {min: Math.round(min), max: Math.round(max)}});
        const daysDiff = getDays(Math.round(max) - Math.round(min));

        const updateInterval = (interval: CandleChartInterval_LT) => {
            !this.isChangeDataIntervalBlocked.value && this.set({
                dataInterval: {
                    startTime: Math.round(min),
                    endTime: Math.round(max),
                }, interval: interval,
            });
        };

        if (daysDiff < 0.5) {
            updateInterval("1m");
        } else if (daysDiff < 1) {
            updateInterval("5m");
        } else if (daysDiff < 3) {
            updateInterval("15m");
        } else if (daysDiff < 7) {
            updateInterval("1h");
        } else if (daysDiff < 15) {
            updateInterval("2h");
        } else if (daysDiff < 30) {
            updateInterval("4h");
        } else if (daysDiff < 45) {
            updateInterval("8h");
        } else if (daysDiff < 90) {
            updateInterval("12h");
        } else if (daysDiff < 180) {
            updateInterval("1d");
        } else if (daysDiff < 600) {
            updateInterval("3d");
        } else if (daysDiff < 3600) {
            updateInterval("1w");
        } else {
            updateInterval("1M");
        }

        this.isChangeDataIntervalBlocked.next(true);
    }
}
