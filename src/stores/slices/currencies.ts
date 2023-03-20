import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';
import { RootState, AppThunk } from '../store';
import { putInIndexedDB, getFromIndexedDB, Stores, KeyPaths } from '../../api/indexedDB-service';
// import { fetchCount } from './counterAPI';

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
    async () => {

        // let res = await getAllAvailableCurrencies()
        // putInIndexedDB(
        //     Stores.AvailableCurrencies,
        //     {
        //         [KeyPaths.CurrCode]: 'EUR',
        //         update_timestamp: Number(new Date()),
        //         data: undefined
        //     }
        // );
        // console.log(await getFromIndexedDB(
        //     Stores.AvailableCurrencies,
        //     'EUR',
        // ))
        return 'res'
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


export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;

export default currenciesSlice.reducer;
