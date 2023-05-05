/**
 * @file Get URLSearchParams function
 */


/**
 * Get URLSearchParams.  
 * 
 * @param   {Object}    params      Simple Object
 * @returns {string | undefined}    URLSearchParams result
 */
export const getSearchParams = (
    params: { [key: string]: any }
): URLSearchParams => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(p => {
        const [key, val] = p;
        searchParams.append(key, val);
    });

    return searchParams;
};

