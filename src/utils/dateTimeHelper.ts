import moment from "moment";

/**
 * @file Functions for working with time and date.
 */


/**
 * Date and time formatting.
 * 
 * {@link https://momentjs.com/docs/#/parsing/string-format/ Allowed formats}  
 * 
 * @param   {number | string | undefined | Date}    date    Date and time
 * @param   {string}    format      Template
 * @returns {string | undefined}    Formatting result
 */
export const format = (
    date: number | string | undefined | Date,
    format: string
): string | undefined => {

    if (!(typeof date === 'number' || typeof date === 'string' || date instanceof Date))
        return undefined;

    if (!moment(date, true).isValid())
        return undefined;

    return moment(date).format(format);
}; 
