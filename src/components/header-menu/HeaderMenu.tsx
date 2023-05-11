import { ReactElement } from "react";
import { NavLink, useParams } from "react-router-dom";
import { RoutesData } from "../../routes/routes";
import styles from "./HeaderMenu.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

/**
 *  Header menu
 */

const HeaderMenu = (): ReactElement => {
    const { tabId } = useParams();
    return (
        <>
            <Navbar.Toggle aria-controls="header-navbar-nav" className={styles.toggleButton} />
            <Navbar.Collapse id="header-navbar-nav">
                <Nav className={styles.linkWrap}>
                    <Nav.Link to="/" as={NavLink} className={styles.link} active={!!tabId}>Home</Nav.Link>
                    <Nav.Link to={RoutesData.about.path} as={NavLink} className={styles.link}>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </>
    );
}


export default HeaderMenu;
