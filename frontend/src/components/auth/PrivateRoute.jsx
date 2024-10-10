import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;