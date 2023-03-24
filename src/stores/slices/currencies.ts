import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';
import { RootState, AppThunk } from '../store';
import { putInIndexedDB, getFromIndexedDB, KEY_PATH } from '../../api/indexedDB-service';
import { diff } from '../../utils/dateTimeHelper';
import { IStoreDataInIndexedDB, Stores } from '../../api/indexedDB-service.types';
import { IApiAllAvailableCurrencies } from '../../api/exchange-rates-service.types';


const ALLOW_DIFF_IN_MINUTES = 1440;

export interface ICurrenciesState {
    value: number;
    availableCurrencies: {} | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ICurrenciesState = {
    value: 0,
    availableCurrencies: undefined,
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
            .addCase(availableCurrenciesThunk.rejected, (state, action) => {
                state.status = 'failed';
                // state.value += action.payload;
            })
    },
});


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies as IApiAllAvailableCurrencies | undefined;

export default currenciesSlice.reducer;
