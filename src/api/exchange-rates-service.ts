import axios from 'axios';
import { getServerError } from './error-service';
import {
    IApiConvertedCurrency, IApiCurrencyFluctuations,
    IApiLatestExchangeRates, IApiAllAvailableCurrencies
} from './exchange-rates-service.types';

/**
 * @file API: exchange-rates.
 * 
 * {@link https://apilayer.com/marketplace/exchangerates_data-api API}  
 */


const apikey = 'q11PIF3wrH0X1U9blJ2uYK8lr3mu9DwX';
const headers = {
    'apikey': apikey
}


/**
 * Get the converted currency.
 * 
 * @param   {string}   from            The three-letter currency code of the currency you would like to convert from.
 * @param   {string}   to              The three-letter currency code of the currency you would like to convert to.
 * @param   {string}   amount          The amount to be converted.
 * @param   {string}   [date]          Specify a date (format YYYY-MM-DD) to use historical rates for this conversion.
 * @return  {IApiConvertedCurrency}    Converted currency
 */
export const getConvertedCurrency = (
    from: string,
    to: string,
    amount: number,
    date: string | undefined = undefined
): Promise<IApiConvertedCurrency> =>
    axios.get<IApiConvertedCurrency>(
        'https://api.apilayer.com/exchangerates_data/convert', {
        headers,
        params: { from, to, amount, date }
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });


/**
 * Get currency fluctuations.
 * 
 * @param   {string}   start_date        The start date of your preferred timeframe.
 * @param   {string}   end_date          The end date of your preferred timeframe.
 * @param   {string}   [base]            Enter the three-letter currency code of your preferred base currency.
 * @param   {string}   [symbols]         Enter a list of comma-separated currency codes to limit output currencies.
 * @return  {IApiCurrencyFluctuations}   Currency fluctuations
 */
export const getCurrencyFluctuations = (
    start_date: string,
    end_date: string,
    base: string | undefined = undefined,
    symbols: string | undefined = undefined
): Promise<IApiCurrencyFluctuations> =>
    axios.get<IApiCurrencyFluctuations>(
        'https://api.apilayer.com/exchangerates_data/fluctuation', {
        headers,
        params: { start_date, end_date, base, symbols }
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });


/**
 * Returns real-time exchange rate data updated every 60 minutes, every 10 minutes or every 60 seconds. 
 * 
 * @param   {string}   [base]            Enter the three-letter currency code of your preferred base currency.
 * @param   {string}   [symbols]         Enter a list of comma-separated currency codes to limit output currencies.
 * @return  {IApiLatestExchangeRates}    Real-time exchange rate
 */
export const getLatestExchangeRates = (
    base: string | undefined = undefined,
    symbols: string | undefined = undefined
): Promise<IApiLatestExchangeRates> =>
    axios.get<IApiLatestExchangeRates>(
        'https://api.apilayer.com/exchangerates_data/latest', {
        headers,
        params: { base, symbols }
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });


/**
 * Returning all available currencies. 
 * 
 * @return  {IApiAllAvailableCurrencies}    All available currencies
 */
export const getAllAvailableCurrencies = (): Promise<IApiAllAvailableCurrencies> =>
    axios.get<IApiAllAvailableCurrencies>(
        'https://api.apilayer.com/exchangerates_data/symbols', {
        headers
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });
