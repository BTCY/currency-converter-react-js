import { ReactNode, memo } from "react";
import { Table } from "react-bootstrap";
import { IApiCurrencyFluctuations, IApiCurrencyFluctuationsRates } from "../../api/exchange-rates-service.types";
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

interface IConversionResult {
    result: IApiCurrencyFluctuations;
}

interface IRow {
    curr: string;
    rate: IApiCurrencyFluctuationsRates;
}

const getRateChangeIcon = (change: number): ReactNode => {
    if (change < 0) {
        return <ArrowDown className="text-danger" />
    }
    else if (change > 0) {
        return <ArrowUp className="text-success" />
    }
    else {
        return '—'
    }
}

const getRateChangeColor = (change: number): string => {
    if (change < 0) {
        return 'text-danger'
    }
    else if (change > 0) {
        return 'text-success'
    }
    else {
        return 'text-secondary'
    }
}


const Title = () =>
    <tr>
        <th style={{ width: '1%' }} className="text-center">Chart</th>
        <th style={{ width: '10%' }} >Currency</th>
        <th>Start rate</th>
        <th>End rate</th>
        <th>Change</th>
    </tr>


const Row = memo(({ curr, rate }: IRow) =>
    <tr >
        <td className="text-center">{getRateChangeIcon(rate.change)}</td>
        <td>{curr}</td>
        <td>{rate.start_rate}</td>
        <td>{rate.end_rate}</td>
        <td>
            <span className={getRateChangeColor(rate.change)}>{rate.change}</span> ({rate.change_pct}%)
        </td>
    </tr>,
    (prevProps, nextProps) => {
        return JSON.stringify(prevProps.rate) === JSON.stringify(nextProps.rate);
    }
);


const FluctuationsResult = ({
    result
}: IConversionResult) => {
    return (
        <Table striped bordered hover>
            <thead>
                <Title />
            </thead>
            <tbody>
                {Object.keys(result.rates).map(curr =>
                    <Row key={curr} curr={curr} rate={result.rates[curr]} />
                )}
            </tbody>
        </Table>
    )
};

export default FluctuationsResult;