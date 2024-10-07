import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import ErrorPage from './Pages/Error/ErrorPages';
import LoginPage from './Pages/Login/LoginPage';

const RoutesConfig = () => {
    return (
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/*" element={<ErrorPage />} /> 
        </Routes>
    );
}

export default RoutesConfig;