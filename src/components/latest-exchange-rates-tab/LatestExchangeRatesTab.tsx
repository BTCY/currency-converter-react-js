import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
    selectAvailableCurrencies, availableCurrenciesThunk,
    latestExchangeRatesThunk, selectLatestExchangeRates
} from '../../stores/slices/currenciesSlice';
import { Button, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { shallowEqual } from 'react-redux';
import { ILatestExchangeRatesParams } from '../../api/exchange-rates-service.types';
import TabTemplate from '../common/tab-template/TabTemplate';
import Form from 'react-bootstrap/Form';
import FormCustom from '../common/form-custom/FormCustom';
import SelectSkeleton from '../common/select-skeleton/SelectSkeleton';
import DelayedSpinner from '../common/delayed-spinner/DelayedSpinner';
import LatestExchangeRatesResult from './LatestExchangeRatesResult';
import MetaInfo from '../common/meta-info/MetaInfo';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import ResultContainer from '../common/result-container/ResultContainer';

/**
 *   CurrencyFluctuationsTab
 */

const LatestExchangeRatesTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const latestExchangeRates = useAppSelector(selectLatestExchangeRates, shallowEqual);
    const dispatch = useAppDispatch();

    const { values, touched, errors, ...formik } = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        initialValues: {
            base: 'USD',
            symbols: undefined,
        },
        validationSchema: Yup.object({
            base: Yup.string(),
            symbols: Yup.string(),
        }),

        onSubmit: async ({ base, symbols }) => {

            const params: ILatestExchangeRatesParams = {
                base,
                symbols
            }

            dispatch(latestExchangeRatesThunk(params))
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
        <TabTemplate title={'Latest Exchange Rates'}>
            <FormCustom>
                <Row className='mb-5 align-items-end'>
                    {/* Select: Currency from */}
                    <Col md={4} xs={12} className='mb-2'>
                        <Form.Group controlId='base'>
                            <Form.Label>Base</Form.Label>

                            <SelectSkeleton isShow={availableCurrenciesIsLoading} />

                            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                                <Form.Select
                                    name='base'
                                    aria-label='base currency'
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
            {!isSubmitting && latestExchangeRates?.data && latestExchangeRates?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo
                        updateDateMS={Number(latestExchangeRates.update_timestamp)}
                    />

                    <LatestExchangeRatesResult
                        result={latestExchangeRates.data}
                        availableCurrencies={availableCurrencies}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}

        </TabTemplate>

    );
}

export default LatestExchangeRatesTab;