import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
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

// export const incrementAsync = createAsyncThunk(
//     'currencies/fetchCount',
//     async (amount: number) => {
//         const response = await fetchCount(amount);
//         return response.data;
//     }
// );

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        availableCurrencies: (state) => {
            state.value += 1;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             // state.value += action.payload;
    //         })
    // },
});

export const { availableCurrencies } = currenciesSlice.actions;

export const selectAvailableCurrencies = (state: RootState) => state.currencies.availableCurrencies;

export default currenciesSlice.reducer;
