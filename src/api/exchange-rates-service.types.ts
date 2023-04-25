/**
 * @file API Types: exchange rates.
 * 
 * {@link https://apilayer.com/marketplace/exchangerates_data-api API}
 */


export interface IConvertedCurrencyParams {
    from: string,
    to: string,
    amount: number,
    date?: string,
}

export interface ICurrencyFluctuationsParams {
    start_date: string,
    end_date: string,
    base?: string,
    symbols?: string
}

export interface ILatestExchangeRatesParams {
    base?: string,
    symbols?: string
}

export interface IExchangeRateHistoryParams {
    start_date: string,
    end_date: string,
    base?: string,
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

