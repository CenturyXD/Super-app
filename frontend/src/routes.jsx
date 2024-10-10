import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import ErrorPage from './Pages/Error/ErrorPages';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPages';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './components/auth/AuthContext';

const RoutesConfig = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/Home" element={<HomePage />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default RoutesConfig;