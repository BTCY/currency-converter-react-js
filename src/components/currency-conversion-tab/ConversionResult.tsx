import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import { IApiConvertedCurrency } from "../../api/exchange-rates-service.types";

/**
 *  Conversion result
 */

interface IConversionResult {
    result: IApiConvertedCurrency
}


const ConversionResult = ({
    result
}: IConversionResult): ReactElement => (

    <Row>
        <Col md="auto">
            <div className="display-4 fw-normal">
                {result.query.amount}
            </div>
            {result.query.from}
        </Col>

        <Col className="display-4 fw-normal" md="auto">x</Col>

        <Col md="auto">
            <div className="display-4 fw-normal">
                {result.info.rate}
            </div>
            RATE
        </Col>

        <Col className="display-4 fw-normal" md="auto">=</Col>

        <Col md="auto">
            <div className="display-4 fw-normal">
                {result.result}
            </div>
            {result.query.to}
        </Col>
    </Row>
);


export default ConversionResult;