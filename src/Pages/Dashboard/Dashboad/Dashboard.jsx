import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../../Hooks/useAdmin";



const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="min-h-screen bg-base-200 flex gap-5 flex-col sm:flex-col md:flex-col lg:flex-row   ">
            {/* Sidebar Navigation */}
            
            <div className="lg:w-1/4 bg-base-100 shadow-md p-4 overflow-hidden">
                
                <ul className="  space-y-4">

                    {
                        isAdmin ? <>
                            <li>
                                <Link to="/dashboard/Admin-Profile" className="btn btn-ghost w-full text-left">
                                    Admin Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Manage-Users" className="btn btn-ghost w-full text-left">
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Reported-Comments" className="btn btn-ghost w-full text-left">
                                    Reported Comments
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Make-Announcement" className="btn btn-ghost w-full text-left">
                                    Make Announcement
                                </Link>
                            </li>
                            <div className="divider">OR</div>
                            
                            <li>
                                <Link to={'/'}> <h1 className="text-xl font-bold">Home</h1></Link>
                            </li>
                        </>
                        :
                        <>
                                <li>
                                    <Link to="/dashboard/my-profile" className="btn btn-ghost w-full text-left">
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/add-post" className="btn btn-ghost w-full text-left">
                                        Add Post
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/my-posts" className="btn btn-ghost w-full text-left">
                                        My Posts
                                    </Link>
                                </li>
                                <div className="divider"></div>
                                <li>
                                    <Link to={'/'}> <h1 className="text-xl font-bold ">Home</h1></Link>
                                </li>
                        </>
                    }
                    
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-2">
                <Outlet />
            </div>
        </div>
        
    );
};

export default Dashboard;
