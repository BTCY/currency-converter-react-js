import {
    IApiAllAvailableCurrencies, IApiConvertedCurrency,
    IApiCurrencyFluctuations, IApiExchangeRateHistory, IApiLatestExchangeRates
} from "./exchange-rates-service.types";
import { KEY_PATH } from "./indexedDB-service";

/**
 * @file API Types: Indexed DB. 
 */


/** 
 * IndexedDb: available errors.
 * 
 * @enum IndexedDbError   
 */
export const enum IndexedDbError {

    /** Store with converted currency */
    Common = "common",
};


/**
 * Type: dynamic returned from currency API
 * 
 * {@link https://apsmgmtapi.docs.apiary.io/#reference/0/8/0 API: Aps Mgmtapi}  
 * 
 * @type IAuxiliaryReportResult   
 */
export type StoreData<T> =
    T extends Stores.ConvertedCurrency ? IApiConvertedCurrency :
    T extends Stores.CurrencyFluctuations ? IApiCurrencyFluctuations :
    T extends Stores.LatestExchangeRates ? IApiLatestExchangeRates :
    T extends Stores.AvailableCurrencies ? IApiAllAvailableCurrencies :
    T extends Stores.ExchangeRateHistory ? IApiExchangeRateHistory :
    unknown;


/** 
 * Stores: available stores in Indexed DB.
 * 
 * @enum Stores   
 */
export const enum Stores {

    /** Store with converted currency */
    ConvertedCurrency = "convertedCurrency",

    /** Store with currency fluctuations */
    CurrencyFluctuations = "currencyFluctuations",

    /** Store with currency latest exchange rates */
    LatestExchangeRates = "latestExchangeRates",

    /** Store with available currencies */
    AvailableCurrencies = "availableCurrencies",

    /** Store with exchange rate history */
    ExchangeRateHistory = "exchangeRateHistory",
};


/** 
 * Stores: data format for storing or getting from Indexed DB.
 * 
 * @interface IStoreDataInIndexedDB   
 */
export interface IStoreDataInIndexedDB<T extends Stores> {

    /** Key path */
    [KEY_PATH]: string,

    /** Store */
    store: Stores,

    /** Data update time (timestamp, ms) */
    update_timestamp: number,

    /** Data */
    data?: StoreData<T>

    /** Indicates that the data is cached in IndexedDB */
    isCachedInIndexedDB?:boolean
};
