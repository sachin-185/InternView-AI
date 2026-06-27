import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfileInfoCard = () => {
    const { user, clearUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [imgFailed, setImgFailed] = useState(false);

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    const initial = (user.name || user.email || '?').trim().charAt(0).toUpperCase() || '?';
    const rawUrl = user.profileImageUrl && String(user.profileImageUrl).trim();
    const showPhoto = rawUrl && !imgFailed;

    return (
        <div className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight group-hover:text-[#FF9324] transition-colors">{user.name || 'User'}</p>
                <button
                    onClick={handleLogout}
                    className="text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-red-400 transition-colors"
                >
                    Logout
                </button>
            </div>
            
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9324] to-[#ff7b00] rounded-full opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                {showPhoto ? (
                    <img
                        src={rawUrl}
                        alt=""
                        className="relative h-9 w-9 shrink-0 rounded-full object-cover border border-white/10 shadow-lg"
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <div
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF9324] to-[#ff7b00] text-sm font-black text-white shadow-lg border border-white/10"
                        aria-hidden
                    >
                        {initial}
                    </div>
                )}
            </div>
        </div>
    );


};

export default ProfileInfoCard;
