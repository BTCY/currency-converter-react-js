import { ReactElement, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteIndexedDB } from "../../api/indexedDB-service";

/**
 *  About content
 */

enum Result { Ok = 'OK', Error = 'ERROR' };


const AboutContent = (): ReactElement => {

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
        <>
            <div className="mb-3 text-uppercase">
                <h3>About</h3>
            </div>

            <p>The data is cached in IndexedDB</p>

            <ul>
                <li className="mb-2">
                    <span className="fw-bold">List of currencies</span> - 30 days.
                </li>
                <li className="mb-2">
                    <span className="fw-bold">Results of operations with currencies</span> - 1 hour.
                </li>
            </ul>

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

            <p>
                Web applications for working with currencies. Data provided by API: <a
                    target="_blank"
                    href="https://apilayer.com/marketplace/exchangerates_data-api"
                    rel="noreferrer"
                >
                    Exchange Rates Data API
                </a>
            </p>

            <p>
                Description of tabs:
            </p>
            <ul>
                <li className="mb-2">
                    <span className="fw-bold">Converter</span> - currency conversion, which can be used to convert any amount from one currency to another.
                </li>
                <li className="mb-2">
                    <span className="fw-bold">Fluctuations</span> - fluctuation currencies. Hou will be able to retrieve information about how currencies fluctuate on a day-to-day basis.  Please note that the maximum allowed timeframe is 365 days.
                </li>
                <li className="mb-2">
                    <span className="fw-bold">Latest Exchange Rates</span> - real-time exchange rate.
                </li>
                <li className="mb-2">
                    <span className="fw-bold">Exchange Rate History</span> - historical rates are available for most currencies all the way back to the year of 1999.
                </li>
            </ul>
        </>
    );
}


export default AboutContent;
