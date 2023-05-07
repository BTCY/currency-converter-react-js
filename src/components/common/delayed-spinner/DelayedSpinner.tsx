import { ReactElement, useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

/**
 *  Delayed spinner 
 */

interface IDelayedSpinner {

    /** Text under the spinner */
    text?: string;
}


const DelayedSpinner = ({
    text
}: IDelayedSpinner): ReactElement => {

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSpinner(true), 750);
        return () => clearTimeout(timer);
    });

    return (
        showSpinner
            ? <div className="row align-items-center justify-content-center">
                <MagnifyingGlass
                    visible={showSpinner}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
                {text && text}
            </div>
            : <></>
    )
};


export default DelayedSpinner;