import { Col, Row } from "react-bootstrap";
import { IApiConvertedCurrency } from "../../api/exchange-rates-service.types";
import styles from './MetaInfo.module.css';


interface IMetaInfo {
    result: IApiConvertedCurrency
}

const MetaInfo = ({
    result
}: IMetaInfo) => {
    return (
        <Row className={styles.wrap}>
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
    )
};

export default MetaInfo;