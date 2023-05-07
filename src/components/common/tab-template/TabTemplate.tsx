import { ReactNode, ReactElement } from "react";
import styles from "./TabTemplate.module.css";

/**
 *  Template for tab
 */

interface ITabTemplate {

    /** Tab title */
    title?: string;

    /** Tab content */
    children?: ReactNode;
}


const TabTemplate = ({
    title = undefined,
    children = undefined,
}: ITabTemplate): ReactElement => (

    <div className={styles.tabTemplateWrap}>
        {title && <h2 className={styles.h2}>{title}</h2>}
        {children && children}
    </div>
);


export default TabTemplate;