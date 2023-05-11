import { ReactElement } from "react";
import NotFoundContent from "../../components/not-found/NotFoundContent";
import BasePageTemplate from "../../page-templates/BasePageTemplate";

/**
 *  Not found page (404)
 */

const NotFoundPage = (): ReactElement => (

    <BasePageTemplate>
        <NotFoundContent />
    </BasePageTemplate>
);


export default NotFoundPage;
