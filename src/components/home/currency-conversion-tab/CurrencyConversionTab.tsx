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
import FormCustom from "../../common/form-custom/FormCustom";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import ConversionResult from "./ConversionResult";
import MetaInfo from "../../common/meta-info/MetaInfo";
import ResultContainer from "../../common/result-container/ResultContainer";
import ConversionParams from "./ConversionParams";
import * as Yup from "yup";

/**
 *  Currency Conversion Tab
 */

const CurrencyConversionTab = (): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
                .required("1"),
            currencyTo: Yup.string()
                .required("1"),
            currencyAmount: Yup.number()
                .required("1"),
        }),

        onSubmit: async ({ currencyFrom, currencyTo, currencyAmount }) => {

            const params: IConvertedCurrencyParams = {
                from: currencyFrom,
                to: currencyTo,
                amount: currencyAmount,
            }

            setSearchParams(getSearchParams(params));

            dispatch(convertedCurrencyThunk(params))
                .finally(() => setIsSubmitting(false))

        }
    });

    const handleSubmit = () => {
        setIsSubmitting(true);
        formik.submitForm();
    };

    return (
        <TabTemplate title={"Currency conversion"}>
            <FormCustom>
                <ConversionParams
                    formik={formik}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    availableCurrencies={availableCurrencies}
                />
            </FormCustom>

            {/* Result */}
            {!isSubmitting && convertedCurrency?.data && convertedCurrency?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(convertedCurrency.update_timestamp)} />
                    <ConversionResult result={convertedCurrency?.data} />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}
        </TabTemplate>

    );
}


export default CurrencyConversionTab;