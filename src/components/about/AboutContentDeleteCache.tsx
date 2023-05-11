import { ReactElement, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteIndexedDB } from "../../api/indexedDB-service"; 

/**
 *  Delete cache
 */

enum Result { Ok = "OK", Error = "ERROR" };


const AboutContentDeleteCache = (): ReactElement => {

    const [isDeletion, setIsDeletion] = useState<boolean>(false);
    const [deletionResult, setDeletionResult] = useState<Result | undefined>(undefined);

    const handleDataCache = (): void => {
        setIsDeletion(true);
        setDeletionResult(undefined);
        deleteIndexedDB()
            .then(() => setDeletionResult(Result.Ok))
            .catch(e => {
                setDeletionResult(Result.Error);
                console.log(e);
            })
            .finally(() => setIsDeletion(false));
    }

    return (
        <div className="d-flex mb-5 align-items-center">
            <Button
                disabled={isDeletion}
                onClick={() => handleDataCache()}
                className="me-3"
            >
                Delete all cached data
            </Button>

            {deletionResult &&
                <Alert
                    variant={deletionResult === Result.Ok ? "success" : "danger"} className="d-flex pt-1 pb-1 m-0"
                >
                    {deletionResult === Result.Ok
                        ? "Data deleted successfully"
                        : "An error occurred while deleting data"
                    }
                </Alert>
            }
        </div>
    );
}


export default AboutContentDeleteCache;
