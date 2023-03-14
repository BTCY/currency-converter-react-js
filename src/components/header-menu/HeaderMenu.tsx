import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './HeaderMenu.module.css';
import { NavLink } from 'react-router-dom';

/*
*   Header menu
*/

const HeaderMenu = () => {

    return (
        <Container className={styles.headerMenu}>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink} className={styles.link}>Home</Nav.Link>
                    <Nav.Link to="/about" as={NavLink} className={styles.link}>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    );

}

export default HeaderMenu;
