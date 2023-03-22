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
            {/* {!!availableCurrencies?.data &&
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option> 
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            } */}
        </>
    );
}

export default Home;