import { ReactElement, ReactNode } from "react";
import { Row } from "react-bootstrap";

/**
 *  Container for params
 */

interface IParamsContainer {

    /** Content */
    children?: ReactNode;
}


const ParamsContainer = ({
    children = undefined,
}: IParamsContainer): ReactElement => (

    <Row className="mb-5 align-items-end">
        {children && children}
    </Row>
);


export default ParamsContainer;