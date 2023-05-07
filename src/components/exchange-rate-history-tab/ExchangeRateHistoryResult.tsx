import {
    IApiExchangeRateHistory, IApiAllAvailableCurrencies
} from "../../api/exchange-rates-service.types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend,
} from "chart.js"
import { useEffect, useState } from "react";
import { Placeholder } from "react-bootstrap";

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

export interface IExchangeRateHistoryChart {
    id: string;
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: number[];
    }[];
}


const ExchangeRateHistoryResult = ({
    result,
    availableCurrencies
}: IConversionResult) => {

    const [charts, setCharts] = useState<IExchangeRateHistoryChart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        setIsLoading(true);

        setCharts([]);

        const erhChartsConvertorWorker = new Worker(new URL("./ErhChartsConvertor.worker", import.meta.url));
        erhChartsConvertorWorker
            .postMessage({ result, availableCurrencies });
        erhChartsConvertorWorker
            .onmessage = event => {
                setCharts(event.data);
                erhChartsConvertorWorker.terminate();
                setIsLoading(false);
            };
        erhChartsConvertorWorker
            .onerror = event => {
                setCharts([]);
                erhChartsConvertorWorker.terminate();
                setIsLoading(false);
            };
    }, [result, availableCurrencies]);


    return (
        <>
            <h2>Base: {result.base} (<small>{availableCurrencies?.symbols[result.base]}</small>)</h2>
            <div>
                {isLoading &&
                    Array(12).fill(0).map((_, i) =>
                        <div key={i} className="w-50 d-inline-block p-4">
                            <Placeholder xs={12} as="div" animation="glow">
                                <Placeholder xs={12} style={{ height: "244px", background: "#cecece" }} className="rounded" />
                            </Placeholder>
                        </div>
                    )
                }
                {!isLoading && charts.length > 0 &&
                    charts.map(c =>
                        <div key={c.id} className="w-50 d-inline-block p-4">
                            <Line data={c} />
                        </div>
                    )
                }

                {!isLoading && charts.length === 0 && <p>No data</p>}
            </div>
        </>
    )
};

export default ExchangeRateHistoryResult;