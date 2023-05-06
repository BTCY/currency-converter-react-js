import AboutContent from '../../components/about/AboutContent';
import Copyright from '../../components/copyright/Copyright';
import HeaderMenu from '../../components/header-menu/HeaderMenu';
import Logo from '../../components/logo/Logo';
import Body from '../../layout/Body';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import Layout from '../../layout/Layout';

/**
 *  About page
 */

const AboutPage = () => (
    <Layout>

        <Header>
            <Logo />
            <HeaderMenu />
        </Header>

        <Body>
            <AboutContent />
        </Body>

        <Footer>
            <Copyright />
        </Footer>

    </Layout>
);

export default AboutPage;
