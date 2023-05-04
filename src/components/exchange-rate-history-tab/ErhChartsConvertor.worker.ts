import { IApiAllAvailableCurrencies, IApiExchangeRateHistory } from "../../api/exchange-rates-service.types";
import { IExchangeRateHistoryChart } from "./ExchangeRateHistoryResult";

/*
*   Worker
*/


// eslint-disable-next-line no-restricted-globals 
const ctx: Worker = self as any;

ctx.addEventListener("message", (event) => {
    const apiResult: IApiExchangeRateHistory = event.data.result;
    const availableCurrencies: IApiAllAvailableCurrencies = event.data.availableCurrencies;

    if (!apiResult || !availableCurrencies)
        postMessage(undefined);

    const charts: IExchangeRateHistoryChart[] = [];
    const labels = Object.keys(apiResult.rates).map(d => d);

    Object.keys(availableCurrencies?.symbols).map(currCode =>
        charts.push({
            id: currCode,
            labels: labels,
            datasets: [
                {
                    label: `${currCode} (${availableCurrencies?.symbols[currCode]})`,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: Object.keys(apiResult.rates)?.map(d => apiResult.rates[d]?.[currCode]),
                },
            ],
        })
    );

    postMessage(charts);
});
