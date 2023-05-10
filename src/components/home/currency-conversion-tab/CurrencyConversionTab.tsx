import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    selectAvailableCurrencies,
    selectConvertedCurrency
} from "../../../stores/currencies-slice/currenciesSlice";
import { useFormik } from "formik";
import { shallowEqual } from "react-redux";
import { IConvertedCurrencyParams } from "../../../api/exchange-rates-service.types";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../../utils/getSearchParams";
import { convertedCurrencyThunk } from "../../../stores/currencies-slice/convertedCurrencyThunk";
import TabTemplate from "../../common/tab-template/TabTemplate";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import ConversionResult from "./ConversionResult";
import MetaInfo from "../../common/meta-info/MetaInfo";
import ResultContainer from "../../common/result-container/ResultContainer";
import ConversionParams from "./ConversionParams";
import ParamsContainer from "../../common/params-container/ParamsContainer";
import StubNoData from "../../common/stub-no-data/StubNoData";
import * as Yup from "yup";

/**
 *  Currency conversion tab
 */

const CurrencyConversionTab = (): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
    const convertedCurrency = useAppSelector(selectConvertedCurrency, shallowEqual);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,

        initialValues: {
            currencyFrom: searchParams.get("from") ?? "USD",
            currencyTo: searchParams.get("to") ?? "EUR",
            currencyAmount: searchParams.has("amount") ? Number(searchParams.get("amount")) : 1,
        },

        validationSchema: Yup.object({
            currencyFrom: Yup.string()
                .required(),
            currencyTo: Yup.string()
                .required(),
            currencyAmount: Yup.number()
                .required(),
        }),

        onSubmit: ({ currencyFrom, currencyTo, currencyAmount }) => {
            const params: IConvertedCurrencyParams = {
                from: currencyFrom,
                to: currencyTo,
                amount: currencyAmount,
            }

            setSearchParams(getSearchParams(params));

            dispatch(convertedCurrencyThunk(params))
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
        <TabTemplate title={"Currency conversion"}>

            {/* Conversion params */}
            <ParamsContainer>
                <ConversionParams
                    formik={formik}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    availableCurrencies={availableCurrencies}
                />
            </ParamsContainer>

            {/* Result */}
            {!isSubmitting && !error && convertedCurrency?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(convertedCurrency.update_timestamp)} />
                    <ConversionResult result={convertedCurrency?.data} />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}

            {/* Data not loaded */}
            {!isSubmitting && error && <StubNoData text={error} />}

        </TabTemplate>
    );
}


export default CurrencyConversionTab;