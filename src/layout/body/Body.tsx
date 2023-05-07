import styles from "./Body.module.css";

/**
 *  Layout: body
 */

interface IBody {
    children?: React.ReactNode;
}

const Body = ({ children }: IBody): JSX.Element => (
    <div className={styles.body}>
        <div className={styles.bodyIn}>
            {children}
        </div>
    </div>
);

export default Body;
