# BinanceCandlesLib

### Description
The Candlestick Chart with Trading Signals Web Application is a powerful tool developed using `Angular 17`,
designed to visualize candlestick data from the Binance API along with simulated buy and sell signals.
Leveraging the Highcharts library for charting capabilities, as well as the `binance-api-node` package
for retrieving candlestick data, this application provides users with an intuitive interface for
analyzing market trends and making informed trading decisions.

### Key Features

- Real-time Candlestick Data: Retrieve and display real-time candlestick data from the Binance API, allowing users to track price movements and identify patterns.
- Simulated Trading Signals: Generate simulated buy and sell signals within the candlestick chart based on predefined criteria, providing users with actionable insights into market trends.
- Interactive Charting: Utilize interactive charting functionalities powered by Highcharts, enabling users to zoom, pan, and explore historical data with ease.
- Modular Architecture: Built with Angular 17, the application follows a modular architecture, making it highly maintainable and scalable for future enhancements.
- Reactive State Management: Employ RxJs and RxState for efficient state management, ensuring seamless data flow and responsiveness throughout the application.

Overall, the Candlestick Chart with Trading Signals Web Application offers traders and analysts a
comprehensive toolset for visualizing market data, identifying trading opportunities,
and enhancing decision-making processes in the dynamic world of financial markets.

## Code scaffolding

Run `ng generate component component-name --project binance-candles-lib` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project binance-candles-lib`.
> Note: Don't forget to add `--project binance-candles-lib` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build binance-candles-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build binance-candles-lib`, go to the dist folder `cd dist/binance-candles-lib` and run `npm publish`.

## Running unit tests

Run `ng test binance-candles-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
