import moment from "moment";

/**
 * @file Functions for working with time and date.
 */


/**
 * Date and time formatting.
 * 
 * {@link https://momentjs.com/docs/#/displaying/ Allowed formats}  
 * 
 * @param   {number | string | Date | undefined}    date    Date and time
 * @param   {string}    format      Template
 * @returns {string | undefined}    Formatting result
 */
export const format = (
    date: number | string | Date | undefined,
    format: string
): string | undefined => {

    if (!(typeof date === 'number' || typeof date === 'string' || date instanceof Date))
        return undefined;

    const dateMoment = moment(date, true);

    if (!dateMoment.isValid())
        return undefined;

    return dateMoment.format(format);
};


/**
 * Calculates the difference, in specified units, between two dates.
 * 
 * {@link https://momentjs.com/docs/#/durations/diffing/ Doc}  
 * 
 * @param   {number | string | Date | undefined}    firstDate     First date for comparison
 * @param   {number | string | Date | undefined}    secondDate    Second date for comparison
 * @param   {moment.unitOfTime.Diff}                [units]       What are the units to measure (default: minutes)
 * @returns {string | undefined}    Difference in numerical form in the specified units of measurement
 */
export const diff = (
    firstDate: number | string | Date | undefined,
    secondDate: number | string | Date | undefined,
    units: moment.unitOfTime.Diff = 'minutes'
): number | undefined => {

    // First date  
    if (!(typeof firstDate === 'number' || typeof firstDate === 'string' || firstDate instanceof Date))
        return undefined;

    const firstDateMoment = moment(firstDate, true);

    if (!firstDateMoment.isValid())
        return undefined;

    // Second date  
    if (!(typeof secondDate === 'number' || typeof secondDate === 'string' || secondDate instanceof Date))
        return undefined;

    const secondDateMoment = moment(secondDate, true);

    if (!secondDateMoment.isValid())
        return undefined;

    // Comparison 
    return firstDateMoment.diff(secondDateMoment, units);
}; 
