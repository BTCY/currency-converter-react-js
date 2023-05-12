/**
 * @file Get URLSearchParams function
 */


/**
 * Get URLSearchParams.  
 * 
 * @param   {Object}    params      Flat object
 * @returns {URLSearchParams}       URLSearchParams result
 */
export const getSearchParams = (
    params: { [key: string]: any }
): URLSearchParams => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(p => {
        const [key, val] = p;
        val && searchParams.append(key, val.toString());
    });

    return searchParams;
};

