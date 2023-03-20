import {
    IApiAllAvailableCurrencies, IApiConvertedCurrency,
    IApiCurrencyFluctuations, IApiExchangeRateHistory,
    IApiExchangeRateHistoryByDate, IApiLatestExchangeRates
} from "./exchange-rates-service.types";
import { KeyPaths } from "./indexedDB-service";

/**
 * @file API Types: Indexed DB. 
 */


/** 
 * Stores: data format for storing or getting from Indexed DB.
 * 
 * @interface IStoreDataInIndexedDB   
 */
export interface IStoreDataInIndexedDB {

    /** Key: currency code */
    [KeyPaths.CurrCode]: string,

    /** Data update time (timestamp, ms) */
    update_timestamp: number,

    /** Data */
    data?:
    /** Converted currency */
    IApiConvertedCurrency

    /** Currency fluctuations */
    | IApiCurrencyFluctuations

    /** Real-time exchange rate */
    | IApiLatestExchangeRates

    /** All available currencies */
    | IApiAllAvailableCurrencies

    /** Exchange rate history */
    | IApiExchangeRateHistory

    /** Exchange rate history by date */
    | IApiExchangeRateHistoryByDate
};
