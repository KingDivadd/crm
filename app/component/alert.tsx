import { AlertProps } from '@/types';
import React from 'react'

const Alert = ({ message, type }:AlertProps) => {
    const alertStyles:any = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    };
    return (
        <div className={`${alertStyles[type]} px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default Alert