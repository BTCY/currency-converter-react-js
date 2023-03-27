import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { selectAvailableCurrencies, availableCurrenciesThunk } from '../../stores/slices/currencies';
import Widget from '../common/Widget';
import Form from 'react-bootstrap/Form';
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
        <>
            <Widget title={'Currency conversion'}>
                {!!availableCurrencies?.symbols &&
                    <Form.Select aria-label="Default select example">
                        {Object.keys(availableCurrencies.symbols).map(k =>
                            <option key={k} value={k}>{availableCurrencies.symbols[k]}</option>
                        )}
                    </Form.Select>
                }
            </Widget>
        </>
    );
}

export default ConvertWidget;