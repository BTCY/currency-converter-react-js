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

const AboutPage = () => {

    return (
        <Layout>

            <Header>
                <Logo />
                <HeaderMenu />
            </Header>

            <Body>
                <div className="d-flex w-100 title-big mb-3 text-uppercase text-muted">
                    <h3>About</h3>
                </div>
                <div className="col-lg-6 align-items-center justify-content-left d-flex mb-5 mb-lg-0">

                    <div className="blockabout">
                        <div className="blockabout-inner text-center text-sm-start">
                            <p className="description-p text-muted pe-0 pe-lg-0">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quas optio reiciendis deleniti voluptatem facere sequi, quia, est sed dicta aliquid quidem facilis culpa iure perferendis? Dolor ad quia deserunt.
                            </p>
                            <p className="description-p text-muted pe-0 pe-lg-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quas optio reiciendis deleniti voluptatem facere.</p>
                        </div>
                    </div>
                </div>
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}

export default AboutPage;
