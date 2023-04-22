import { Table } from "react-bootstrap";
import { IApiCurrencyFluctuations } from "../../api/exchange-rates-service.types";
import styles from './FluctuationsResult.module.css';


interface IConversionResult {
    result: IApiCurrencyFluctuations
}

const FluctuationsResult = ({
    result
}: IConversionResult) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Start rate</th>
                    <th>End rate</th>
                    <th>Change</th>
                    <th>Change pct</th>
                    <th>Chart</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(result.rates).map(c =>
                    <tr key={c}>
                        <td>{c}</td>
                        <td>{result.rates[c].start_rate}</td>
                        <td>{result.rates[c].end_rate}</td>
                        <td>{result.rates[c].change}</td>
                        <td>{result.rates[c].change_pct}</td>
                        <td>TODO</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
};

export default FluctuationsResult;