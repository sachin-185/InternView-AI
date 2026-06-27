import React from 'react';

const SpinnerLoader = ({ size = 'md', color = 'orange', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const colorClasses = {
        orange: 'border-orange-500 border-t-transparent',
        blue: 'border-blue-500 border-t-transparent',
        indigo: 'border-indigo-500 border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-500 border-t-transparent',
    };


    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`
                    ${sizeClasses[size] || sizeClasses.md}
                    ${colorClasses[color] || colorClasses.orange}
                    border-2
                    rounded-full
                    animate-spin
                `}
            />
        </div>
    );
};

export default SpinnerLoader;
