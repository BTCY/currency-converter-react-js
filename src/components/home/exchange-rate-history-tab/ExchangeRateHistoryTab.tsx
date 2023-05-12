import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    selectAvailableCurrencies,
    selectExchangeRateHistory
} from "../../../stores/currencies-slice/currenciesSlice";
import { useFormik } from "formik";
import { shallowEqual } from "react-redux";
import { IExchangeRateHistoryParams } from "../../../api/exchange-rates-service.types";
import { format } from "../../../utils/dateTimeHelper";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../../utils/getSearchParams";
import { exchangeRateHistoryThunk } from "../../../stores/currencies-slice/exchangeRateHistoryThunk";
import TabTemplate from "../../common/tab-template/TabTemplate";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import ExchangeRateHistoryResult from "./ExchangeRateHistoryResult";
import ResultContainer from "../../common/result-container/ResultContainer";
import MetaInfo from "../../common/meta-info/MetaInfo";
import moment from "moment";
import ParamsContainer from "../../common/params-container/ParamsContainer";
import ExchangeRateHistoryParams from "./ExchangeRateHistoryParams";
import StubNoData from "../../common/stub-no-data/StubNoData";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

/**
 *   Exchange rate history tab
 */

const startDateInitValue = format(moment().subtract(7, "days").toDate(), "YYYY-MM-DD");
const endDateInitValue = format(moment().toDate(), "YYYY-MM-DD");

const ExchangeRateHistoryTab = (): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const exchangeRateHistory = useAppSelector(selectExchangeRateHistory, shallowEqual);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,

        initialValues: {
            startDate: searchParams.has("start_date") && new Date(searchParams.get("start_date") as string)?.getTime()
                ? searchParams.get("start_date")
                : startDateInitValue,
            endDate: searchParams.has("end_date") && new Date(searchParams.get("end_date") as string)?.getTime()
                ? searchParams.get("end_date")
                : endDateInitValue,
            base: searchParams.get("base") ?? "USD",
        },

        validationSchema: Yup.object({
            startDate: Yup.date()
                .required(),
            endDate: Yup.date()
                .required(),
            base: Yup.string()
                .required(),
        }),

        onSubmit: async ({ startDate, endDate, base }) => {
            const params: IExchangeRateHistoryParams = {
                start_date: format(startDate, "YYYY-MM-DD") ?? "",
                end_date: format(endDate, "YYYY-MM-DD") ?? "",
                base: base,
            }

            setSearchParams(getSearchParams(params));

            dispatch(exchangeRateHistoryThunk(params))
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
        <TabTemplate title={"Exchange Rate History"}
            isDisabledResetButton={Array.from(searchParams).length === 0}
            handleResetButton={() => setSearchParams()}
        >

            {/* Exchange rate history params */}
            <ParamsContainer>
                <ExchangeRateHistoryParams
                    formik={formik}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    availableCurrencies={availableCurrencies?.data}
                />
            </ParamsContainer>

            {/* Result */}
            {!isSubmitting
                && !error && exchangeRateHistory?.data?.success === true
                && availableCurrencies?.data?.symbols &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(exchangeRateHistory.update_timestamp)} />
                    <ExchangeRateHistoryResult
                        result={exchangeRateHistory.data}
                        availableCurrencies={availableCurrencies.data}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner text={"Getting the history of rates..."} />}

            {/* Data not loaded */}
            {!isSubmitting && error && <StubNoData text={error} />}

        </TabTemplate>

    );
}

export default ExchangeRateHistoryTab;