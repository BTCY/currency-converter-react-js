/**
*   Converted currency
*/
export interface IApiConvertedCurrency {
    date: string,
    historical: string,
    info: {
        rate: number,
        timestamp: number
    },
    query: {
        amount: number,
        from: string,
        to: string
    },
    result: number,
    success: boolean
}


/**
*   Currency fluctuations 
*/
export interface IApiCurrencyFluctuations {
    base: string,
    end_date: string,
    fluctuation: boolean,
    rates: {
        [key: string]: string | IApiCurrencyFluctuationsRates
    },
    start_date: string,
    success: boolean
}

interface IApiCurrencyFluctuationsRates {
    change: number,
    change_pct: number,
    end_rate: number,
    start_rate: number
}


/**
*   Real-time exchange rate
*/
export interface IApiLatestExchangeRates {
    base: string,
    date: string,
    rates: {
        [key: string]: number
    },
    success: boolean,
    timestamp: number
}


/**
*   All available currencies
*/
export interface IApiAllAvailableCurrencies {
    success: boolean,
    symbols: {
        [key: string]: string
    }
}


/**
*   Exchange rate history
*/
export interface IApiExchangeRateHistory {
    base: string,
    end_date: string,
    rates: {
        [key: string]: string | IApiExchangeRateHistoryData
    },
    start_date: string,
    success: boolean,
    timeseries: boolean
}

interface IApiExchangeRateHistoryData {
    [key: string]: string
}


/**
*   Exchange rate history by date
*/
export interface IApiExchangeRateHistoryByDate {
    base: string,
    date: string,
    historical: boolean,
    rates: {
        [key: string]: string | IApiExchangeRateHistoryByDateData
    },
    success: boolean,
    timestamp: number
}

interface IApiExchangeRateHistoryByDateData {
    [key: string]: number
}

