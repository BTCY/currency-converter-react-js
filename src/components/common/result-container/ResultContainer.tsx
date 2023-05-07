import { ReactElement, ReactNode } from "react";

/**
 *  Container for displaying results
 */

interface IResultContainer {

    /** Content */
    children?: ReactNode;
}


const ResultContainer = ({
    children = undefined,
}: IResultContainer): ReactElement => (

    <div className="d-grid gap-3">
        {children && children}
    </div>
);


export default ResultContainer;