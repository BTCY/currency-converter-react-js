import styles from './Footer.module.css';

/**
 *   Layout: application footer 
 */

interface IFooter {
    children?: React.ReactNode;
}


const Footer = ({ children }: IFooter) => {

    return (
        <div className={styles.footer}>
            {children}
        </div>
    );

}

export default Footer;