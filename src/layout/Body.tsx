import styles from './Body.module.css';

/**
 *   Layout: application body
 */

interface IBody {
    children?: React.ReactNode;
}


const Body = ({ children }: IBody) => {

    return (
        <div className={styles.body}>
            {children}
        </div>

    );

}

export default Body;
