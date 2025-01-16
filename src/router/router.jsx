import {createBrowserRouter,} from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../UserLogin/Login";
import SignUp from "../UserLogin/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboad/Dashboard";
import MyProfile from "../Pages/Dashboard/Dashboad/MyProfile/MyProfile";
import Addpost from "../Pages/Dashboard/Dashboad/AddPost/Addpost";
import MyPost from "../Pages/Dashboard/Dashboad/MyPost/MyPost";
import PostCard from "../Pages/PostCard/PostCard";
import PrivateRoute from "./PrivetRoute";
import AllUser from "../Pages/Dashboard/Admin/AllUser/AllUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement:<></>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'Membership',
                element: <PrivateRoute><></></PrivateRoute>
            },
            {
                path:'post/:id',
                element: <PrivateRoute><PostCard></PostCard></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'my-profile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'add-post',
                element: <PrivateRoute><Addpost></Addpost></PrivateRoute>
            },
            {
                path: 'my-posts',
                element: <PrivateRoute><MyPost></MyPost></PrivateRoute>
            },

            /// admin router
            {
                path:'Manage-Users',
                element:<AllUser></AllUser>
            },
        ]
    }
    
]);

export default  router