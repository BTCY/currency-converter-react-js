import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { selectAvailableCurrencies, availableCurrenciesThunk } from '../../stores/slices/currencies';
// import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';

/**
 *   Home
 */

const Home = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(availableCurrenciesThunk())
    }, [dispatch]);

    // console.log(availableCurrencies) 
    return (
        <>
            {!!availableCurrencies?.symbols &&
                <Form.Select aria-label="Default select example">
                    {Object.keys(availableCurrencies.symbols).map(k =>
                        <option key={k} value={k}>{availableCurrencies.symbols[k]}</option>
                    )}
                </Form.Select>
            }
        </>
    );
}

export default Home;