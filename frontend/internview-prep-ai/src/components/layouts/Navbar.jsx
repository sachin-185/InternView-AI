import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    return (
        <header className="w-full border-b border-white/5 bg-[#0a0a0a]/60 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-5 py-4 px-4 md:px-8">
                <Link to="/dashboard" className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
                    <span className="text-indigo-400">Prep</span>AI
                </Link>
                
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors">Dashboard</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ProfileInfoCard />
                </div>
            </div>
        </header>
    );
}

export default Navbar;