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