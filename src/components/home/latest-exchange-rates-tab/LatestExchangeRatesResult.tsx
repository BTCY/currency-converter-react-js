import { Table } from "react-bootstrap";
import { IApiLatestExchangeRates, IApiAllAvailableCurrencies } from "../../../api/exchange-rates-service.types";
import { ReactElement, memo } from "react";

/**
 *  Latest exchange rates result
 */

interface ILatestExchangeRatesResult {
    result: IApiLatestExchangeRates;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}

interface IRow {
    currCode: string;
    curr?: string;
    rate: number;
}


const TableHeader = (): ReactElement =>
    <thead>
        <tr>
            <th>Code</th>
            <th>Rate</th>
            <th>Currency</th>
        </tr>
    </thead>


const Row = memo(({ currCode, curr, rate }: IRow): ReactElement =>
    <tr key={currCode}>
        <td>{currCode}</td>
        <td>{rate}</td>
        <td>{curr}</td>
    </tr>,
    (prevProps, nextProps) => {
        return prevProps.rate === nextProps.rate;
    }
);


const LatestExchangeRatesResult = ({
    result,
    availableCurrencies
}: ILatestExchangeRatesResult): ReactElement => (

    <>
        <h2>Base: {result.base}</h2>

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


export default LatestExchangeRatesResult;