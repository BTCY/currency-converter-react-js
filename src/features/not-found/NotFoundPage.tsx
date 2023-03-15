import Copyright from '../../components/copyright/Copyright';
import HeaderMenu from '../../components/header-menu/HeaderMenu';
import Logo from '../../components/logo/Logo';
import Body from '../../layout/Body';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import Layout from '../../layout/Layout';

/**
 * Not found page (404)
 */

const NotFoundPage = () => {

    return (
        <Layout>

            <Header>
                <Logo />
                <HeaderMenu />
            </Header>

            <Body>
                404
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}

export default NotFoundPage;
