import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    selectAvailableCurrencies,
    selectCurrencyFluctuations
} from "../../../stores/currencies-slice/currenciesSlice";
import { format } from "../../../utils/dateTimeHelper";
import { useFormik, } from "formik";
import { shallowEqual } from "react-redux";
import { ICurrencyFluctuationsParams } from "../../../api/exchange-rates-service.types";
import { currencyFluctuationsThunk } from "../../../stores/currencies-slice/currencyFluctuationsThunk";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../../utils/getSearchParams";
import TabTemplate from "../../common/tab-template/TabTemplate";
import DelayedSpinner from "../../common/delayed-spinner/DelayedSpinner";
import ResultContainer from "../../common/result-container/ResultContainer";
import FluctuationsResult from "./FluctuationsResult";
import MetaInfo from "../../common/meta-info/MetaInfo";
import ParamsContainer from "../../common/params-container/ParamsContainer";
import FluctuationsParams from "./FluctuationsParams";
import moment from "moment";
import StubNoData from "../../common/stub-no-data/StubNoData";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

/**
 *   Currency fluctuations tab
 */

const startDateInitValue = format(moment().subtract(2, "days").toDate(), "YYYY-MM-DD");
const endDateInitValue = format(moment().toDate(), "YYYY-MM-DD");


const CurrencyFluctuationsTab = (): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const currencyFluctuations = useAppSelector(selectCurrencyFluctuations, shallowEqual);
    const availableCurrencies = useAppSelector(selectAvailableCurrencies, shallowEqual);
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

        onSubmit: ({ startDate, endDate, base }) => {
            const params: ICurrencyFluctuationsParams = {
                start_date: format(startDate, "YYYY-MM-DD") ?? "",
                end_date: format(endDate, "YYYY-MM-DD") ?? "",
                base: base,
            }

            setSearchParams(getSearchParams(params));

            dispatch(currencyFluctuationsThunk(params))
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
        <TabTemplate title={"Currency fluctuations"}>

            {/* Fluctuations params */}
            <ParamsContainer>
                <FluctuationsParams
                    formik={formik}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    availableCurrencies={availableCurrencies}
                />
            </ParamsContainer>

            {/* Result */}
            {!isSubmitting && !error && currencyFluctuations?.data?.success === true &&
                <ResultContainer>
                    <MetaInfo updateDateMS={Number(currencyFluctuations.update_timestamp)} />
                    <FluctuationsResult
                        result={currencyFluctuations.data}
                        availableCurrencies={availableCurrencies}
                    />
                </ResultContainer>
            }

            {/* Loader */}
            {isSubmitting && <DelayedSpinner />}

            {/* Data not loaded */}
            {!isSubmitting && error && <StubNoData text={error} />}

        </TabTemplate>
    );
}


export default CurrencyFluctuationsTab;