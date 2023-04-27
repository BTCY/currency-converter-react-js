import {
    IApiExchangeRateHistory, IApiAllAvailableCurrencies
} from "../../api/exchange-rates-service.types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js'
import { Table } from "react-bootstrap";

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
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: number[];
    }[];
}

interface IApiResultData {
    [key: string]: {
        [key: string]: number
    }
}


const getChartlabels = (
    data: IApiResultData,
): string[] => {
    return Object.keys(data).map(d => d)
}


const getChartData = (
    data: IApiResultData,
    currCode: string,
    curr: string,
    labels: string[],
): IChart => {
    return ({
        labels: labels,
        datasets: [
            {
                label: `${currCode} (${curr})`,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: Object.keys(data)?.map(d => data[d]?.[currCode]),
            },
        ],
    })
}


const ExchangeRateHistoryResult = ({
    result,
    availableCurrencies
}: IConversionResult) => {

    const labels = getChartlabels(result.rates)
    return (
        <>
            <h2>Base: {result.base} (<small>{availableCurrencies?.symbols[result.base]}</small>)</h2>
            <div>
                {Object.keys(availableCurrencies?.symbols).map(currCode =>
                    <div key={currCode}>
                        <Line data={
                            getChartData(
                                result.rates,
                                currCode,
                                availableCurrencies?.symbols[currCode],
                                labels
                            )} />
                    </div>
                )}
            </div>
        </>
    )
};

export default ExchangeRateHistoryResult;