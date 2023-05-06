import NfpContent from '../../components/not-found-page/NfpContent';
import BasePageTemplate from '../../page-templates/BasePageTemplate';

/**
 *  Not found page (404)
 */

const NotFoundPage = (): JSX.Element => (
    <BasePageTemplate>
        <NfpContent />
    </BasePageTemplate>
);

export default NotFoundPage;
