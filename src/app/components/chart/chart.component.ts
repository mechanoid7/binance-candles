import {
    AsyncPipe,
    NgIf,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";
import {HighchartsChartModule} from "highcharts-angular";
import HC_customEvents from "highcharts-custom-events";
import * as Highcharts from "highcharts/highstock";
import HC_stock from "highcharts/modules/stock";
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
    ],
    providers: [ChartState],
    styleUrl: "./chart.component.less",
    templateUrl: "./chart.component.html",
})
export class ChartComponent {
    public Highcharts: typeof Highcharts = Highcharts;
    public options$ = this.state$.select("options");
    private chartInstance!: Highcharts.Chart;

    constructor(public state$: ChartState) {
    }

    saveInstance(chartInstance: Highcharts.Chart) {
        this.chartInstance = chartInstance;
        this.state$.set({chartInstance});
    }
}
