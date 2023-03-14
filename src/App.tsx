import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { RoutesData } from './routes/routes';
// import * as exchangeRatesService from './api/exchange-rates-service';

function App() {

    // useEffect(() => {
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
    // })

    return (
        <Routes>
            {/* data from ./routes/routes.tsx */}
            {RoutesData && Object.keys(RoutesData).map((key: string) =>
                <Route
                    key={RoutesData[key].link}
                    path={RoutesData[key].link}
                    element={RoutesData[key].component}
                />
            )}
        </Routes>
        // <div className="App">
        //     <header className="App-header">
        //         <Counter />
        //     </header>
        // </div>
    );
}

export default App;
