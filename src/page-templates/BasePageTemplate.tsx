import Copyright from "../components/copyright/Copyright";
import HeaderMenu from "../components/header-menu/HeaderMenu";
import Logo from "../components/logo/Logo";
import Body from "../layout/Body";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Layout from "../layout/Layout";

/**
 *   Base page template
 */

interface IBasePageTemplate {
    children?: React.ReactNode;
}

const BasePageTemplate = ({ children }: IBasePageTemplate): JSX.Element => {

    return (
        <Layout>

            <Header>
                <Logo />
                <HeaderMenu />
            </Header>

            <Body>
                {children && children}
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}

export default BasePageTemplate;
