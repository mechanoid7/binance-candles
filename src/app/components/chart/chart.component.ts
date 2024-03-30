import {
    AsyncPipe,
    NgForOf,
    NgIf,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";
import {
    MatFormField,
    MatLabel,
} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
    MatOption,
    MatSelect,
} from "@angular/material/select";
import {HighchartsChartModule} from "highcharts-angular";
import HC_customEvents from "highcharts-custom-events";
import * as Highcharts from "highcharts/highstock";
import HC_stock from "highcharts/modules/stock";
import {
    BinanceTokenPair,
    TokenPairSelectorItem,
} from "./chart.models";
import {ChartState} from "./chart.state";

HC_stock(Highcharts);
HC_customEvents(Highcharts);

@Component({
    selector: "app-chart",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        HighchartsChartModule,
        AsyncPipe,
        NgIf,
        MatFormField,
        MatSelect,
        MatLabel,
        MatOption,
        NgForOf,
        MatInput,
    ],
    providers: [ChartState],
    styleUrl: "./chart.component.less",
    templateUrl: "./chart.component.html",
})
export class ChartComponent {
    public Highcharts: typeof Highcharts = Highcharts;
    public options$ = this.state$.select("options");
    public tokenPairs: TokenPairSelectorItem[] = [
        {value: BinanceTokenPair.BTCUSDT, viewValue: "BTC/USDT"},
        {value: BinanceTokenPair.ETHUSDT, viewValue: "ETH/USDT"},
        {value: BinanceTokenPair.BTCETH, viewValue: "BTC/ETH"},
    ];
    public selectedPair = this.tokenPairs[0];
    private chartInstance!: Highcharts.Chart;

    constructor(public state$: ChartState) {
    }

    public saveInstance(chartInstance: Highcharts.Chart) {
        this.chartInstance = chartInstance;
        this.state$.set({chartInstance});
    }

    public selectPair(tokenPair: BinanceTokenPair) {
        this.state$.set({tokenPair});
    }
}
