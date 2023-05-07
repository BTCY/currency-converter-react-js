import { ReactElement } from "react";

/**
 *  About content
 */

const AboutContent = (): ReactElement => (
    <>
        <div className="mb-3 text-uppercase">
            <h3>About</h3>
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


export default AboutContent;
