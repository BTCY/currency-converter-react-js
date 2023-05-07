import { ReactElement } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 *  Logotype
 */

const Logo = (): ReactElement => (
    <Navbar.Brand to="/" className={styles.logo} as={Link}>
        <span className={styles.bold}>Curr ::</span> dashboard
    </Navbar.Brand>
);


export default Logo;
