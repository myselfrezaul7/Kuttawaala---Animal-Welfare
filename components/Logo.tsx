import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 155 50"
            className={className}
            aria-label="KUTTAWAALA Logo"
        >
            <path
                className="fill-orange-500"
                d="M25,5C12.8,5,2.5,14.6,2.5,26c0,11.4,14,24,19,25.2c1.2,0.3,2.5,0.3,3.7,0c5,1.2,19-13.8,19-25.2C44.2,14.6,37.2,5,25,5z"
            />
            <circle className="fill-white" cx="25" cy="32" r="5" />
            <circle className="fill-white" cx="17" cy="23" r="3" />
            <circle className="fill-white" cx="25" cy="20" r="3" />
            <circle className="fill-white" cx="33" cy="23" r="3" />
            <text
                x="47"
                y="32"
                className="font-bold text-[15px] fill-slate-700 dark:fill-slate-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                KUTTAWAALA
            </text>
        </svg>
    );
};

export default Logo;