import { Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { availableCurrenciesThunk, selectAvailableCurrencies } from '../../stores/slices/currenciesSlice';
import { shallowEqual } from 'react-redux';
import styles from './Home.module.css';
import CurrencyConversionTab from '../currency-conversion-tab/CurrencyConversionTab';
import CurrencyFluctuationsTab from '../currency-fluctuations-tab/CurrencyFluctuationsTab';
import LatestExchangeRatesTab from '../latest-exchange-rates-tab/LatestExchangeRatesTab';
import ExchangeRateHistoryTab from '../exchange-rate-history-tab/ExchangeRateHistoryTab';
import DelayedSpinner from '../common/delayed-spinner/DelayedSpinner';

/**
 *   Home
 */

const Home = () => {

    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setAvailableCurrenciesIsLoading(true);
        dispatch(availableCurrenciesThunk())
            .finally(() => setAvailableCurrenciesIsLoading(false));
    }, [dispatch]);

    return (
        <div className={styles.tabsWrap}>
            {availableCurrenciesIsLoading &&
                <div className='d-flex h-100 align-items-center justify-content-center'>
                    <DelayedSpinner text={'Loading the list of currencies...'} />
                </div>
            }
            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                <>
                    <Tabs
                        id="home-tab"
                        defaultActiveKey="converter"
                        justify
                    >
                        <Tab
                            eventKey="converter"
                            title="Converter"
                        >
                            <CurrencyConversionTab />
                        </Tab>

                        <Tab
                            eventKey="fluctuations"
                            title="Fluctuations"
                        >
                            <CurrencyFluctuationsTab />
                        </Tab>

                        <Tab
                            eventKey="latestExchangeRates"
                            title="Latest Exchange Rates"
                        >
                            <LatestExchangeRatesTab />
                        </Tab>

                        <Tab
                            eventKey="exchangeRateHistory"
                            title="Exchange Rate History"
                        >
                            <ExchangeRateHistoryTab />
                        </Tab>
                    </Tabs>
                </>
            }
        </div>
    );
}

export default Home;
