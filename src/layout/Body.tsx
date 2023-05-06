import styles from './Body.module.css';

/**
 *   Layout: application body
 */

interface IBody {
    children?: React.ReactNode;
}


const Body = ({ children }: IBody) => {

    return (
        <div className={`${styles.body} row`}>
            <div className={`${styles.bodyIn} p-0`}>
                {children}
            </div>
        </div>

    );

}

export default Body;
