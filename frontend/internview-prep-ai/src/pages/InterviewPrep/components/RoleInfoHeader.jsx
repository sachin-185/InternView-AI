import React from "react";
import { getRoleStyles } from "../../../utils/data";

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    lastUpdated,
    questions,
}) => {
    const styles = getRoleStyles(role);

    return (
        <div className="relative mb-12 overflow-hidden">
            <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Role Avatar */}
                    <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center font-bold text-4xl shadow-2xl border border-white/10 relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-20 ${styles.avatarBg}`}></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 text-white drop-shadow-lg">{styles.initials}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-orange-500/10 text-[#FF9324] text-[10px] font-black uppercase tracking-widest rounded-lg border border-orange-500/20">
                                Target Role
                            </span>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{role}</h2>
                        <p className="text-gray-400 font-medium text-lg max-w-3xl leading-relaxed">
                            {topicsToFocus}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    {[
                        { label: "Experience", value: `${experience} ${experience == 1 ? "Year" : "Years"}`, color: "blue" },
                        { label: "Content", value: `${questions} Modules`, color: "purple" },
                        { label: "Refreshed", value: lastUpdated, color: "orange" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-1.5 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
                            <span className="text-white font-bold text-sm">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default RoleInfoHeader;