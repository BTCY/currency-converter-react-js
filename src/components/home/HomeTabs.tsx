import { Tab, Tabs } from "react-bootstrap";
import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectAvailableCurrencies } from "../../stores/currencies-slice/currenciesSlice";
import { shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { availableCurrenciesThunk } from "../../stores/currencies-slice/availableCurrenciesThunk";
import styles from "./HomeTabs.module.css";
import CurrencyConversionTab from "./currency-conversion-tab/CurrencyConversionTab";
import CurrencyFluctuationsTab from "./currency-fluctuations-tab/CurrencyFluctuationsTab";
import LatestExchangeRatesTab from "./latest-exchange-rates-tab/LatestExchangeRatesTab";
import ExchangeRateHistoryTab from "./exchange-rate-history-tab/ExchangeRateHistoryTab";
import DelayedSpinner from "../common/delayed-spinner/DelayedSpinner";

/**
 *  Home content
 */

const Home = (): ReactElement => {

    const { tabId = "converter" } = useParams();
    const navigate = useNavigate();
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const dispatch = useAppDispatch();
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);

    const handleSelectTab = (tabId: string | null): void => {
        if (typeof tabId === "string") navigate("/" + tabId)
        else navigate("/converter");
    }

    useEffect(() => {
        setAvailableCurrenciesIsLoading(true);
        dispatch(availableCurrenciesThunk())
            .finally(() => setAvailableCurrenciesIsLoading(false));
    }, [dispatch]);

    return (
        <div className={styles.tabsWrap}>

            {availableCurrenciesIsLoading &&
                <div className="d-flex h-100 align-items-center justify-content-center">
                    <DelayedSpinner text={"Loading the list of currencies..."} />
                </div>
            }

            {!availableCurrenciesIsLoading && availableCurrencies?.symbols &&
                <Tabs
                    id="home-tab"
                    activeKey={tabId}
                    onSelect={handleSelectTab}
                    justify
                    className={styles.tabContentWrap}
                >
                    <Tab
                        eventKey="converter"
                        title="Converter"
                        className={styles.tabContent}
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
            }

        </div>
    );
}


export default Home;