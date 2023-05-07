import MainLayout from "../layout/main-layout/MainLayout";
import Header from "../layout/header/Header";
import Body from "../layout/body/Body";
import Footer from "../layout/footer/Footer";
import Copyright from "../components/copyright/Copyright";
import HeaderMenu from "../components/header-menu/HeaderMenu";
import Logo from "../components/logo/Logo";

/**
 *   Base page template
 */

interface IBasePageTemplate {
    children?: React.ReactNode;
}

const BasePageTemplate = ({
    children
}: IBasePageTemplate): JSX.Element => (
    <MainLayout>

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

    </MainLayout>
);

export default BasePageTemplate;
