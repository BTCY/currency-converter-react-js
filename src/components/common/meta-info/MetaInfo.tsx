import { ReactElement } from "react";

/**
 *  Meta information
 */

interface IMetaInfo {

    /** Update date, in milliseconds */
    updateDateMS: number;
}


const MetaInfo = ({
    updateDateMS
}: IMetaInfo): ReactElement => (

    <div className="d-flex justify-content-between text-uppercase bg-light text-secondary p-2 rounded">
        <small>
            update date: {new Date(updateDateMS).toLocaleString()}
        </small>
        <a
            target="_blank"
            href="https://apilayer.com/marketplace/exchangerates_data-api"
            className="link-secondary text-decoration-none small"
            rel="noreferrer"
        >
            source
        </a>
    </div>
);


export default MetaInfo;