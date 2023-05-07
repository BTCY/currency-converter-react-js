import { ReactElement } from "react";
import Home from "../../components/home/Home";
import BasePageTemplate from "../../page-templates/BasePageTemplate";

/**
 *  Home page
 */

const HomePage = (): ReactElement => (

    <BasePageTemplate>
        <Home />
    </BasePageTemplate>
);


export default HomePage;
