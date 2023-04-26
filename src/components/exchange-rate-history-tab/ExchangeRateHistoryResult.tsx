import {
    IApiExchangeRateHistory, IApiAllAvailableCurrencies
} from "../../api/exchange-rates-service.types";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
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
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: labels,
    datasets: [
        {
            label: "Currency",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
        },
    ],
};



const ExchangeRateHistoryResult = ({
    result,
    availableCurrencies
}: IConversionResult) => {
    console.log(result)
    return (
        <>
            <h2>Base: {result.base} (<small>{availableCurrencies?.symbols[result.base]}</small>)</h2>
            <div>
                <Line data={data} />
            </div>

        </>
    )
};

export default ExchangeRateHistoryResult;