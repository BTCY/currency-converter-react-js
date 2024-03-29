import { ReactElement, ReactNode, memo } from "react";
import { Table, } from "react-bootstrap";
import {
    IApiCurrencyFluctuations, IApiCurrencyFluctuationsRates,
    IApiAllAvailableCurrencies
} from "../../../api/exchange-rates-service.types";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import TooltipCustom from "../../common/tooltip-custom/TooltipCustom";

/**
 *  Fluctuations result
 */

interface IConversionResult {
    result: IApiCurrencyFluctuations;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}

interface IRow {
    currCode: string;
    curr?: string;
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
        return "—"
    }
}


const getRateChangeColor = (change: number): string => {
    if (change < 0) {
        return "text-danger"
    }
    else if (change > 0) {
        return "text-success"
    }
    else {
        return "text-secondary"
    }
}


const TableHeader = (): ReactElement =>
    <thead>
        <tr>
            <th style={{ width: "1%" }} className="text-center">Chart</th>
            <th style={{ width: "10%" }} >Currency</th>
            <th>Start rate</th>
            <th>End rate</th>
            <th>Change</th>
        </tr>
    </thead>


const Row = memo(({ currCode, curr, rate }: IRow): ReactElement =>
    <tr>
        <td className="text-center">{getRateChangeIcon(rate.change)}</td>
        <td>
            <TooltipCustom id={currCode} tooltipText={curr}>
                <span>{currCode}</span>
            </TooltipCustom>
        </td>
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
    result,
    availableCurrencies
}: IConversionResult): ReactElement => (
    <>
        <h2>Base: {result.base} (<small>{availableCurrencies?.symbols[result.base]}</small>)</h2>
        
        <Table striped bordered hover>

            <TableHeader />

            <tbody>
                {Object.keys(result.rates).map(currCode =>
                    <Row
                        key={currCode}
                        currCode={currCode}
                        curr={availableCurrencies?.symbols[currCode]}
                        rate={result.rates[currCode]}
                    />
                )}
            </tbody>

        </Table>
    </>
);


export default FluctuationsResult;