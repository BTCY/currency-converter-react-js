import { ReactElement } from "react";
import AboutContent from "../../components/about/AboutContent";
import BasePageTemplate from "../../page-templates/BasePageTemplate";

/**
 *  About page
 */

const AboutPage = (): ReactElement => (

    <BasePageTemplate>
        <AboutContent />
    </BasePageTemplate>
);


export default AboutPage;
