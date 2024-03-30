import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ChartComponent} from "@mechanoid7/binance-candles-lib";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        ChartComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.less",
})
export class AppComponent {
}
