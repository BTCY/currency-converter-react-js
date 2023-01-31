import { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
// import * as exchangeRatesService from './api/exchange-rates-service';

function App() {

    useEffect(() => {
        // exchangeRatesService.getConvertedCurrency('GBP', 'EUR', 5)
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));

        // exchangeRatesService.getCurrencyFluctuations('2023-01-12', '2023-01-31', 'EUR')
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));

        // exchangeRatesService.getLatestExchangeRates()
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));

        // exchangeRatesService.getAllAvailableCurrencies()
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));

        // exchangeRatesService.getExchangeRateHistory('2023-01-12', '2023-01-31', 'EUR')
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));

        // exchangeRatesService.getExchangeRateHistoryByDate('2023-01-31')
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));
    })

    return (
        <div className="App">
            <header className="App-header">
                <Counter />
            </header>
        </div>
    );
}

export default App;
