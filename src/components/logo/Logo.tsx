import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 *  Logotype
 */

const Logo = (): ReactElement => (
    <Link to="/" className={styles.logo}>
        <span className={styles.bold}>Curr ::</span> dashboard
    </Link>
);


export default Logo;
