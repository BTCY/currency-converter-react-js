import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeaderMenu.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

/**
 *  Header menu
 */

const HeaderMenu = (): ReactElement => (
    <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleButton} />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink} className={styles.link}>Home</Nav.Link>
                <Nav.Link to="/about" as={NavLink} className={styles.link}>About</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </>
);


export default HeaderMenu;
