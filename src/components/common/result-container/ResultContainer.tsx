import { ReactNode, ReactElement } from 'react'; 

/**
 *   TabTemplate
 */

interface IResultContainer {
    children?: ReactNode;
}

const ResultContainer = ({
    children = undefined,
}: IResultContainer): ReactElement<any, any> => {

    return (
        <div className='d-grid gap-3'> 
            {children && children}
        </div>
    );
}

export default ResultContainer;