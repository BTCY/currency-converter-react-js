import {
    IApiExchangeRateHistory, IApiAllAvailableCurrencies
} from "../../../api/exchange-rates-service.types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend,
} from "chart.js"
import { ReactElement, memo, useEffect, useState } from "react";
import { Placeholder } from "react-bootstrap";

/**
 *  Exchange rate history result
 */

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


interface IChart {
    chart: IExchangeRateHistoryChart;
}


const Skeleton = memo((): ReactElement =>
    <div className="w-50 d-inline-block p-4">
        <Placeholder xs={12} as="div" animation="glow">
            <Placeholder xs={12} style={{ height: "244px", background: "#cecece" }} className="rounded" />
        </Placeholder>
    </div>
);


const Chart = memo(({ chart }: IChart): ReactElement =>
    <div className="w-50 d-inline-block p-4">
        <Line data={chart} />
    </div>,
    (prevProps, nextProps) => {
        return JSON.stringify(prevProps.chart) === JSON.stringify(nextProps.chart);
    }
);


const ExchangeRateHistoryResult = ({
    result,
    availableCurrencies
}: IConversionResult): ReactElement => {

    const [charts, setCharts] = useState<IExchangeRateHistoryChart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        setCharts([]);

        const erhChartsConvertorWorker = new Worker(new URL("./ExchangeRateHistoryChartsConvertor.worker", import.meta.url));
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
                {/* Skeletons */}
                {isLoading &&
                    Array(12).fill(0).map((_, i) => <Skeleton key={i} />)
                }

                {/* Charts */}
                {!isLoading && charts.length > 0 &&
                    charts.map(c => <Chart key={c.id} chart={c} />)
                }

                {/* No data */}
                {!isLoading && charts.length === 0 && <p>No data</p>}
            </div>
        </>
    )
};


export default ExchangeRateHistoryResult;