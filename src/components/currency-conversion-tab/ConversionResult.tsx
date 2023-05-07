import { Col,  Row } from "react-bootstrap";
import { IApiConvertedCurrency } from "../../api/exchange-rates-service.types";
import styles from "./ConversionResult.module.css";


interface IConversionResult {
    result: IApiConvertedCurrency
}

const ConversionResult = ({
    result
}: IConversionResult) => {
    return (
        <Row>
            <Col md="auto">
                <div className={styles.resultValue}>
                    {result.query.amount}
                </div>
                {result.query.from}
            </Col>

            <Col className={styles.resultValue} md="auto">x</Col>

            <Col md="auto">
                <div className={styles.resultValue}>
                    {result.info.rate}
                </div>
                RATE
            </Col>

            <Col className={styles.resultValue} md="auto">=</Col>

            <Col md="auto">
                <div className={styles.resultValue}>
                    {result.result}
                </div>
                {result.query.to}
            </Col>
        </Row>
    )
};

export default ConversionResult;