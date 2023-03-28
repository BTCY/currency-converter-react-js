import { Container, Tab, Tabs } from 'react-bootstrap';
import CurrencyConversionTab from '../currency-conversion-tab/CurrencyConversionTab';

/**
 *   Home
 */

const Home = () => {

    return (
        <Container>
            <Tabs
                defaultActiveKey="converter"
                id="home-tab"
                className="mb-3"
                justify
            >
                <Tab eventKey="converter" title="Currency Converter">
                    <CurrencyConversionTab />
                </Tab>
                <Tab eventKey="2" title="2">
                    TODO
                </Tab>
                <Tab eventKey="3" title="3">
                    TODO
                </Tab>
                <Tab eventKey="4" title="4">
                    TODO
                </Tab>
            </Tabs> 
        </Container>
    );
}

export default Home;