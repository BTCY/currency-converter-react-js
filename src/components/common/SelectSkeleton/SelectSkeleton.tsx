import { ReactElement } from 'react';
import { Placeholder } from 'react-bootstrap';
import styles from './SelectSkeleton.module.css';

/**
 *   SelectSkeleton
 */

interface ISelectSkeleton {
    isShow: boolean;
}

const SelectSkeleton = ({
    isShow
}: ISelectSkeleton): ReactElement<any, any> => {

    return (
        isShow ?
            <Placeholder
                xs={12}
                as="div"
                animation="glow"
            >
                <Placeholder xs={12} className={styles.selectSkeleton} />
            </Placeholder>
            : <></>
    );
}

export default SelectSkeleton;