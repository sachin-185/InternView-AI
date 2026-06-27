import React, { useState, useContext } from 'react';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhtotoSelector';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { getAuthErrorMessage } from '../../utils/authErrors';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({ setCurrentPage }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState(null);

    const { updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if(!password){
            setError("Password cannot be empty");
            return;
        }
        setError("");
        
        let profileImageUrl = "";
        try{
            if(profilePhoto){
                const imgUploadRes = await uploadImage(profilePhoto);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name,
                email,
                password,
                profileImageUrl,
            });

            const { token } = response.data;
            if(token){
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(getAuthErrorMessage(error));
        }
    };

    return (
        <div className="flex flex-col animate-fade-in max-w-md mx-auto">
            <div className="w-full">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Create Account</h3>
                    <p className="text-gray-500 text-xs font-medium">Join PrepAI to start your journey</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <ProfilePhotoSelector
                            image={profilePhoto}
                            onImageChange={(img) => setProfilePhoto(img)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <Input
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email"
                            placeholder="john@example.com"
                            type="text"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                        />

                        <Input
                            value={confirmPassword}
                            onChange={({ target }) => setConfirmPassword(target.value)}
                            label="Confirm"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] py-2 px-3 rounded-lg text-center mb-4 animate-fade-in">
                            {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3 px-6 rounded-xl font-bold text-base hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/20">
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-xs mt-6 font-medium">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="text-indigo-400 hover:underline font-bold transition-all"
                        onClick={() => setCurrentPage && setCurrentPage("login")}>
                        Log In
                    </button>
                </p>

            </div>
        </div>

    );

};

export default SignUp;

