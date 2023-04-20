import { Tab, Tabs } from 'react-bootstrap';
// import { ArrowRight } from 'react-bootstrap-icons';
import styles from './Home.module.css';
import CurrencyConversionTab from '../currency-conversion-tab/CurrencyConversionTab';
import CurrencyFluctuationsTab from '../currency-fluctuations-tab/CurrencyFluctuationsTab';

/**
 *   Home
 */

const Home = () => {

    return (
        <div className={styles.tabsWrap}>
            <Tabs
                id="home-tab"
                defaultActiveKey="converter"
                justify
            >
                <Tab
                    eventKey="converter"
                    title="Converter"
                >
                    <CurrencyConversionTab />
                </Tab>

                <Tab
                    eventKey="fluctuations"
                    title="Fluctuations"
                >
                     <CurrencyFluctuationsTab />
                </Tab>

                <Tab
                    eventKey="3"
                    title="3"
                >
                    TODO
                </Tab>

                <Tab
                    eventKey="4"
                    title="4"
                >
                    TODO
                </Tab>
            </Tabs>
        </div>
    );
}

export default Home;