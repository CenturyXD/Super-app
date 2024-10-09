import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import ErrorPage from './Pages/Error/ErrorPages';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPages';

const RoutesConfig = () => {
    return (
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/*" element={<ErrorPage />} /> 
        </Routes>
    );
}

export default RoutesConfig;