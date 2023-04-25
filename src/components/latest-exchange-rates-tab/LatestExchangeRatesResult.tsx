import { Table } from "react-bootstrap";
import { IApiLatestExchangeRates, IApiAllAvailableCurrencies } from "../../api/exchange-rates-service.types";


interface ILatestExchangeRatesResult {
    result: IApiLatestExchangeRates;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}

const LatestExchangeRatesResult = ({
    result,
    availableCurrencies
}: ILatestExchangeRatesResult) => { 
    
    return (
        <>
            <h2>Base: {result.base}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Rate</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(result.rates).map(c =>
                        <tr key={c}>
                            <td>{c}</td>
                            <td>{result.rates[c]}</td>
                            <td>{availableCurrencies?.symbols[c]}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
};

export default LatestExchangeRatesResult;