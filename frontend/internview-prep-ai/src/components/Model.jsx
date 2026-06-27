import React from 'react';

const Modal = ({ isOpen, onClose, title, hideHeader, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            />
            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in">
                {!hideHeader && (
                    <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">
                        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                        <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Modal;
