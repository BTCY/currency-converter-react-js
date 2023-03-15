import { ReactElement } from "react";
import AboutPage from "../features/about/AboutPage";
import HomePage from "../features/home/HomePage";
import NotFoundPage from "../features/not-found/NotFoundPage";

/**
 * App routes
 */

export interface IRouteData {
    [key: string]: {
        component: ReactElement;
        link: string;
    }
}


export const RoutesData: IRouteData = {
    home: {
        component: <HomePage />,
        link: '/',
    },
    about: {
        component: <AboutPage />,
        link: '/about',
    },
    notFound: {
        component: <NotFoundPage />,
        link: '*',
    },
}
