import { ReactElement } from "react";
import styles from "./MainLayout.module.css";

/**
 *  Layout: main layer
 */

interface IMainLayout {
    children?: React.ReactNode;
}


const MainLayout = ({ children }: IMainLayout): ReactElement => (

    <div className={styles.layout}>
        {children}
    </div>
);


export default MainLayout;
