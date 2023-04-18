import React, { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const DelayedSpinner = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSpinner(true), 750);

        return () => clearTimeout(timer);
    });

    return (
        showSpinner
            ? <MagnifyingGlass
                visible={showSpinner}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#e15b64'
            />
            : <></>
    )
};

export default DelayedSpinner;