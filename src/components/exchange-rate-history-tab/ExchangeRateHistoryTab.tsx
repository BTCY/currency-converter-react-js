import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
    selectAvailableCurrencies, availableCurrenciesThunk,
    selectExchangeRateHistory, exchangeRateHistoryThunk
} from '../../stores/slices/currenciesSlice';
import { Button, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { shallowEqual } from 'react-redux';
import TabTemplate from '../common/tab-template/TabTemplate';
import Form from 'react-bootstrap/Form';
import FormCustom from '../common/form-custom/FormCustom';
import SelectSkeleton from '../common/select-skeleton/SelectSkeleton';
import * as Yup from 'yup';
import DelayedSpinner from '../common/delayed-spinner/DelayedSpinner';
import ExchangeRateHistoryResult from './ExchangeRateHistoryResult';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IExchangeRateHistoryParams } from '../../api/exchange-rates-service.types';
import ResultContainer from '../common/result-container/ResultContainer';
import MetaInfo from '../common/meta-info/MetaInfo';
import { format } from '../../utils/dateTimeHelper';

/**
 *   ExchangeRateHistoryTab
 */

const startDateInitValue = new Date('2018-02-20');
const endDateInitValue = new Date('2018-02-25');

const ExchangeRateHistoryTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const exchangeRateHistory = useAppSelector(selectExchangeRateHistory, shallowEqual);
    const dispatch = useAppDispatch();

    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        initialValues: {
            startDate: startDateInitValue,
            endDate: endDateInitValue,
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

            const params: IExchangeRateHistoryParams = {
                start_date: format(startDate, 'YYYY-MM-DD') ?? '',
                end_date: format(endDate, 'YYYY-MM-DD') ?? '',
                base: base,
                symbols: symbols,
            }

            dispatch(exchangeRateHistoryThunk(params))
                .finally(() => setIsSubmitting(false))

        }
    });


    useEffect(() => {
        setAvailableCurrenciesIsLoading(true);
        dispatch(availableCurrenciesThunk())
            .finally(() => setAvailableCurrenciesIsLoading(false));
    }, [dispatch]);

    const handleSubmit = () => {
        setIsSubmitting(true);
        formik.submitForm();
    };


    return (
        <TabTemplate title={'Exchange Rate History'}>
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
            {!isSubmitting
                && exchangeRateHistory?.data && exchangeRateHistory?.data?.success === true
                && availableCurrencies?.success === true && availableCurrencies?.symbols &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(exchangeRateHistory.update_timestamp)} />
                    <ExchangeRateHistoryResult
                        result={exchangeRateHistory.data}
                        availableCurrencies={availableCurrencies}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}
        </TabTemplate>

    );
}

export default ExchangeRateHistoryTab;