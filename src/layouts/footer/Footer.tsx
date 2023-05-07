import { ReactElement } from "react";
import styles from "./Footer.module.css";

/**
 *  Layout: footer 
 */

interface IFooter {
    children?: React.ReactNode;
}


const Footer = ({ children }: IFooter): ReactElement => (

    <div className={styles.footer}>
        {children}
    </div>
);


export default Footer;