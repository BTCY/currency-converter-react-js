import { ReactNode, ReactElement } from "react";
import styles from "./TabTemplate.module.css";
import { Button } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";

/**
 *  Template for tab
 */

interface ITabTemplate {

    /** Tab title */
    title?: string;

    /** Tab content */
    children?: ReactNode;

    /** Handle for reset button */
    handleResetButton?: () => void;

    /** Disabled reset button */
    isDisabledResetButton?: boolean;
}


const TabTemplate = ({
    title = undefined,
    children = undefined,
    handleResetButton = undefined,
    isDisabledResetButton,
}: ITabTemplate): ReactElement => (

    <div className={styles.tabTemplateWrap}>

        <div className="d-flex justify-content-between mb-5"> 
            {title && <h2 className="m-0 me-3">{title}</h2>}

            {handleResetButton &&
                <Button
                    variant="link"
                    title="Reset params"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    disabled={isDisabledResetButton}
                    className="d-flex align-items-center p-1 mt-1"
                >
                    <XLg onClick={() => handleResetButton()} size={24} />
                </Button>
            } 
        </div>

        {children && children}
    </div>
);


export default TabTemplate;