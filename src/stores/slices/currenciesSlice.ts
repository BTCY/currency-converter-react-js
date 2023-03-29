import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAvailableCurrencies, getConvertedCurrency } from '../../api/exchange-rates-service';
import { RootState } from '../store';
import { putInIndexedDB, getFromIndexedDB, KEY_PATH } from '../../api/indexedDB-service';
import { diff } from '../../utils/dateTimeHelper';
import { Stores } from '../../api/indexedDB-service.types';
import { IApiAllAvailableCurrencies, IApiConvertedCurrency } from '../../api/exchange-rates-service.types';
import { IConvertedCurrencyThunk } from './currenciesSlice.types';


const ALLOW_DIFF_IN_MINUTES = 1440;

export interface ICurrenciesState {
    value: number;
    availableCurrencies: IApiAllAvailableCurrencies | undefined;
    convertedCurrency: IApiConvertedCurrency | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ICurrenciesState = {
    value: 0,
    availableCurrencies: undefined,
    convertedCurrency: undefined,
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
    },
});


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;
export const selectConvertedCurrency = (state: RootState) => state.currencies.convertedCurrency;

export default currenciesSlice.reducer;
