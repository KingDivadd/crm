'use client'
import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from "react-icons/bs";
import Image from 'next/image';

const CustomerDashboardNav = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef(null);

    const handleCalendarToggle = () => {
        setIsCalendarOpen(prev => !prev);
    };

    // const handleClickOutside = (event: any) => {
    //     if (calendarRef.current && !calendarRef.current.contains(event.target)) {
    //         setIsCalendarOpen(false);
    //     }
    // };
    

    // useEffect(() => {
    //     // document.addEventListener("mousedown", handleClickOutside);
    //     // return () => {
    //     //     document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    return (
        <div className='w-full h-[50px] bg-white border-b border-gray-100 flex flex-row items-center justify-between pr-[10px]'>
            <span className="flex flex-row items-center justify-start gap-5">
                <p className="text-lg font-semibold text-black">Welcome Poppins</p>                
            </span>

            <span className="flex flex-row h-full items-center justify-center gap-5">
                {/* user avatar */}
                <span className="flex flex-col justify-between items-start h-[35px] my-auto">
                    <p className='text-sm font-semibold text-black'>Marry Poppins</p>
                    <p className='text-sm text-black'>Customer</p>
                </span>
                <span className="flex items-center justify-center p-[2px] bg-blue-600 rounded-[100%] ">
                    <span className="relative  h-[30px] w-[30px] rounded-[100%] overflow-hidden ">
                        <Image 
                            src={"https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg"} 
                            alt="Logo" 
                            layout="fill" 
                            objectFit="cover" 
                            />
                    </span>
                </span>
                {/* bell icon */}
                <span className='h-full flex items-center justify-center text-white'>
                    <div className="w-auto relative flex items-start justify-start">
                        <span className="h-full flex items-center justify-center text-blue-600">
                            <BsBell size={23} className='cursor-pointer' onClick={handleCalendarToggle} />
                        </span>
                        {isCalendarOpen && (
                            <div ref={calendarRef} className="absolute  w-[250px] bg-blue-700 top-[40px] right-0 flex flex-col items-start justify-start p-[10px] rounded-[3px] gap-[10px] z-20 ">
                                
                                <p className="text-sm text-white font-semibold  ">Events</p>
                                <div className="w-full flex flex-col justify-start items-start ">
                                    {[1,2,3].map((data, ind)=>{
                                        return (
                                            <span className="w-full text-white h-[30px]">Overdue Task</span>

                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </span>
            </span>
        </div>
    );
}

export default CustomerDashboardNav;
