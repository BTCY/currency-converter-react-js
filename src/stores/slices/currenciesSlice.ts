import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getAllAvailableCurrencies, getConvertedCurrency, getCurrencyFluctuations,
    getLatestExchangeRates
} from '../../api/exchange-rates-service';
import { RootState } from '../store';
import { putInIndexedDB, getFromIndexedDB, KEY_PATH } from '../../api/indexedDB-service';
import { diff } from '../../utils/dateTimeHelper';
import { IStoreDataInIndexedDB, Stores } from '../../api/indexedDB-service.types';
import {
    IConvertedCurrencyParams, ICurrencyFluctuationsParams, ILatestExchangeRatesParams,
    IApiAllAvailableCurrencies
} from '../../api/exchange-rates-service.types';


const ALLOW_DIFF_IN_MINUTES = 20160;

export interface ICurrenciesState {
    value: number;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
    convertedCurrency: IStoreDataInIndexedDB<Stores.ConvertedCurrency> | undefined;
    currencyFluctuations: IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined;
    latestExchangeRates: IStoreDataInIndexedDB<Stores.LatestExchangeRates> | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ICurrenciesState = {
    value: 0,
    availableCurrencies: undefined,
    convertedCurrency: undefined,
    currencyFluctuations: undefined,
    latestExchangeRates: undefined,
    status: 'idle',
};

export const availableCurrenciesThunk = createAsyncThunk(
    'currencies/availableCurrencies',
    async (): Promise<IApiAllAvailableCurrencies | undefined> => {
        let allAvailableCurrencies = await getFromIndexedDB(Stores.AvailableCurrencies, 'all');
        const diffInMinutes = diff(new Date(), allAvailableCurrencies?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getAllAvailableCurrencies();
                if (result) {
                    allAvailableCurrencies = {
                        [KEY_PATH]: 'all',
                        store: Stores.AvailableCurrencies,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.AvailableCurrencies, allAvailableCurrencies);
                }
            } catch (e) {
                console.log(e)
            }
        }

        return allAvailableCurrencies?.data as IApiAllAvailableCurrencies | undefined
    }
);

export const convertedCurrencyThunk = createAsyncThunk(
    'currencies/convertedCurrency',
    async (
        params: IConvertedCurrencyParams
    ): Promise<IStoreDataInIndexedDB<Stores.ConvertedCurrency>> => {
        const key = params.from + '_' + params.to + '_' + params.amount;
        let convertedCurrency = await getFromIndexedDB(Stores.ConvertedCurrency, key);
        const diffInMinutes = diff(new Date(), convertedCurrency?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getConvertedCurrency(params.from, params.to, params.amount);
                if (result) {
                    convertedCurrency = {
                        [KEY_PATH]: key,
                        store: Stores.ConvertedCurrency,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.ConvertedCurrency, convertedCurrency);
                }
            } catch (e) {
                console.log(e)
            }
        }

        return convertedCurrency as IStoreDataInIndexedDB<Stores.ConvertedCurrency>;
    }
);

export const currencyFluctuationsThunk = createAsyncThunk(
    'currencies/currencyFluctuations',
    async (
        params: ICurrencyFluctuationsParams
    ): Promise<IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined> => {
        const key = params.start_date + '_' + params.end_date + '_' + (params?.base || '') + '_' + (params?.symbols || '');
        let currencyFluctuations = await getFromIndexedDB(Stores.CurrencyFluctuations, key);
        const diffInMinutes = diff(new Date(), currencyFluctuations?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getCurrencyFluctuations(params.start_date, params.end_date, params?.base, params?.symbols);
                if (result) {
                    currencyFluctuations = {
                        [KEY_PATH]: key,
                        store: Stores.CurrencyFluctuations,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.CurrencyFluctuations, currencyFluctuations);
                }
            } catch (e) {
                console.log(e)
            }
        }

        return currencyFluctuations as IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined;
    }
);

export const latestExchangeRatesThunk = createAsyncThunk(
    'currencies/latestExchangeRates',
    async (
        params: ILatestExchangeRatesParams
    ): Promise<IStoreDataInIndexedDB<Stores.LatestExchangeRates> | undefined> => {
        const key = (params?.base || 'base') + '_' + (params?.symbols || 'symbols');
        let latestExchangeRates = await getFromIndexedDB(Stores.LatestExchangeRates, key);
        const diffInMinutes = diff(new Date(), latestExchangeRates?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getLatestExchangeRates(params?.base, params?.symbols);
                if (result) {
                    latestExchangeRates = {
                        [KEY_PATH]: key,
                        store: Stores.LatestExchangeRates,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.LatestExchangeRates, latestExchangeRates);
                }
            } catch (e) {
                console.log(e)
            }
        }

        return latestExchangeRates as IStoreDataInIndexedDB<Stores.LatestExchangeRates> | undefined;
    }
);


export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Available Currencies
            .addCase(availableCurrenciesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(availableCurrenciesThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.availableCurrencies = action.payload;
            })
            .addCase(availableCurrenciesThunk.rejected, (state) => {
                state.status = 'failed';
            })
            // Converted Currency
            .addCase(convertedCurrencyThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(convertedCurrencyThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.convertedCurrency = action.payload;
            })
            .addCase(convertedCurrencyThunk.rejected, (state) => {
                state.status = 'failed';
            })
            // Currency Fluctuations
            .addCase(currencyFluctuationsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(currencyFluctuationsThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currencyFluctuations = action.payload;
            })
            .addCase(currencyFluctuationsThunk.rejected, (state) => {
                state.status = 'failed';
            })
            // Latest Exchange Rates
            .addCase(latestExchangeRatesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(latestExchangeRatesThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.latestExchangeRates = action.payload;
            })
            .addCase(latestExchangeRatesThunk.rejected, (state) => {
                state.status = 'failed';
            })
    },
});


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;
export const selectConvertedCurrency = (state: RootState) => state.currencies.convertedCurrency;
export const selectCurrencyFluctuations = (state: RootState) => state.currencies.currencyFluctuations;
export const selectLatestExchangeRates = (state: RootState) => state.currencies.latestExchangeRates;

export default currenciesSlice.reducer;
