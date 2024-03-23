import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import AdminComponent from "./view/admin-view/AdminComponent";
import CustomerComponent from "./view/customer-view/CustomerComponent";
import Dashboard from "./view/dashboard/Dashboard";
import Main from "./view/main/Main";

const appRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={'home'} />
    },
    {
        path: 'home',
        Component: Dashboard
    },
    {
        path: 'admin',
        Component: AdminComponent
    },
    {
        path: 'user',
        Component: CustomerComponent
    },
];

const routes: RouteObject[] = [
    {
        path: 'app',
        Component: Main,
        children: appRoutes
    }, 
    {
        index: true,
        element: <Navigate to={'app'} />
    }  
];

export const router = createBrowserRouter(routes);