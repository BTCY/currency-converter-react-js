import { ReactElement } from "react";
import { Alert } from "react-bootstrap";

/**
 *  Stub when no data
 */

interface IStubNoData {

    /** Custom title when no data */
    title?: string;

    /** Custom text when no data */
    text?: string;
}


const StubNoData = ({
    title,
    text,
}: IStubNoData): ReactElement => (
    <Alert variant="danger">
        <Alert.Heading>{title ? title : "Error loading data"}</Alert.Heading>
        <hr />
        <p className="mb-0">
            {text ? text : "Please try refreshing this page. If the error persists, then try loading the page a little later."}
        </p>
    </Alert>
);


export default StubNoData;