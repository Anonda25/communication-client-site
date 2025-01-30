import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";
import {  useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAdmin from "../../Hooks/useAdmin";
import './Navbar.css'
const Navbar = () => {
    const { user, logOut } = useAuth()
    const axiosSecure = UseAxiosSecure()
    const [isAdmin]=useAdmin()
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("User logged out successfully.");
            })
            .catch((error) => console.error("Logout error:", error));
    };

    const { data: annusment = [] } = useQuery({
        queryKey: ['annusment'],
        queryFn: async () => {
            const { data } = await axiosSecure('/Announcements')
            // console.log(data);
            return data
        }
    })
   
    return (
        <div className="navbar bg-blue-200 lg:px-10 flex sticky top-0 z-10 justify-between">
            {/* Logo and Website Name */}
            <div className="flex">
                <Link to={'/'} className="btn btn-ghost text-xl">
                    Comonication
                </Link>
                <div className="lg:ml-10 flex gap-2 lg:gap-5 items-center justify-around">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/Membership'}>Membership</NavLink>
                  
                   {
                    user && <>
                    
                            {annusment && annusment.length > 0 && (
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator animate-bounce ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="badge badge-xs badge-primary indicator-item">{annusment.length}</span>
                                    </div>
                                </button>
                            )}
                    
                    
                    
                    </>
                   }
                </div>
            </div>

            {/* Navigation Items */}
            <div className="">
                {!user ? (
                    <Link to="/login" className="btn btn-primary  pr-6">
                        Join Us
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        {/* Profile Picture */}
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user?.photoURL || "https://via.placeholder.com/40"}
                                />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <span className="font-medium">{user.displayName}</span>
                            </li>
                            <li>
                               {
                                        isAdmin ? <Link to={"/dashboard/Admin-Profile"}>Dashboard</Link> : <Link to={"/dashboard/my-profile"}>Dashboard</Link>
                               }
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
