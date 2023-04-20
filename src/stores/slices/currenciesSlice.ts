import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAvailableCurrencies, getConvertedCurrency, getCurrencyFluctuations } from '../../api/exchange-rates-service';
import { RootState } from '../store';
import { putInIndexedDB, getFromIndexedDB, KEY_PATH } from '../../api/indexedDB-service';
import { diff } from '../../utils/dateTimeHelper';
import { Stores } from '../../api/indexedDB-service.types';
import { IApiAllAvailableCurrencies, IApiConvertedCurrency, IApiCurrencyFluctuations } from '../../api/exchange-rates-service.types';
import { IConvertedCurrencyThunk, ICurrencyFluctuationsThunk } from './currenciesSlice.types';


const ALLOW_DIFF_IN_MINUTES = 1440;

export interface ICurrenciesState {
    value: number;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
    convertedCurrency: IApiConvertedCurrency | undefined;
    currencyFluctuations: IApiCurrencyFluctuations | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ICurrenciesState = {
    value: 0,
    availableCurrencies: undefined,
    convertedCurrency: undefined,
    currencyFluctuations: undefined,
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
        param: IConvertedCurrencyThunk
    ): Promise<IApiConvertedCurrency | undefined> => {
        const key = param.from + '_' + param.to + '_' + param.amount;
        let convertedCurrency = await getFromIndexedDB(Stores.ConvertedCurrency, key);
        const diffInMinutes = diff(new Date(), convertedCurrency?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getConvertedCurrency(param.from, param.to, param.amount, param.date);
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

        return convertedCurrency?.data as IApiConvertedCurrency | undefined;
    }
);

export const currencyFluctuationsThunk = createAsyncThunk(
    'currencies/currencyFluctuations',
    async (
        param: ICurrencyFluctuationsThunk
    ): Promise<IApiCurrencyFluctuations | undefined> => {
        const key = param.start_date + '_' + param.end_date + '_' + (param?.base || '') + '_' + (param?.symbols || '');
        let currencyFluctuations = await getFromIndexedDB(Stores.CurrencyFluctuations, key);
        const diffInMinutes = diff(new Date(), currencyFluctuations?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > ALLOW_DIFF_IN_MINUTES) {
            try {
                const result = await getCurrencyFluctuations(param.start_date, param.end_date, param?.base, param?.symbols);
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

        return currencyFluctuations?.data as IApiCurrencyFluctuations | undefined;
    }
);


export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    },
});


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;
export const selectConvertedCurrency = (state: RootState) => state.currencies.convertedCurrency;
export const selectCurrencyFluctuations = (state: RootState) => state.currencies.currencyFluctuations;

export default currenciesSlice.reducer;
