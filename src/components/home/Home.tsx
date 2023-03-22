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
        // dispatch(availableCurrenciesThunk())
    }, [dispatch]);

    // console.log(availableCurrencies)

    return (
        <>TODO</>
    );
}

export default Home;