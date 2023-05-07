import styles from "./MainLayout.module.css";

/**
 *  Layout: main layer
 */

interface IMainLayout {
    children?: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout): JSX.Element => (
    <div className={styles.layout}>
        {children}
    </div>
);

export default MainLayout;
