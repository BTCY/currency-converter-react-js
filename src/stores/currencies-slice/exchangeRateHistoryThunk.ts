import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExchangeRateHistoryParams } from "../../api/exchange-rates-service.types";
import { IStoreDataInIndexedDB, Stores } from "../../api/indexedDB-service.types";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { diff } from "../../utils/dateTimeHelper";
import { CACHING_RESULT_IN_MINUTES } from "./currenciesSlice";
import { getExchangeRateHistory } from "../../api/exchange-rates-service";

/**
 *  Get latest exchange rates from API or IndexedDB, and save in Store
 */

export const exchangeRateHistoryThunk = createAsyncThunk(
    'currencies/exchangeRateHistory',
    async (
        params: IExchangeRateHistoryParams
    ): Promise<IStoreDataInIndexedDB<Stores.ExchangeRateHistory> | undefined> => {
        const key = params.start_date + '_' + params.end_date + '_' + (params?.base || '') + '_' + (params?.symbols || '');
        let exchangeRateHistory = await getFromIndexedDB(Stores.ExchangeRateHistory, key);
        const diffInMinutes = diff(new Date(), exchangeRateHistory?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > CACHING_RESULT_IN_MINUTES) {
            try {
                const result = await getExchangeRateHistory(params.start_date, params.end_date, params?.base, params?.symbols);
                if (result) {
                    exchangeRateHistory = {
                        [KEY_PATH]: key,
                        store: Stores.ExchangeRateHistory,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.ExchangeRateHistory, exchangeRateHistory);
                }
            } catch (e) {
                console.log(e)
            }
        }

        return exchangeRateHistory as IStoreDataInIndexedDB<Stores.ExchangeRateHistory> | undefined;
    }
);
