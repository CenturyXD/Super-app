import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicAlerts from "../../Components/alert/alert";
import { useAuth } from "../../components/auth/AuthContext";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from context

    const handleSubmit = async (e) => {
        console.log('Login form submitted');
        e.preventDefault();
        setError('');
        const url = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.post(`${url}/login`, {
                username,
                password,
            });

            console.log('Response from server:', response);

            // Extract token and username from the response
            const token = response.data.token;
            const usernameFromResponse = response.data.user.name;

            console.log('Extracted token:', token);
            console.log('Extracted username:', usernameFromResponse);

            // Save the token and username in local storage or context
            login(token, usernameFromResponse);
            
            setAlertMessage('Login successful!');
            setAlertSeverity('success');
            navigate('/Home');
        } catch (error) {
            if (error.response) {
                setAlertMessage(`Login failed: ${error.response.data.message}`);
            } else if (error.request) {
                setAlertMessage('Login failed: No response from server.');
            } else {
                setAlertMessage(`Login failed: ${error.message}`);
            }
            setAlertSeverity('error');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>
                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
                    {alertMessage && <BasicAlerts severity={alertSeverity} message={alertMessage} />}
                    {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="w-full mt-4">
                            <input
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="text"
                                placeholder="Username"
                                aria-label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-4">
                            <input
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                    <a href="/Register" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;