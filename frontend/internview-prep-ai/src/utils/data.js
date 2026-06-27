export const CARD_BG = [
    { id: 1, bgcolor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { id: 2, bgcolor: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { id: 3, bgcolor: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 4, bgcolor: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
    { id: 5, bgcolor: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 6, bgcolor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    {id: 7, bgcolor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    {id: 8, bgcolor: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
    {id: 9, bgcolor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    {id: 10, bgcolor: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
]

export const APP_FEATURES = [
    // ... (existing features)
]

export const ROLE_STYLES = {
    "Frontend Developer": {
        initials: "FD",
        bg: "bg-[#eefcf4]",
        accent: "#2ecc71",
        avatarBg: "bg-white",
        avatarText: "text-[#2ecc71]"
    },
    "Backend Developer": {
        initials: "BD",
        bg: "bg-[#fff9e6]",
        accent: "#f1c40f",
        avatarBg: "bg-white",
        avatarText: "text-[#f1c40f]"
    },
    "Full Stack Developer": {
        initials: "FS",
        bg: "bg-[#eef7ff]",
        accent: "#3498db",
        avatarBg: "bg-white",
        avatarText: "text-[#3498db]"
    },
    "Data Analyst": {
        initials: "DA",
        bg: "bg-[#fff3ef]",
        accent: "#e67e22",
        avatarBg: "bg-white",
        avatarText: "text-[#e67e22]"
    },
    "DevOps Engineer": {
        initials: "DE",
        bg: "bg-[#f0f4ff]",
        accent: "#5c7cfa",
        avatarBg: "bg-white",
        avatarText: "text-[#5c7cfa]"
    },
    "UI/UX Designer": {
        initials: "UD",
        bg: "bg-[#f5f5f5]",
        accent: "#95a5a6",
        avatarBg: "bg-white",
        avatarText: "text-[#7f8c8d]"
    },
    "Mobile App Developer": {
        initials: "MA",
        bg: "bg-[#fff0f6]",
        accent: "#d63384",
        avatarBg: "bg-white",
        avatarText: "text-[#d63384]"
    },
    "AI/ML Engineer": {
        initials: "AE",
        bg: "bg-[#e6fffa]",
        accent: "#1abc9c",
        avatarBg: "bg-white",
        avatarText: "text-[#1abc9c]"
    },
    "Product Manager": {
        initials: "PM",
        bg: "bg-[#f3f0ff]",
        accent: "#845ef7",
        avatarBg: "bg-white",
        avatarText: "text-[#845ef7]"
    }
};

export const getRoleStyles = (roleName) => {
    const defaultStyle = {
        initials: roleName ? roleName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : "AI",
        bg: "bg-gray-50",
        accent: "#FF9324",
        avatarBg: "bg-white",
        avatarText: "text-orange-500"
    };

    return ROLE_STYLES[roleName] || defaultStyle;
};
