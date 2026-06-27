import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
            <Navbar />
            <main className="flex-1 w-full animate-fade-in">{children}</main>
            
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </div>
        </div>
    );
};

export default DashboardLayout;

