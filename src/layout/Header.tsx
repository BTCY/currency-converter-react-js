import styles from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';

/**
 *   Layout: application header 
 */

interface IHeader {
    children?: React.ReactNode;
}


const Header = ({ children }: IHeader) => {

    return (
        <Navbar expand="sm" className={styles.header}>
            <div className={styles.headerContent}>
                {children}
            </div>
        </Navbar>
    );

}

export default Header;