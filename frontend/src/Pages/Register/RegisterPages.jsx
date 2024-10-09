import { useState } from "react";
import InputBox from "../../components/input/inputbox";
import Buttons from "../../components/buttons/button";
import axios from 'axios';
import BasicAlerts from "../../Components/alert/alert";

const RegisterPage = () => {
    const [inputusername, setInputusername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputname, setInputname] = useState('');
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleInputChange = (e, inputType) => {
        const value = e.target.value;
        if (inputType === 'username') {
            setInputusername(value);
        } else if (inputType === 'password') {
            setInputPassword(value);
        } else if (inputType === 'email') {
            setInputEmail(value);
        } else if (inputType === 'Name') {
            setInputname(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = import.meta.env.VITE_API_URL;
        const data = {
            name: inputname,
            username: inputusername,
            password: inputPassword,
            email: inputEmail
        };
    
        try {
            const response = await axios.post(`${url}/register`, data);
            setAlertMessage('Registration successful!');
            setAlertSeverity('success');
        } catch (error) {
            if (error.response) {
                setAlertMessage(`Registration failed: ${error.response.data.message}`);
            } else if (error.request) {
                setAlertMessage('Registration failed: No response from server.');
            } else {
                setAlertMessage(`Registration failed: ${error.message}`);
            }
            setAlertSeverity('error');
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">
                        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Register</h3>
                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Create your account</p>
                        {alertMessage && <BasicAlerts severity={alertSeverity} message={alertMessage} />}
                        <form onSubmit={handleSubmit}>
                            <InputBox
                                type="text"
                                placeholder="Name"
                                value={inputname}
                                onChange={(e) => handleInputChange(e, 'Name')}
                            />
                            <InputBox
                                type="text"
                                placeholder="Username"
                                value={inputusername}
                                onChange={(e) => handleInputChange(e, 'username')}
                            />
                            <InputBox
                                type="Password"
                                placeholder="Password"
                                value={inputPassword}
                                onChange={(e) => handleInputChange(e, 'password')}
                            />
                            <InputBox
                                type="Email"
                                placeholder="Email"
                                value={inputEmail}
                                onChange={(e) => handleInputChange(e, 'email')}
                            />
                            <div className="mt-5">
                                <Buttons
                                    type="submit"
                                    text="Register"
                                />
                            </div>
                            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>
                                <a href="/Login" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;