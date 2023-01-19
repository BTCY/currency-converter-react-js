import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import * as exchangeRatesService from './api/exchange-rates-service';

function App() {

    React.useEffect(() => {
        exchangeRatesService.getConvert('GBP', 'EUR', 5)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
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
