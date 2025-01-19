import { createBrowserRouter, } from "react-router-dom";
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
import Announcement from "../Pages/Dashboard/Dashboad/Announcement/Announcement";
import Comments from "../Pages/Dashboard/Dashboad/Comment/Comments";
import MemberShipe from "../Pages/Home/MemberShipe/MemberShipe";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import AdminRoute from "../Pages/Dashboard/Admin/AdminRoute/AdminRoute";
import Reported from "../Pages/Dashboard/Dashboad/Reported/Reported";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <></>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch(`http://localhost:9000/pagination`)
            },
            {
                path: 'Membership',
                element: <PrivateRoute><MemberShipe></MemberShipe></PrivateRoute>
            },
            {
                path: 'post/:id',
                element: <PrivateRoute><PostCard></PostCard></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <SignUp></SignUp>
            },
            
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                // index:true,
                path: 'my-profile',
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
            {
                path: 'comments/:id',
                element: <Comments></Comments>
            },

            /// admin router
            {
                path: 'Admin-Profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'Manage-Users',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: "Make-Announcement",
                element: <AdminRoute><Announcement></Announcement></AdminRoute>
            },
            {
                path:'Reported-Comments',
                element:<AdminRoute><Reported></Reported></AdminRoute>
            }
        ]
    }

]);

export default router