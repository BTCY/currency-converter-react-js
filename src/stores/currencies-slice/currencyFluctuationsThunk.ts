import { createAsyncThunk } from "@reduxjs/toolkit";
import { KEY_PATH, getFromIndexedDB, putInIndexedDB } from "../../api/indexedDB-service";
import { IStoreDataInIndexedDB, Stores } from "../../api/indexedDB-service.types";
import { ICurrencyFluctuationsParams } from "../../api/exchange-rates-service.types";
import { diff } from "../../utils/dateTimeHelper";
import { CACHING_RESULT_IN_MINUTES } from "./currenciesSlice";
import { getCurrencyFluctuations } from "../../api/exchange-rates-service";

/**
 *  Get currency fluctuations from API or IndexedDB, and save in Store
 */

export const currencyFluctuationsThunk = createAsyncThunk(
    "currencies/currencyFluctuations",
    async (
        params: ICurrencyFluctuationsParams
    ): Promise<IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined> => {

        const key = params.start_date + "_" + params.end_date + "_" + (params?.base || "") + "_" + (params?.symbols || "");

        let currencyFluctuations = await getFromIndexedDB(Stores.CurrencyFluctuations, key).catch(e => { return e });

        const diffInMinutes = diff(new Date(), currencyFluctuations?.update_timestamp);

        if (diffInMinutes === undefined || diffInMinutes > CACHING_RESULT_IN_MINUTES) {
            try {
                const result = await getCurrencyFluctuations(params.start_date, params.end_date, params?.base, params?.symbols);
                if (result) {
                    currencyFluctuations = {
                        [KEY_PATH]: key,
                        store: Stores.CurrencyFluctuations,
                        update_timestamp: Number(new Date()),
                        data: result
                    };

                    await putInIndexedDB(Stores.CurrencyFluctuations, currencyFluctuations).catch(e => { return e });
                }
            } catch (e) {
                throw e;
            }
        }

        return currencyFluctuations as IStoreDataInIndexedDB<Stores.CurrencyFluctuations> | undefined;
    }
);
