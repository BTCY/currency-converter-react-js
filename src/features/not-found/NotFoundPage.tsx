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
                <div className="d-flex w-100 align-items-center justify-content-center">
                    <div className="text-center">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-3">Page not found.</p>
                        <p className="lead">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                </div>
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}

export default NotFoundPage;
