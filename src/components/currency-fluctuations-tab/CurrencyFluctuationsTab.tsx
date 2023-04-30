import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
    selectAvailableCurrencies, availableCurrenciesThunk,
    selectCurrencyFluctuations, currencyFluctuationsThunk
} from '../../stores/slices/currenciesSlice';
import { Button, Col, Row } from 'react-bootstrap';
import { Formik, useFormik, useFormikContext } from 'formik';
import { shallowEqual } from 'react-redux';
import { ICurrencyFluctuationsParams } from '../../api/exchange-rates-service.types';
import TabTemplate from '../common/tab-template/TabTemplate';
import Form from 'react-bootstrap/Form';
import FormCustom from '../common/form-custom/FormCustom';
import SelectSkeleton from '../common/select-skeleton/SelectSkeleton';
import DelayedSpinner from '../common/delayed-spinner/DelayedSpinner';
import FluctuationsResult from './FluctuationsResult';
import DatePicker from "react-datepicker";
import MetaInfo from '../common/meta-info/MetaInfo';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import ResultContainer from '../common/result-container/ResultContainer';
import { format } from '../../utils/dateTimeHelper';

/**
 *   CurrencyFluctuationsTab
 */

const dateNow = new Date();
const CurrencyFluctuationsTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const currencyFluctuations = useAppSelector(selectCurrencyFluctuations, shallowEqual);
    const dispatch = useAppDispatch();

    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        enableReinitialize: true,
        initialValues: {
            startDate: dateNow,
            endDate: dateNow,
            base: 'EUR',
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
                start_date: format(startDate, 'YYYY-MM-DD') ?? '',
                end_date: format(endDate, 'YYYY-MM-DD') ?? '',
                base: base,
                symbols: symbols,
            }

            console.log(params)
            dispatch(currencyFluctuationsThunk(params))
                .finally(() => setIsSubmitting(false))

        }
    });

    useEffect(() => {
        setAvailableCurrenciesIsLoading(true);
        dispatch(availableCurrenciesThunk())
            .finally(() => setAvailableCurrenciesIsLoading(false));
    }, [dispatch]);

    const handleSubmit = () => {
        //setIsSubmitting(true);
        formik.submitForm();
    };
    console.log(values)

    return (
        <TabTemplate title={'Currency fluctuations'}>
            <FormCustom>
                <DatePicker
                    name='startDate'
                    aria-label='start date'
                    showMonthDropdown
                    showYearDropdown
                    selected={(values.startDate && new Date(values.startDate)) || null}
                    onChange={val => {
                        formik.setFieldValue('startDate', val);
                    }}
                />
                <DatePicker
                    name='endDate'
                    aria-label='end date'
                    selected={(values.endDate && new Date(values.endDate)) || null}
                    onChange={val => {
                        formik.setFieldValue('endDate', val);
                    }}
                />
                <Row className='mb-5 align-items-end'>
                    {/* Select: Currency from */}
                    <Col md={4} xs={12} className='mb-2'>
                        <Form.Group controlId='base'>
                            <Form.Label>Currency from</Form.Label>

                            <SelectSkeleton isShow={availableCurrenciesIsLoading} />

                            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                                <Form.Select
                                    name='base'
                                    aria-label='base'
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

                    {/* Button: Convert */}
                    <Col md={2} xs={12} className='mb-2'>
                        <Button
                            variant='primary'
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Convert
                        </Button>
                    </Col>
                </Row>
            </FormCustom>

            {/* Result */}
            {!isSubmitting && currencyFluctuations?.data && currencyFluctuations?.data?.success === true &&
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
        </TabTemplate>

    );
}

export default CurrencyFluctuationsTab;