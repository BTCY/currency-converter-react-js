import Copyright from '../../components/copyright/Copyright';
import HeaderMenu from '../../components/header-menu/HeaderMenu';
import Home from '../../components/home/Home';
import Logo from '../../components/logo/Logo';
import Body from '../../layout/Body';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import Layout from '../../layout/Layout';

/**
 * Home page
 */

const HomePage = () => {
    return (
        <Layout>

            <Header>
                <Logo />
                <HeaderMenu />
            </Header>

            <Body>
                <Home />
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}

export default HomePage;
