import Copyright from '../../components/copyright/Copyright';
import Body from '../../layout/Body';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import Layout from '../../layout/Layout';


export function HomePage() {

    return (
        <Layout>

            <Header>
                Хедер
            </Header>

            <Body>
                TODO
            </Body>

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    );
}
