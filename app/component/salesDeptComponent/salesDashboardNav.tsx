import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Image from "next/image"

const SalesDashboardNav = () => {
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
        <div className='w-full h-[50px] bg-blue-700 flex flex-row items-center justify-between pr-[10px]'>
            <span className="w-[60%] h-full flex  flex-row items-center justify-start gap-5 px-[10px]">
                <span className="w-full h-full flex items-center  nav-search-input relative ">
                    <input placeholder='Search for leads or jobs' type="text" name="" id="" className='pr-[50px] nav-input pr-[50px] text-sm' /> 
                    <span className="w-[40px] h-[35px] flex items-center justify-center text-black absolute right-0 top-[7.5px] border-l border-gray-200 corsor-pointer">
                        <CiSearch size={22} className='font-bold' />
                    </span>
                </span>
            </span>

            <span className="flex flex-row h-full items-center justify-center gap-5">
                {/* bell icon */}
                <span className='h-full flex items-center justify-center text-white'>
                    <div className="w-auto relative flex items-start justify-start">
                        <span className="h-full flex items-center justify-center text-white">
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

                <span className="flex flex-col justify-between items-start my-auto">
                    <p className='text-sm text-white'>Iroegbu David</p>
                    <p className='text-sm text-slate-300'>Sales</p>
                </span>
                
                <span className="p-[2.5px] flex items-center justify-center bg-slate-200 rounded-[100%] ">
                    <div className="relative w-[40px] h-[40px] rounded-[100%] overflow-hidden p-[7.5px] bg-blue-200">
                        <Image
                            src="https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg"
                            alt="Authentication"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </span>

            </span>
        </div>
    );
}

export default SalesDashboardNav;
