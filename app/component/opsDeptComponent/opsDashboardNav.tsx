import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const OpsDashboardNav = () => {
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
                    <input placeholder='Search for leads or jobs' type="text" name="" id="" className='pr-[50px] nav-input pr-[50px]' /> 
                    <span className="w-[40px] h-[35px] flex items-center justify-center text-black absolute right-0 top-[7.5px] border-l border-gray-200 corsor-pointer">
                        <CiSearch size={22} className='font-bold' />
                    </span>
                </span>
            </span>

            <span className="flex flex-row h-full items-center justify-center gap-5">
                {/* user avatar */}
                <span className="flex flex-col justify-between items-start h-[35px] my-auto">
                    <p className='text-sm font-semibold text-white'>Iroegbu David</p>
                    <p className='text-sm text-white'>Operations</p>
                </span>
                <img className="inline-block h-[30px] w-[30px] rounded-full ring-2 ring-white cursor-pointer"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </img>
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
            </span>
        </div>
    );
}

export default OpsDashboardNav;
