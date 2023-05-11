import { ReactElement } from "react";
import { Button, Col, Form, } from "react-bootstrap";
import { IApiAllAvailableCurrencies, } from "../../../api/exchange-rates-service.types";
import { FormikProps } from "formik";
import SelectSkeleton from "../../common/select-skeleton/SelectSkeleton";

/**
 *  Latest exchange rates params panel
 */

interface ILatestExchangeRatesParams {
    formik: FormikProps<{
        base: string;
    }>;
    handleSubmit: () => void;
    isSubmitting: boolean;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}


const LatestExchangeRatesParams = ({
    formik,
    handleSubmit,
    isSubmitting,
    availableCurrencies
}: ILatestExchangeRatesParams): ReactElement => (

    <>
        {/* Select: base */}
        <Col md={4} xs={12} className="mb-2">
            <Form.Group controlId="base">
                <Form.Label>Base</Form.Label>

                <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                {availableCurrencies?.symbols &&
                    <Form.Select
                        name="base"
                        aria-label="base currency"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.base}
                        required
                    >
                        {Object.keys(availableCurrencies.symbols).map(k =>
                            <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                        )}
                    </Form.Select>
                }
            </Form.Group>
        </Col>

        {/* Button: submit */}
        <Col md={2} xs={12} className="mb-2">
            <Button
                className="w-100 mt-3"
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || !!Object.keys(formik.errors).length}
            >
                Submit
            </Button>
        </Col>
    </>
);


export default LatestExchangeRatesParams;