import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
                            
                                <NavLink to="/dashboard/Admin-Profile" className="btn btn-ghost w-full text-left">
                                    Admin Profile
                                </NavLink>
                           
                           
                                <NavLink to="/dashboard/Manage-Users" className="btn btn-ghost w-full text-left">
                                    Manage Users
                                </NavLink>
                          
                            
                                <NavLink to="/dashboard/Reported-Comments" className="btn btn-ghost w-full text-left">
                                    Reported Comments
                                </NavLink>
                           
                            
                                <NavLink to="/dashboard/Make-Announcement" className="btn btn-ghost w-full text-left">
                                    Make Announcement
                                </NavLink>
                            
                            <div className="divider">OR</div>
                            
                           
                            <NavLink to={'/'}> <h1 className="btn btn-ghost w-full text-center">Home</h1></NavLink>
                           
                        </>
                        :
                        <>
                                
                                    <NavLink to="/dashboard/my-profile" className="btn btn-ghost w-full text-left">
                                        My Profile
                                    </NavLink>
                               
                               
                                    <NavLink to="/dashboard/add-post" className="btn btn-ghost w-full text-left">
                                        Add Post
                                    </NavLink>
                                
                                
                                    <NavLink to="/dashboard/my-posts" className="btn btn-ghost w-full text-left">
                                        My Posts
                                    </NavLink>
                               
                                <div className="divider"></div>
                               
                                <NavLink to={'/'}> <h1 className="btn btn-ghost w-full text-center ">Home</h1></NavLink>
                               
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
