import { Tab, Tabs } from 'react-bootstrap';
import styles from './Home.module.css';
import CurrencyConversionTab from '../currency-conversion-tab/CurrencyConversionTab';

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
                    eventKey="2"
                    title="2"
                >
                    TODO
                </Tab>

                <Tab
                    eventKey="3"
                    title="3"
                >
                    <CurrencyConversionTab />
                    TODO
                </Tab>

                <Tab
                    eventKey="4"
                    title="4"
                >
                    <CurrencyConversionTab />
                    TODO
                </Tab>
            </Tabs>
        </div>
    );
}

export default Home;