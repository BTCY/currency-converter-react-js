import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { selectAvailableCurrencies, availableCurrenciesThunk } from '../../stores/slices/currenciesSlice';
import TabTemplate from '../common/TabTemplate/TabTemplate';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
// import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';

/**
 *   CurrencyConversionTab
 */

const CurrencyConversionTab = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(availableCurrenciesThunk())
    }, [dispatch]);

    // console.log(availableCurrencies) 
    return (
        <TabTemplate title={'Currency conversion'}>
            <Form>
                <Row>
                    {/* Select: sCurrency from */}
                    <Col md={4} xs={12} className="mb-2">
                        <Form.Group controlId="currencyFrom">
                            <Form.Label>Currency from</Form.Label>
                            {!!availableCurrencies?.symbols &&
                                <Form.Select aria-label="currency-conversion-from">
                                    {Object.keys(availableCurrencies.symbols).map(k =>
                                        <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                                    )}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Col>

                    {/* Select: Currency to */}
                    <Col md={4} xs={12} className="mb-2">
                        <Form.Group controlId="currencyTo">
                            <Form.Label>Currency to</Form.Label>
                            {!!availableCurrencies?.symbols &&
                                <Form.Select aria-label="currency-conversion-from">
                                    {Object.keys(availableCurrencies.symbols).map(k =>
                                        <option key={k} value={k}>{k} - {availableCurrencies.symbols[k]}</option>
                                    )}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Col>

                    {/* Input: Amount */}
                    <Col md={2} xs={12} className="mb-2">
                        <Form.Group controlId="currencyAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" min={1} />
                        </Form.Group>
                    </Col>

                    {/* Button: Convert */}
                    <Col md={2} xs={12} className="mb-2">
                        <Button className="mb-2" variant="primary" type="submit" >
                            Convert
                        </Button>
                    </Col>
                </Row>
            </Form>



        </TabTemplate>
    );
}

export default CurrencyConversionTab;