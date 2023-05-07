import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILatestExchangeRatesParams } from "../../api/exchange-rates-service.types";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { IStoreDataInIndexedDB, Stores } from "../../api/indexedDB-service.types";
import { diff } from "../../utils/dateTimeHelper";
import { CACHING_RESULT_IN_MINUTES } from "./currenciesSlice";
import { getLatestExchangeRates } from "../../api/exchange-rates-service";

/**
 *  Get latest exchange rates from API or IndexedDB, and save in Store
 */

export const latestExchangeRatesThunk = createAsyncThunk(
    "currencies/latestExchangeRates",
    async (
        params: ILatestExchangeRatesParams
    ): Promise<IStoreDataInIndexedDB<Stores.LatestExchangeRates> | undefined> => {
        const key = (params?.base || "base") + "_" + (params?.symbols || "symbols");
        let latestExchangeRates = await getFromIndexedDB(Stores.LatestExchangeRates, key);
        const diffInMinutes = diff(new Date(), latestExchangeRates?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > CACHING_RESULT_IN_MINUTES) {
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
