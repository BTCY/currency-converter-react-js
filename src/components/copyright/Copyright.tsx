import { Link } from 'react-router-dom';
import styles from './Copyright.module.css';

/*
*   Copyright
*/

const Copyright = () => {

    return (
        <>
            <span className={styles.text}>
                Demo project. Developed by
            </span>
            <Link
                to="https://github.com/BTCY"
                target={"_blank"}
                className={styles.link}
            >
                https://github.com/BTCY
            </Link>
        </>
    );

}

export default Copyright;
