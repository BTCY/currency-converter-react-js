import { ReactElement } from "react";
import { HomePage } from "../features/home/HomePage";



export interface IRouteData {
    [key: string]: {
        label: string;
        component: ReactElement;
        link: string;
    }
}


export const RoutesData: IRouteData = {
    home: {
        label: 'home',
        component: <HomePage />,
        link: '/',
    },
}
