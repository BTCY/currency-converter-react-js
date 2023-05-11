import { ReactElement } from "react";
import AboutContentList, { IAboutContentListItem } from "./AboutContentList";
import AboutContentDeleteCache from "./AboutContentDeleteCache";

/**
 *  About content
 */

const CASHE_INFO: IAboutContentListItem[] = [
    { boldText: "List of currencies", text: " - 30 days." },
    { boldText: "Results of operations with currencies", text: " - 1 hour." },

]

const TABS_INFO: IAboutContentListItem[] = [
    { boldText: "Converter", text: " - currency conversion, which can be used to convert any amount from one currency to another." },
    { boldText: "Fluctuations", text: " - fluctuation currencies. Hou will be able to retrieve information about how currencies fluctuate on a day-to-day basis.  Please note that the maximum allowed timeframe is 365 days." },
    { boldText: "Latest Exchange Rates", text: " - real-time exchange rate." },
    { boldText: "Exchange Rate History", text: " - historical rates are available for most currencies all the way back to the year of 1999." },
]


const AboutContent = (): ReactElement => (
    <>
        <div className="mb-4 text-uppercase">
            <h3>About</h3>
        </div>

        <AboutContentList
            title="The data is cached in IndexedDB"
            list={CASHE_INFO}
        />

        <AboutContentDeleteCache />

        <p>
            Web applications for working with currencies. Data provided by API: <a
                target="_blank"
                href="https://apilayer.com/marketplace/exchangerates_data-api"
                rel="noreferrer"
            >
                Exchange Rates Data API
            </a>
        </p>

        <AboutContentList
            title="Description of tabs:"
            list={TABS_INFO}
        />
    </>
);


export default AboutContent;
