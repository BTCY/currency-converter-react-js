import { ReactNode, ReactElement } from 'react';

/**
 *   Widget
 */

interface IWidget {
    title?: string;
    children?: ReactNode;

}

const Widget = ({
    title = undefined,
    children = undefined,
}: IWidget): ReactElement<any, any> => {

    return (
        <>
            {title && title}
            {children && children}
        </>
    );
}

export default Widget;