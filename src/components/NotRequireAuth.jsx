import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotRequireAuth = () => {
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    return (
        Object.keys(user).length > 0 ? 
        <Navigate to='/' state={{ from: location }} replace /> : <Outlet /> 
        
    );
}
export default NotRequireAuth;