import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = () => {
    const location = useLocation();
    const user = useSelector(state => state.auth.user);

    return (
        Object.keys(user).length > 0 ? 
        <Outlet /> : user?.accessToken ? <Navigate to='/unauthorized' state={{ from: location }} replace/> : <Navigate to='/login' state={{ from: location }} replace />
        
    );
}
export default RequireAuth;