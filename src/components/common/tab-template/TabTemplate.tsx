import { ReactNode, ReactElement } from 'react';
import styles from './TabTemplate.module.css';

/**
 *   TabTemplate
 */

interface ITabTemplate {
    title?: string;
    children?: ReactNode;

}

const TabTemplate = ({
    title = undefined,
    children = undefined,
}: ITabTemplate): ReactElement<any, any> => {

    return (
        <div className={styles.tabTemplateWrap}>
            {title && <h2 className={styles.h2}>{title}</h2>}
            {children && children}
        </div>
    );
}

export default TabTemplate;