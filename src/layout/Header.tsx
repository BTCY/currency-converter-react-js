import styles from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';

/*
*   Layout: application header 
*/

interface IHeader {
    children?: React.ReactNode;
}

const Header = ({ children }: IHeader) => {

    return (
        <Navbar expand="sm" className={styles.header}>
            {children}
        </Navbar>
    );

}

export default Header;