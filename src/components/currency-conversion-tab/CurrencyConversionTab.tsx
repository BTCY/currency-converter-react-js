import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
    selectAvailableCurrencies, availableCurrenciesThunk,
    selectConvertedCurrency, convertedCurrencyThunk
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
import ConversionResult from './ConversionResult';
import MetaInfo from './MetaInfo';
import { IConvertedCurrencyParams } from '../../api/exchange-rates-service.types';

/**
 *   CurrencyConversionTab
 */

const CurrencyConversionTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const convertedCurrency = useAppSelector(selectConvertedCurrency, shallowEqual);
    const dispatch = useAppDispatch();


    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        initialValues: {
            currencyFrom: 'USD',
            currencyTo: 'EUR',
            currencyAmount: 1,
        },
        validationSchema: Yup.object({
            currencyFrom: Yup.string()
                .required('1'),
            currencyTo: Yup.string()
                .required('1'),
            currencyAmount: Yup.number()
                .required('1'),
        }),

        onSubmit: async ({ currencyFrom, currencyTo, currencyAmount }) => {

            const params: IConvertedCurrencyParams = {
                from: currencyFrom,
                to: currencyTo,
                amount: currencyAmount,
            }

            dispatch(convertedCurrencyThunk(params))
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
        <TabTemplate title={'Currency conversion'}>
            <FormCustom>
                <Row className='mb-5 align-items-end'>
                    {/* Select: Currency from */}
                    <Col md={4} xs={12} className='mb-2'>
                        <Form.Group controlId='currencyFrom'>
                            <Form.Label>Currency from</Form.Label>

                            <SelectSkeleton isShow={availableCurrenciesIsLoading} />

                            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                                <Form.Select
                                    name='currencyFrom'
                                    aria-label='currency from'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.currencyFrom}
                                    required
                                >
                                    {Object.keys(availableCurrencies.symbols).map(k =>
                                        <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                                    )}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Col>

                    {/* Select: Currency to */}
                    <Col md={4} xs={12} className='mb-2'>
                        <Form.Group controlId='currencyTo'>
                            <Form.Label>Currency to</Form.Label>

                            <SelectSkeleton isShow={availableCurrenciesIsLoading} />

                            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                                <Form.Select
                                    name='currencyTo'
                                    aria-label='currency to'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.currencyTo}
                                    required
                                >
                                    {Object.keys(availableCurrencies.symbols).map(k =>
                                        <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                                    )}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Col>

                    {/* Input: Amount */}
                    <Col md={2} xs={12} className='mb-2'>
                        <Form.Group controlId='currencyAmount'>
                            <Form.Label>Amount</Form.Label>

                            <SelectSkeleton isShow={availableCurrenciesIsLoading} />

                            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                                <Form.Control
                                    name='currencyAmount'
                                    type='number'
                                    aria-label='currency amount'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.currencyAmount}
                                    required
                                    min={1}
                                />
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
            {!isSubmitting && convertedCurrency?.result && convertedCurrency?.success === true &&
                <div>
                    <MetaInfo result={convertedCurrency} />
                    <ConversionResult result={convertedCurrency} />
                </div>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}
        </TabTemplate>

    );
}

export default CurrencyConversionTab;