import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
    selectAvailableCurrencies, availableCurrenciesThunk,
    selectConvertedCurrency, convertedCurrencyThunk
} from '../../stores/slices/currenciesSlice';
import { Button, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import TabTemplate from '../common/TabTemplate/TabTemplate';
import Form from 'react-bootstrap/Form';
import FormCustom from '../common/FormCustom/FormCustom';
import * as Yup from 'yup';
import { shallowEqual, useSelector } from 'react-redux';
import { IApiConvertedCurrency } from '../../api/exchange-rates-service.types';
import SelectSkeleton from '../common/SelectSkeleton/SelectSkeleton';
// import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';

/**
 *   CurrencyConversionTab
 */

const CurrencyConversionTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const convertedCurrency = useAppSelector(selectConvertedCurrency, shallowEqual);
    const dispatch = useAppDispatch();
    // console.log(useSelector((store: any) => store?.currencies)) 
    // const [convertedCurrency, setConvertedCurrency] = useState<IApiConvertedCurrency | undefined>(undefined);

    // console.log(useAppSelector(selectConvertedCurrency))

    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        initialValues: {
            currencyFrom: 'USD',
            currencyTo: 'EUR',
            amount: 1,
        },
        validationSchema: Yup.object({
            currencyFrom: Yup.string()
                .required('1'),
            currencyTo: Yup.string()
                .required('1'),
            amount: Yup.number()
                .required('1'),
        }),

        onSubmit: async (values: any) => {

            const params = {
                from: values.currencyFrom,
                to: values.currencyTo,
                amount: values.amount,
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
    // console.log(availableCurrenciesIsLoading)
    // console.log(availableCurrencies)

    return (
        <TabTemplate title={'Currency conversion'}>
            <FormCustom>
                <Row className='mb-5'>
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
                                    type='number'
                                    aria-label='currency amount'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={values.amount}
                                    required
                                    min={1}
                                />
                            }
                        </Form.Group>
                    </Col>

                    {/* Button: Convert */}
                    <Col md={2} xs={12} className='mb-2'>
                        <Button
                            className='mb-2'
                            variant='primary'
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Convert
                        </Button>
                    </Col>
                </Row>
            </FormCustom>

            <Row className='mb-5'>
                {convertedCurrency?.result && convertedCurrency.success &&
                    <>
                        <p>result: {convertedCurrency?.result}</p>
                    </>
                }
            </Row>
        </TabTemplate>

    );
}

export default CurrencyConversionTab;