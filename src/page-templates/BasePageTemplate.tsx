import { ReactElement } from "react";
import MainLayout from "../layouts/main-layout/MainLayout";
import Header from "../layouts/header/Header";
import Body from "../layouts/body/Body";
import Footer from "../layouts/footer/Footer";
import Copyright from "../components/copyright/Copyright";
import HeaderMenu from "../components/header-menu/HeaderMenu";
import Logo from "../components/logo/Logo";

/**
 *  Base page template
 */

interface IBasePageTemplate {
    children?: React.ReactNode;
}


const BasePageTemplate = ({
    children
}: IBasePageTemplate): ReactElement => (

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
