# BinanceCandles

## Candlestick Chart with Trading Signals Web Application

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

## Install

Run `npm i @mechanoid7/binance-candles-lib` to install package to your project

> https://www.npmjs.com/package/@mechanoid7/binance-candles-lib

## Use Scenarios

<details><summary>Change Token Pair</summary>

![Change Token Pair](/src/assets/images/docs/change-token-pair-scenario.gif)

</details>

<details><summary>Signals</summary>

![Check Signals](/src/assets/images/docs/check-signals-scenario.gif)

</details>

<details><summary>Zoom</summary>

![Zoom](/src/assets/images/docs/zoom-scenario.gif)

</details>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
