import axios from 'axios';
import { getServerError } from './error-service';
import {
    IApiConvertedCurrency, IApiCurrencyFluctuations,
    IApiLatestExchangeRates, IApiAllAvailableCurrencies,
    IApiExchangeRateHistory, IApiExchangeRateHistoryByDate
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
    axios.get(
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
    axios.get(
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
    axios.get(
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
export const getAllAvailableCurrencies = (): Promise<IApiAllAvailableCurrencies[]> =>
    axios.get(
        'https://api.apilayer.com/exchangerates_data/symbols', {
        headers
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });


/**
 * Timeseries endpoint lets you query the API for daily historical rates between two dates of your choice, with a maximum time frame of 365 days.
 * 
 * @param   {string}   start_date        The start date of your preferred timeframe.
 * @param   {string}   end_date          The end date of your preferred timeframe.
 * @param   {string}   [base]            Enter the three-letter currency code of your preferred base currency.
 * @param   {string}   [symbols]         Enter a list of comma-separated currency codes to limit output currencies.
 * @return  {IApiExchangeRateHistory}    Exchange rate history
 */
export const getExchangeRateHistory = (
    start_date: string,
    end_date: string,
    base: string | undefined = undefined,
    symbols: string | undefined = undefined
): Promise<IApiExchangeRateHistory> =>
    axios.get(
        'https://api.apilayer.com/exchangerates_data/timeseries', {
        headers,
        params: { start_date, end_date, base, symbols }
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });


/**
 * Historical rates are available for most currencies all the way back to the year of 1999. 
 * You can query the Fixer API for historical rates by appending a date (format YYYY-MM-DD) to the base URL.
 * 
 * @param   {string}   date                   A date in the past for which historical rates are requested.
 * @param   {string}   [base]                 Enter the three-letter currency code of your preferred base currency.
 * @param   {string}   [symbols]              Enter a list of comma-separated currency codes to limit output currencies.
 * @return  {IApiExchangeRateHistoryByDate}   Exchange rate history by date
 */
export const getExchangeRateHistoryByDate = (
    date: string,
    base: string | undefined = undefined,
    symbols: string | undefined = undefined
): Promise<IApiExchangeRateHistoryByDate> =>
    axios.get(
        `https://api.apilayer.com/exchangerates_data/${date}`, {
        headers,
        params: { base, symbols }
    })
        .then(res => res.data)
        .catch(e => {
            throw getServerError(e);
        });