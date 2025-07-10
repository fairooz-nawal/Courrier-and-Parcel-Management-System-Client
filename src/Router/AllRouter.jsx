import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomeLayout from "../LayOut/HomeLayout";
import Home from "../Pages/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Registeration from "../Pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children:[
        {
            index:true,
            Component: Home
        },
        {
         path:"track",
         Component:Home
        },
        {
         path:"book-parcel",
         Component:Home
        },
        {
         path:"customer-dashboard",
         Component:Home
        },
        {
         path:"agent-dashboard",
         Component:Home
        },
        {
         path:"admin-dashboard",
         Component:Home
        },
    ]
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
       {
         path:"login",
         Component:Home
        }, 
       {
         path:"register",
         Component:Registeration
        }, 
    ]
  }
]);