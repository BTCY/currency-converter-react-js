import { Col, Nav, Row } from "react-bootstrap";
import { IApiConvertedCurrency } from "../../api/exchange-rates-service.types";
import styles from './ConversionResult.module.css';


interface IConversionResult {
    result: IApiConvertedCurrency
}

const ConversionResult = ({
    result
}: IConversionResult) => {
    return (
        <div className={styles.wrap}>

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


            <Row 
                style={{
                    color: '#aaaaaa',
                    borderTop: '1px solid #aaaaaa'
                }}
            >
                <Col xs="12">
                    Currency update date: {new Date(result.info.timestamp * 1000).toLocaleString()}.
                </Col>
                <Col xs="12">
                    Data source: 
                    <a
                        target="_blank"
                        href="https://apilayer.com/marketplace/exchangerates_data-api"
                        className="link-secondary"
                        rel="noreferrer"
                    >
                        Exchange Rates Data API
                    </a>
                </Col>
            </Row>

        </div>
    )
};

export default ConversionResult;