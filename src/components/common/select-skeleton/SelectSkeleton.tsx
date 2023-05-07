import { ReactElement } from "react";
import { Placeholder } from "react-bootstrap";
import styles from "./SelectSkeleton.module.css";

/**
 *  Skeleton for select 
 */

interface ISelectSkeleton {

    /** Show skeleton */
    isShow: boolean;
}


const SelectSkeleton = ({
    isShow
}: ISelectSkeleton): ReactElement => (

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


export default SelectSkeleton;