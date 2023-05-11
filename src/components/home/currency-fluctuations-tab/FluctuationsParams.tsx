import { ReactElement } from "react";
import { Button, Col, Form, } from "react-bootstrap";
import { IApiAllAvailableCurrencies, } from "../../../api/exchange-rates-service.types";
import { FormikProps } from "formik";
import SelectSkeleton from "../../common/select-skeleton/SelectSkeleton";
import DatePickerCustom from "../../common/date-picker-custom/DatePickerCustom";

/**
 *  Fluctuations params panel
 */

interface IFluctuationsParams {
    formik: FormikProps<{
        startDate: string | null | undefined | any;
        endDate: string | null | undefined | any;
        base: string;
    }>;
    handleSubmit: () => void;
    isSubmitting: boolean;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
}


const FluctuationsParams = ({
    formik,
    handleSubmit,
    isSubmitting,
    availableCurrencies
}: IFluctuationsParams): ReactElement => (

    <>
        {/* DatePicker: start date */}
        <Col md={3} xs={12} className="mb-2">
            <Form.Group controlId="startDate">
                <Form.Label>Start date</Form.Label>
                <DatePickerCustom
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Start date"
                    name="startDate"
                    aria-label="start date"
                    selected={formik?.values?.startDate ? new Date(formik.values.startDate) : null}
                    onChange={val => {
                        formik.setFieldValue("startDate", val);
                    }}
                    required
                />
            </Form.Group>
        </Col>

        {/* DatePicker: end date */}
        <Col md={3} xs={12} className="mb-2">
            <Form.Group controlId="endDate">
                <Form.Label>End date</Form.Label>
                <DatePickerCustom
                    dateFormat="dd.MM.yyyy"
                    placeholderText="End date"
                    name="endDate"
                    aria-label="end date"
                    selected={formik?.values?.endDate ? new Date(formik.values.endDate) : null}
                    onChange={val => {
                        formik.setFieldValue("endDate", val);
                    }}
                    required
                />
            </Form.Group>
        </Col>

        {/* Select: base */}
        <Col md={4} xs={12} className="mb-2">
            <Form.Group controlId="base">
                <Form.Label>Base</Form.Label>

                <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                {availableCurrencies?.symbols &&
                    <Form.Select
                        name="base"
                        aria-label="base"
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


export default FluctuationsParams;