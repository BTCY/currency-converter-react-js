import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IStoreDataInIndexedDB, IndexedDbError, Stores } from "../../api/indexedDB-service.types";
import { availableCurrenciesThunk } from "./availableCurrenciesThunk";
import { convertedCurrencyThunk } from "./convertedCurrencyThunk";
import { currencyFluctuationsThunk } from "./currencyFluctuationsThunk";
import { latestExchangeRatesThunk } from "./latestExchangeRatesThunk";
import { exchangeRateHistoryThunk } from "./exchangeRateHistoryThunk";

/**
 *  Store slice for currency data
 */

export const CACHING_RESULT_IN_MINUTES = 60;
export const AVAILABLE_CURR_CACHING_IN_MINUTES = 43800;


export interface ICurrenciesState {
    availableCurrencies: IStoreDataInIndexedDB<Stores.AvailableCurrencies> | undefined;
    convertedCurrency: IStoreDataInIndexedDB<Stores.ConvertedCurrency> | undefined;
    currencyFluctuations: IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined;
    latestExchangeRates: IStoreDataInIndexedDB<Stores.LatestExchangeRates> | undefined;
    exchangeRateHistory: IStoreDataInIndexedDB<Stores.ExchangeRateHistory> | undefined;
    status: "idle" | "loading" | "failed";
}

const initialState: ICurrenciesState = {
    availableCurrencies: undefined,
    convertedCurrency: undefined,
    currencyFluctuations: undefined,
    latestExchangeRates: undefined,
    exchangeRateHistory: undefined,
    status: "idle",
};

export const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Available Currencies
            .addCase(availableCurrenciesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(availableCurrenciesThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.availableCurrencies = action.payload;
            })
            .addCase(availableCurrenciesThunk.rejected, (state, action) => {
                state.status = "failed";
                if (action?.error?.message !== IndexedDbError.Common) {
                    throw action?.error?.message;
                }
            })
            // Converted Currency
            .addCase(convertedCurrencyThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(convertedCurrencyThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.convertedCurrency = action.payload;
            })
            .addCase(convertedCurrencyThunk.rejected, (state, action) => {
                state.status = "failed";
                if (action?.error?.message !== IndexedDbError.Common) {
                    throw action?.error?.message;
                }
            })
            // Currency Fluctuations
            .addCase(currencyFluctuationsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currencyFluctuationsThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.currencyFluctuations = action.payload;
            })
            .addCase(currencyFluctuationsThunk.rejected, (state, action) => {
                state.status = "failed";
                if (action?.error?.message !== IndexedDbError.Common) {
                    throw action?.error?.message;
                }
            })
            // Latest Exchange Rates
            .addCase(latestExchangeRatesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(latestExchangeRatesThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.latestExchangeRates = action.payload;
            })
            .addCase(latestExchangeRatesThunk.rejected, (state, action) => {
                state.status = "failed";
                if (action?.error?.message !== IndexedDbError.Common) {
                    throw action?.error?.message;
                }
            })
            // Exchange Rate History
            .addCase(exchangeRateHistoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(exchangeRateHistoryThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.exchangeRateHistory = action.payload;
            })
            .addCase(exchangeRateHistoryThunk.rejected, (state, action) => {
                state.status = "failed";
                if (action?.error?.message !== IndexedDbError.Common) {
                    throw action?.error?.message;
                }
            })
    },
});


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;
export const selectConvertedCurrency = (state: RootState) => state.currencies.convertedCurrency;
export const selectCurrencyFluctuations = (state: RootState) => state.currencies.currencyFluctuations;
export const selectLatestExchangeRates = (state: RootState) => state.currencies.latestExchangeRates;
export const selectExchangeRateHistory = (state: RootState) => state.currencies.exchangeRateHistory;

export default currenciesSlice.reducer;
