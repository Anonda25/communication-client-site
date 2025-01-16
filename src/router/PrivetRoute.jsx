import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/UseAuth'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <p>loading....</p>
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
}



export default PrivateRoute