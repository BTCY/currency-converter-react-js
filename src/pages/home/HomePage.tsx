import { ReactElement } from "react";
import HomeTabs from "../../components/home/HomeTabs";
import BasePageTemplate from "../../page-templates/BasePageTemplate";

/**
 *  Home page
 */

const HomePage = (): ReactElement => (

    <BasePageTemplate>
        <HomeTabs />
    </BasePageTemplate>
);


export default HomePage;
