import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayout from "../LayOut/HomeLayout";
import Home from "../Pages/Customer/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Registeration from "../Pages/Registration";
import Login from "../Pages/Login";
import RiderLayout from "../LayOut/RiderLayout";
import ProtectedRouter from "../Router/ProtectedRouter";
import AdminLayout from "../LayOut/AdminLayout";
import Parcel from "../Pages/Dashboard/Parcel";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Agents from "../Pages/Dashboard/Agent";
import Users from "../Pages/Dashboard/Users";
import Reports from "../Pages/Dashboard/Report";
import AddParcel from "../Pages/Customer/Addparcel";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "track",
                element:<ProtectedRouter><RiderLayout></RiderLayout></ProtectedRouter>
            },
            {
                path: "book-parcel",
                element:<ProtectedRouter><AddParcel></AddParcel></ProtectedRouter>
            },
            {
                path: "/agent",
                element:<ProtectedRouter><RiderLayout></RiderLayout></ProtectedRouter>
            },

        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Registeration
            },
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRouter>
                <AdminLayout></AdminLayout>
            </ProtectedRouter>
        ),
        children: [
            { index: true, element: <Dashboard></Dashboard> },
            { path: "parcels", element: <Parcel /> },
            { path: "agents", element: <Agents /> },
            { path: "users", element: <Users /> },
            { path: "reports", element: <Reports /> },
        ]
    }
]);