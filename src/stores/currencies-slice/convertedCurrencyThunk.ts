import { createAsyncThunk } from "@reduxjs/toolkit";
import { IConvertedCurrencyParams } from "../../api/exchange-rates-service.types";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { IStoreDataInIndexedDB, Stores } from "../../api/indexedDB-service.types";
import { diff } from "../../utils/dateTimeHelper";
import { CACHING_RESULT_IN_MINUTES } from "./currenciesSlice";
import { getConvertedCurrency } from "../../api/exchange-rates-service";

/**
 *  Get converted currency from API or IndexedDB, and save in Store
 */

export const convertedCurrencyThunk = createAsyncThunk(
    'currencies/convertedCurrency',
    async (
        params: IConvertedCurrencyParams
    ): Promise<IStoreDataInIndexedDB<Stores.ConvertedCurrency>> => {
        const key = params.from + '_' + params.to + '_' + params.amount;
        let convertedCurrency = await getFromIndexedDB(Stores.ConvertedCurrency, key);
        const diffInMinutes = diff(new Date(), convertedCurrency?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > CACHING_RESULT_IN_MINUTES) {
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
