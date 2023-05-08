import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    selectAvailableCurrencies,
    selectCurrencyFluctuations
} from "../../../stores/currencies-slice/currenciesSlice";
import { format } from "../../../utils/dateTimeHelper";
import { Button, Col, Row } from "react-bootstrap";
import { useFormik, } from "formik";
import { shallowEqual } from "react-redux";
import { ICurrencyFluctuationsParams } from "../../../api/exchange-rates-service.types";
import { currencyFluctuationsThunk } from "../../../stores/currencies-slice/currencyFluctuationsThunk";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../../utils/getSearchParams";
import TabTemplate from "../../common/tab-template/TabTemplate";
import Form from "react-bootstrap/Form";
import FormCustom from "../../common/form-custom/FormCustom";
import SelectSkeleton from "../../common/select-skeleton/SelectSkeleton";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import DatePickerCustom from "../../common/date-picker-custom/DatePickerCustom";
import ResultContainer from "../../common/result-container/ResultContainer";
import FluctuationsResult from "./FluctuationsResult";
import MetaInfo from "../../common/meta-info/MetaInfo";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

/**
 *   CurrencyFluctuationsTab
 */

const startDateInitValue = new Date("2018-02-20");
const endDateInitValue = new Date("2018-02-25");

const CurrencyFluctuationsTab = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const currencyFluctuations = useAppSelector(selectCurrencyFluctuations, shallowEqual);
    const dispatch = useAppDispatch();

    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        enableReinitialize: true,
        initialValues: {
            startDate: searchParams.get("start_date") ?? startDateInitValue,
            endDate: searchParams.get("end_date") ?? endDateInitValue,
            base: searchParams.get("base") ?? "USD",
            symbols: undefined,
        },
        validationSchema: Yup.object({
            startDate: Yup.date(),
            endDate: Yup.date(),
            base: Yup.string(),
            symbols: Yup.string(),
        }),

        onSubmit: async ({ startDate, endDate, base, symbols }) => {

            const params: ICurrencyFluctuationsParams = {
                start_date: format(startDate, "YYYY-MM-DD") ?? "",
                end_date: format(endDate, "YYYY-MM-DD") ?? "",
                base: base,
                // symbols: symbols,
            }

            setSearchParams(getSearchParams(params));

            dispatch(currencyFluctuationsThunk(params))
                .finally(() => setIsSubmitting(false))

        }
    });

    const handleSubmit = () => {
        setIsSubmitting(true);
        formik.submitForm();
    };

    return (
        <TabTemplate title={"Currency fluctuations"}>
            <FormCustom>
                <Row className="mb-5 align-items-end">

                    {/* DatePicker: start date */}
                    <Col md={3} xs={12} className="mb-2">
                        <DatePickerCustom
                            placeholderText="Start date"
                            name="startDate"
                            aria-label="start date"
                            showMonthDropdown
                            showYearDropdown
                            selected={(values.startDate && new Date(values.startDate)) || null}
                            onChange={val => {
                                formik.setFieldValue("startDate", val);
                            }}
                        />
                    </Col>

                    {/* DatePicker: end date */}
                    <Col md={3} xs={12} className="mb-2">
                        <DatePickerCustom
                            name="endDate"
                            aria-label="end date"
                            selected={(values.endDate && new Date(values.endDate)) || null}
                            onChange={val => {
                                formik.setFieldValue("endDate", val);
                            }}
                        />
                    </Col>

                    {/* Select: Currency from */}
                    <Col md={4} xs={12} className="mb-2">
                        <Form.Group controlId="base">
                            <Form.Label>Currency from</Form.Label>

                            <SelectSkeleton isShow={!availableCurrencies?.symbols} />

                            {availableCurrencies?.symbols &&
                                <Form.Select
                                    name="base"
                                    aria-label="base"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.base}
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
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </FormCustom>

            {/* Result */}
            {
                !isSubmitting && currencyFluctuations?.data && currencyFluctuations?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(currencyFluctuations.update_timestamp)} />
                    <FluctuationsResult
                        result={currencyFluctuations.data}
                        availableCurrencies={availableCurrencies}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}
        </TabTemplate >

    );
}

export default CurrencyFluctuationsTab;