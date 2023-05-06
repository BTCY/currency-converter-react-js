import styles from './Layout.module.css';

/**
 *  Layout: main layer
 */

interface ILayout {
    children?: React.ReactNode;
}


const Layout = ({ children }: ILayout): JSX.Element => {

    return (
        <div className={styles.layout}>
            {children}
        </div>
    );
}

export default Layout;
