import { createAsyncThunk } from "@reduxjs/toolkit";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { AVAILABLE_CURR_CACHING_IN_MINUTES } from "./currenciesSlice";
import { getAllAvailableCurrencies } from "../../api/exchange-rates-service";
import { IStoreDataInIndexedDB, Stores } from "../../api/indexedDB-service.types";
import { diff } from "../../utils/dateTimeHelper";

/**
 *  Get available currencies from API or IndexedDB, and save in Store
 */

export const availableCurrenciesThunk = createAsyncThunk(
    "currencies/availableCurrencies",
    async (): Promise<IStoreDataInIndexedDB<Stores.AvailableCurrencies>> => {

        let isCachedInIndexedDB: boolean = true;

        let allAvailableCurrencies = await getFromIndexedDB(Stores.AvailableCurrencies, "all")
            .catch(e => {
                isCachedInIndexedDB = false;
                return e;
            });

        const diffInMinutes = diff(new Date(), allAvailableCurrencies?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > AVAILABLE_CURR_CACHING_IN_MINUTES) {
            try {
                const result = await getAllAvailableCurrencies();
                if (result) {
                    allAvailableCurrencies = {
                        [KEY_PATH]: "all",
                        store: Stores.AvailableCurrencies,
                        update_timestamp: Number(new Date()),
                        data: result,
                        isCachedInIndexedDB: isCachedInIndexedDB
                    };

                    await putInIndexedDB(Stores.AvailableCurrencies, allAvailableCurrencies).catch(e => { return e });
                }
            } catch (e) {
                throw e;
            }
        }

        return allAvailableCurrencies as IStoreDataInIndexedDB<Stores.AvailableCurrencies>
    }
);
