import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../../../Hooks/useAdmin";
import useAuth from "../../../../Hooks/UseAuth";


const AdminRoute = ({children}) => {
    const {user, loading}=useAuth()
    const [isAdmin, isLoading]=useAdmin()
    const location = useLocation()

    if (loading || isLoading) return <p>loading....</p>
    if (user && isAdmin) return children
    return <Navigate to='/' state={{ from: location }} replace='true' />
};

export default AdminRoute;