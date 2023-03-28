import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { selectAvailableCurrencies, availableCurrenciesThunk } from '../../stores/slices/currenciesSlice';
import TabTemplate from '../common/TabTemplate/TabTemplate';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';

/**
 *   ConvertWidget
 */

const ConvertWidget = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(availableCurrenciesThunk())
    }, [dispatch]);

    // console.log(availableCurrencies) 
    return (
        <TabTemplate title={'Currency conversion'}>
            <Form>
                {/* From */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Currency from</Form.Label>
                    {!!availableCurrencies?.symbols &&
                        <Form.Select aria-label="currency-conversion-from">
                            <option>Select currency from</option>
                            {Object.keys(availableCurrencies.symbols).map(k =>
                                <option key={k} value={k}>{availableCurrencies.symbols[k]}</option>
                            )}
                        </Form.Select>
                    }
                </Form.Group>

                {/* To */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Currency to</Form.Label>
                    {!!availableCurrencies?.symbols &&
                        <Form.Select aria-label="currency-conversion-from">
                            <option>Select currency to</option>
                            {Object.keys(availableCurrencies.symbols).map(k =>
                                <option key={k} value={k}>{availableCurrencies.symbols[k]}</option>
                            )}
                        </Form.Select>
                    }
                </Form.Group>

                <Button variant="primary" type="submit">
                    Convert
                </Button>
            </Form>



        </TabTemplate>
    );
}

export default ConvertWidget;