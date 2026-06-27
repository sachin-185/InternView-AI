import React, { useState, useContext } from 'react';
import Input from '../../components/Inputs/Input';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';
import { getAuthErrorMessage } from '../../utils/authErrors';

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password){
            setError("Please enter both email and password");
            return;
        }
        setError("");
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            const { token } = response.data;
            if(token){
                localStorage.setItem("token", token);
            }
            updateUser(response.data);
            navigate("/dashboard");
        } catch (err) {
            setError(getAuthErrorMessage(err));
        }
    };

    return (
        <div className="flex flex-col animate-fade-in max-w-sm mx-auto">
            <div className="w-full">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Welcome Back</h3>
                    <p className="text-gray-500 text-xs font-medium">
                        Log in to continue your preparation.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-1">
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="name@company.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                    />

                    <div className="pt-3">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3 px-6 rounded-xl font-bold text-base hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/20">
                            Log In
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg text-center mt-4 animate-fade-in">
                            {error}
                        </div>
                    )}

                    <p className="text-xs text-gray-500 mt-6 text-center font-medium">
                        New to PrepAI?{" "}
                        <button className="font-bold text-indigo-400 hover:underline cursor-pointer transition-all"
                            onClick={() => {
                                setCurrentPage("signup");
                            }}>
                            Create account
                        </button>
                    </p>

                </form>
            </div>
        </div>

    );
};
export default Login;
