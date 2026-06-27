import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProfileButton = () => {
    const { user, clearUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = React.useState(false);

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#FF9324] font-bold shadow-sm">
                    {user.profileImageUrl ? (
                        <img 
                            src={user.profileImageUrl} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div style={{ display: user.profileImageUrl ? 'none' : 'flex' }} className="w-full h-full items-center justify-center">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                </div>
                <span className="text-sm font-medium">{user.name || 'User'}</span>
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileButton;
