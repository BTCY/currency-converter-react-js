import styles from './Layout.module.css';

/**
 *   Layout: main layer
 */

interface ILayout {
    children?: React.ReactNode;
}


const Layout = ({ children }: ILayout) => {

    return (
        <div className={`${styles.layout} bg-white d-flex flex-column justify-content-between`}>
            {children}
        </div>
    );
}

export default Layout;
