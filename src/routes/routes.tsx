import { ReactElement } from "react";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";

/**
 *  App routes
 */

export interface IRouteData {
    [key: string]: {
        element: ReactElement;
        path: string;
    }
}

export const RoutesData: IRouteData = {
    home: {
        element: <HomePage />,
        path: "/:tabId?",
    },
    about: {
        element: <AboutPage />,
        path: "/about",
    },
    notFoundPage: {
        element: <NotFoundPage />,
        path: "/not-found-page",
    },
    default: {
        element: <NotFoundPage />,
        path: "*",
    },
}
