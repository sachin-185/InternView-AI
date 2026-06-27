import React from "react";
import { LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const Drawer = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-xl md:max-w-2xl h-full bg-[#111111] shadow-2xl flex flex-col border-l border-white/5"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10">
                            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-95"
                            >
                                <LuX className="text-2xl" />
                            </button>
                        </div>


                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
