import React from "react";
import { MdDelete } from "react-icons/md";
import { getRoleStyles } from "../../utils/data";

const SummaryCard = ({
    role = "",
    topicsToFocus = "",
    experience = "-",
    questions = "-",
    description = "",
    lastUpdated = "",
    onSelect,
    onDelete
}) => {
    const styles = getRoleStyles(role);

    return (
        <div 
            className="w-full bg-[#111111]/80 backdrop-blur-xl rounded-2xl p-5 cursor-pointer border border-white/5 hover:border-indigo-500/50 transition-all duration-500 group relative overflow-hidden"
            onClick={onSelect}
        >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
            
            <div className="relative flex flex-col h-full z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg relative overflow-hidden`}>
                        <div className={`absolute inset-0 opacity-20 ${styles.avatarBg}`}></div>
                        <span className="relative z-10">{styles.initials}</span>
                    </div>
                    
                    <button 
                        className="p-2 text-gray-500 bg-white/5 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete();
                        }}
                    >
                        <MdDelete className="text-lg" />
                    </button>
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1.5 group-hover:text-indigo-400 transition-colors">
                        {role || "Untitled Session"}
                    </h3>
                    
                    <p className="text-gray-400 text-xs font-medium mb-4 line-clamp-2">
                        {topicsToFocus || "No topics specified"}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5 whitespace-nowrap">
                            Exp: {experience}
                        </span>
                        <span className="bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5 whitespace-nowrap">
                            {questions} Q
                        </span>
                    </div>
                </div>
                
                <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">
                        {lastUpdated}
                    </span>
                    <span className="text-indigo-400 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Start →
                    </span>
                </div>
            </div>
        </div>

    );

};


export default SummaryCard;
