/**
 * @file API Types: exchange rates.
 * 
 * {@link https://apilayer.com/marketplace/exchangerates_data-api API}
 */


/**
 * Input params for Converted currency API.
 * 
 * @interface IConvertedCurrencyParams 
 */
export interface IConvertedCurrencyParams {

    /** The three-letter currency code of the currency you would like to convert from. */
    from: string;

    /** The three-letter currency code of the currency you would like to convert to. */
    to: string;

    /** The amount to be converted. */
    amount: number;

    /** Specify a date (format YYYY-MM-DD) to use historical rates for this conversion. */
    date?: string;
}


/**
 * Input params for Currency fluctuations API.
 * 
 * @interface ICurrencyFluctuationsParams 
 */
export interface ICurrencyFluctuationsParams {

    /** The start date of your preferred timeframe. */
    start_date: string;

    /** The end date of your preferred timeframe. */
    end_date: string;

    /** Enter the three-letter currency code of your preferred base currency. */
    base?: string;

    /** Enter a list of comma-separated currency codes to limit output currencies. */
    symbols?: string;
}


/**
 * Input params for Real-time exchange rate API.
 * 
 * @interface ILatestExchangeRatesParams 
 */
export interface ILatestExchangeRatesParams {

    /** Enter the three-letter currency code of your preferred base currency. */
    base?: string;

    /** Enter a list of comma-separated currency codes to limit output currencies. */
    symbols?: string
}


/**
 * Input params for Exchange rate history API.
 * 
 * @interface IExchangeRateHistoryParams 
 */
export interface IExchangeRateHistoryParams {

    /** The start date of your preferred timeframe. */
    start_date: string;

    /** The end date of your preferred timeframe. */
    end_date: string;

    /** Enter the three-letter currency code of your preferred base currency. */
    base?: string;

    /** Enter a list of comma-separated currency codes to limit output currencies. */
    symbols?: string
}


/**
 * Converted currency.
 * 
 * @interface IApiConvertedCurrency 
 */
export interface IApiConvertedCurrency {

    /** Date */
    date: string,

    /** Sign that the date is not relevant (taken from history) */
    historical: string,

    /** Conversion Information */
    info: {
        /** Currency ratio */
        rate: number,

        /** Date and time of update */
        timestamp: number
    },

    /** Request Information */
    query: {
        /** Number of currency units to convert */
        amount: number,

        /** What currency was converted from */
        from: string,

        /** What currency to convert into */
        to: string
    },

    /** Conversion result */
    result: number,

    /** Conversion status */
    success: boolean
}


/**
 * Currency fluctuations. 
 * 
 * @interface IApiCurrencyFluctuations 
 */
export interface IApiCurrencyFluctuations {

    /** Base currency */
    base: string,

    /** End of period */
    end_date: string,

    /** Fluctuation sign */
    fluctuation: boolean,

    /** Rates fluctuations */
    rates: {
        [key: string]: IApiCurrencyFluctuationsRates
    },

    /** Start of period */
    start_date: string,

    /** Currency fluctuations status */
    success: boolean
}


export interface IApiCurrencyFluctuationsRates {

    /** How much rate has changed */
    change: number,

    /** How much rate has changed (in percent) */
    change_pct: number,

    /** End rate */
    end_rate: number,

    /** Start rate */
    start_rate: number
}


/**
 * Real-time exchange rate.
 * 
 * @interface IApiLatestExchangeRates 
 */
export interface IApiLatestExchangeRates {

    /** Base currency */
    base: string,

    /** Date */
    date: string,

    /** Rates exchange */
    rates: {
        /** Currency: value */
        [key: string]: number
    },

    /** Exchange rate status */
    success: boolean,

    /** Date and time of update */
    timestamp: number
}


/**
 * All available currencies.
 * 
 * @interface IApiAllAvailableCurrencies 
 */
export interface IApiAllAvailableCurrencies {

    /** All available currencies status */
    success: boolean,

    /** All available currencies */
    symbols: {
        /** Currency code: full currency name */
        [key: string]: string
    }
}


/**
 * Exchange rate history.
 * 
 * @interface IApiExchangeRateHistory 
 */
export interface IApiExchangeRateHistory {

    /** Base currency */
    base: string,

    /** End of period */
    end_date: string,

    /** Exchange rate */
    rates: {

        /** Date */
        [key: string]: {

            /** Currency: value */
            [key: string]: number
        }
    },

    /** Start of period */
    start_date: string,

    /** Exchange rate history status */
    success: boolean,

    /** Date and time of update */
    timeseries: boolean
}