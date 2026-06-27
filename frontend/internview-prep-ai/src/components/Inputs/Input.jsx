import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-6">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2.5 ml-1">{label}</label>
            <div className="relative group">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className={`w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF9324]/50 focus:border-[#FF9324] transition-all group-hover:border-white/20 ${type === "password" ? "pr-14" : ""}`}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                    </button>
                )}
            </div>
        </div>
    );

};

export default Input;

