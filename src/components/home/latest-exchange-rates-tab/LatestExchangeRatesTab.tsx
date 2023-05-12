import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    selectAvailableCurrencies,
    selectLatestExchangeRates
} from "../../../stores/currencies-slice/currenciesSlice";
import { useFormik } from "formik";
import { shallowEqual } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../../utils/getSearchParams";
import { ILatestExchangeRatesParams } from "../../../api/exchange-rates-service.types";
import { latestExchangeRatesThunk } from "../../../stores/currencies-slice/latestExchangeRatesThunk";
import TabTemplate from "../../common/tab-template/TabTemplate";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import LatestExchangeRatesResult from "./LatestExchangeRatesResult";
import MetaInfo from "../../common/meta-info/MetaInfo";
import ResultContainer from "../../common/result-container/ResultContainer";
import LatestExchangeRatesParams from "./LatestExchangeRatesParams";
import ParamsContainer from "../../common/params-container/ParamsContainer";
import StubNoData from "../../common/stub-no-data/StubNoData";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

/**
 *   Latest exchange rates tab
 */

const LatestExchangeRatesTab = (): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const latestExchangeRates = useAppSelector(selectLatestExchangeRates, shallowEqual);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,

        initialValues: {
            base: searchParams.get("base") ?? "USD",
        },

        validationSchema: Yup.object({
            base: Yup.string()
                .required(),
        }),

        onSubmit: async ({ base }) => {
            const params: ILatestExchangeRatesParams = {
                base,
            }

            setSearchParams(getSearchParams(params));

            dispatch(latestExchangeRatesThunk(params))
                .catch(e => setError(e))
                .finally(() => setIsSubmitting(false))
        }
    });

    const handleSubmit = (): void => {
        setError(undefined);
        setIsSubmitting(true);
        formik.submitForm();
    };

    return (
        <TabTemplate title={"Latest Exchange Rates"}
            isDisabledResetButton={Array.from(searchParams).length === 0}
            handleResetButton={() => setSearchParams()}
        >

            {/* Latest exchange rates params */}
            <ParamsContainer>
                <LatestExchangeRatesParams
                    formik={formik}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    availableCurrencies={availableCurrencies?.data}
                />
            </ParamsContainer>

            {/* Result */}
            {!isSubmitting && !error && latestExchangeRates?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo
                        updateDateMS={Number(latestExchangeRates.update_timestamp)}
                    />

                    <LatestExchangeRatesResult
                        result={latestExchangeRates.data}
                        availableCurrencies={availableCurrencies?.data}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner text={"Getting the latest exchange rates..."} />}

            {/* Data not loaded */}
            {!isSubmitting && error && <StubNoData text={error} />}

        </TabTemplate>
    );
}


export default LatestExchangeRatesTab;