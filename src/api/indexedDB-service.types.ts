import { KeyPaths } from "./indexedDB-service";

export interface IAvailableCurrenciesDataIndexedDB {
    [KeyPaths.CurrCode]: string,
    update_timestamp: number,
    data?: {},
};
