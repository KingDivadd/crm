'use client'
import { useState } from 'react'
import { CustomButtonProps } from '@/types'
import Image from 'next/image'

const CustomButton = ({title, containerStyles, handleClick, btnType, disabledd}: CustomButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = async () => {
        if (handleClick) {
            setIsLoading(true);
            // await handleClick(); // Assuming handleClick is an asynchronous function
            setIsLoading(false);
        }
    };

    return (
        <button 
            disabled={disabledd}
            type={btnType || 'button'}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick} // Remove the unnecessary curly braces
        >
            <span className="flex items-center justify-center">
                {isLoading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <span>{title}</span>
                )}
            </span>
        </button>
    )
}

export default CustomButton

