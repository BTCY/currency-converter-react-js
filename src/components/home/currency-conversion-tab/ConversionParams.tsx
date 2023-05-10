import { ReactElement } from "react";
import { Button, Col, Form, } from "react-bootstrap";
import { IApiAllAvailableCurrencies, } from "../../../api/exchange-rates-service.types";
import { FormikProps } from "formik";
import SelectSkeleton from "../../common/select-skeleton/SelectSkeleton";

/**
 *  Conversion params panel
 */

interface IConversionParams {
    formik: FormikProps<{
        currencyFrom: string;
        currencyTo: string;
        currencyAmount: number;
    }>;
    handleSubmit: () => void;
    isSubmitting: boolean;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}


const ConversionParams = ({
    formik,
    handleSubmit,
    isSubmitting,
    availableCurrencies
}: IConversionParams): ReactElement => (

    <>
        {/* Select: currency from */}
        <Col md={4} xs={12} className="mb-2">
            <Form.Group controlId="currencyFrom">
                <Form.Label>Currency from</Form.Label>

                <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                {availableCurrencies?.symbols &&
                    <Form.Select
                        name="currencyFrom"
                        aria-label="currency from"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currencyFrom}
                        required
                    >
                        {Object.keys(availableCurrencies.symbols).map(k =>
                            <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
        </Col>

        {/* Select: currency to */}
        <Col md={4} xs={12} className="mb-2">
            <Form.Group controlId="currencyTo">
                <Form.Label>Currency to</Form.Label>

                <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                {availableCurrencies?.symbols &&
                    <Form.Select
                        name="currencyTo"
                        aria-label="currency to"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currencyTo}
                        required
                    >
                        {Object.keys(availableCurrencies.symbols).map(k =>
                            <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
        </Col>

        {/* Input: amount */}
        <Col md={2} xs={12} className="mb-2">
            <Form.Group controlId="currencyAmount">
                <Form.Label>Amount</Form.Label>

                <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                {availableCurrencies?.symbols &&
                    <Form.Control
                        name="currencyAmount"
                        type="number"
                        aria-label="currency amount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currencyAmount}
                        isInvalid={Boolean(formik.errors.currencyAmount)}
                        required
                        min={1}
                    />
                }
            </Form.Group>
        </Col>

        {/* Button: convert */}
        <Col md={2} xs={12} className="mb-2">
            <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || !!Object.keys(formik.errors).length}
            >
                Convert
            </Button>
        </Col>
    </>
);


export default ConversionParams;