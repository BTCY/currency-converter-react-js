import { Alert, Tab, Tabs } from "react-bootstrap";
import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectAvailableCurrencies } from "../../stores/currencies-slice/currenciesSlice";
import { shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { availableCurrenciesThunk } from "../../stores/currencies-slice/availableCurrenciesThunk";
import { RoutesData } from "../../routes/routes";
import styles from "./HomeTabs.module.css";
import CurrencyConversionTab from "./currency-conversion-tab/CurrencyConversionTab";
import CurrencyFluctuationsTab from "./currency-fluctuations-tab/CurrencyFluctuationsTab";
import LatestExchangeRatesTab from "./latest-exchange-rates-tab/LatestExchangeRatesTab";
import ExchangeRateHistoryTab from "./exchange-rate-history-tab/ExchangeRateHistoryTab";
import DelayedSpinner from "../common/delayed-spinner/DelayedSpinner";
import StubNoData from "../common/stub-no-data/StubNoData";

/**
 *  Home content
 */

enum TABS_ID {
    Converter = "converter",
    Fluctuations = "fluctuations",
    LatestExchangeRates = "latest-exchange-rates",
    ExchangeRateHistory = "exchange-rate-history",
}


const HomeTabs = (): ReactElement => {

    const { tabId = TABS_ID.Converter } = useParams();
    const navigate = useNavigate();
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const dispatch = useAppDispatch();
    const [availableCurrenciesIsLoading, setAvailableCurrenciesIsLoading] = useState<boolean>(true);

    const handleSelectTab = (tabId: string | null): void => {
        if (typeof tabId === "string") navigate("/" + tabId)
        else navigate("/" + TABS_ID.Converter);
    }

    useEffect(() => {
        setAvailableCurrenciesIsLoading(true);
        dispatch(availableCurrenciesThunk())
            .finally(() => setAvailableCurrenciesIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (!(Object.values(TABS_ID).includes(tabId as TABS_ID))) {
            navigate(RoutesData.notFoundPage.path)
        }
    }, [navigate, tabId]);

    return (
        <div className={styles.tabsWrap}>

            {/* Loader */}
            {availableCurrenciesIsLoading &&
                <div className="d-flex h-100 align-items-center justify-content-center">
                    <DelayedSpinner text={"Loading the list of currencies..."} />
                </div>
            }

            {/* Data not loaded */}
            {!availableCurrenciesIsLoading && !availableCurrencies?.data?.symbols && <StubNoData />}

            {/* Warning if IndexedDB not work */}
            {!availableCurrenciesIsLoading && !availableCurrencies?.isCachedInIndexedDB &&
                <Alert variant={"warning"}>
                    Warning! IndexedDB does not work in your browser. The result of some functions will not be cached locally.
                </Alert>
            }

            {/* Tabs */}
            {!availableCurrenciesIsLoading && availableCurrencies?.data?.symbols &&
                <Tabs
                    id="home-tab"
                    activeKey={tabId}
                    onSelect={handleSelectTab}
                    justify
                    className={styles.tabContentWrap}
                    defaultActiveKey={TABS_ID.Converter}
                >
                    <Tab
                        eventKey={TABS_ID.Converter}
                        title="Converter"
                        className={styles.tabContent}
                    >
                        <CurrencyConversionTab />
                    </Tab>

                    <Tab
                        eventKey={TABS_ID.Fluctuations}
                        title="Fluctuations"
                    >
                        <CurrencyFluctuationsTab />
                    </Tab>

                    <Tab
                        eventKey={TABS_ID.LatestExchangeRates}
                        title="Latest Exchange Rates"
                    >
                        <LatestExchangeRatesTab />
                    </Tab>

                    <Tab
                        eventKey={TABS_ID.ExchangeRateHistory}
                        title="Exchange Rate History"
                    >
                        <ExchangeRateHistoryTab />
                    </Tab>
                </Tabs>
            }

        </div>
    );
}


export default HomeTabs;
