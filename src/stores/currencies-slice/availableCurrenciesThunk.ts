import { createAsyncThunk } from "@reduxjs/toolkit";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { IApiAllAvailableCurrencies } from "../../api/exchange-rates-service.types";
import { AVAILABLE_CURR_CACHING_IN_MINUTES } from "./currenciesSlice";
import { getAllAvailableCurrencies } from "../../api/exchange-rates-service";
import { Stores } from "../../api/indexedDB-service.types";
import { diff } from "../../utils/dateTimeHelper";

/**
 *  Get available currencies from API or IndexedDB, and save in Store
 */

export const availableCurrenciesThunk = createAsyncThunk(
    "currencies/availableCurrencies",
    async (): Promise<IApiAllAvailableCurrencies | undefined> => {
        let allAvailableCurrencies = await getFromIndexedDB(Stores.AvailableCurrencies, "all");
        const diffInMinutes = diff(new Date(), allAvailableCurrencies?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > AVAILABLE_CURR_CACHING_IN_MINUTES) {
            try {
                const result = await getAllAvailableCurrencies();
                if (result) {
                    allAvailableCurrencies = {
                        [KEY_PATH]: "all",
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
