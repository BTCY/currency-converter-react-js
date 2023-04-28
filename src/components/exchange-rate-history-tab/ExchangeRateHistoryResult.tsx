import {
    IApiExchangeRateHistory, IApiAllAvailableCurrencies
} from "../../api/exchange-rates-service.types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface IConversionResult {
    result: IApiExchangeRateHistory;
    availableCurrencies: IApiAllAvailableCurrencies;
}

interface IChart {
    id: string;
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: number[];
    }[];
}

const getChartData = (
    apiResult: IApiExchangeRateHistory,
    availableCurrencies: IApiAllAvailableCurrencies,
): IChart[] => {

    const charts: IChart[] = [];
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

    return charts;
}


const ExchangeRateHistoryResult = ({
    result,
    availableCurrencies
}: IConversionResult) => {

    const charts = getChartData(result, availableCurrencies);

    return (
        <>
            <h2>Base: {result.base} (<small>{availableCurrencies?.symbols[result.base]}</small>)</h2>
            <div>
                {charts.length > 0
                    ? charts.map(c =>
                        <div key={c.id} className="w-50 d-inline-block p-4">
                            <Line data={c} />
                        </div>
                    )
                    : <p>No data</p>
                }
            </div>
        </>
    )
};

export default ExchangeRateHistoryResult;