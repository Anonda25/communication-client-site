
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth() 

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("User logged out successfully.");
            })
            .catch((error) => console.error("Logout error:", error));
    };

    return (
        <div className="navbar bg-base-200 px-10">
            {/* Logo and Website Name */}
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-xl">
                    Comonication
                </Link>
                <div className="ml-10 flex gap-5">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/Membership'}>Membership</Link>
                    
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-none">
                {!user ? (
                    <Link to="/login" className="btn btn-primary">
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
                                <Link to="/dashboard/my-profile">Dashboard</Link>
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
