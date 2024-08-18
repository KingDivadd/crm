import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Image from "next/image"
import { get_auth_request } from '@/app/api/admin_api';

interface Nav_Props {
    user?:any;
    notification?:any;
}

const DashboardNav = () => {
    const [user_info, setUser_info] = useState<Nav_Props | null>(null)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef(null);

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
        get_dashboard_data()
    }, [])

    async function get_dashboard_data() {

        try {            
            const response = await get_auth_request(`auth/logged-in-user`)
            
    
            if (response.status == 200 || response.status == 201){
                
                setUser_info(response.data)      
    
                
            }else{
                console.log('something went wrong');
                
            }
            
        } catch (err:any) {
            
            showAlert('Something went wrong, logout and login again.', "error")
        }
        
    }

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
                {user_info?.user && 
                
                <p className="text-md font-medium text-white whitespace-nowrap">
                    {user_info.user.user_role == 'admin' && "Admin Porter"}
                    {user_info.user.user_role == 'sales' && "Sales Porter"}
                    {user_info.user.user_role == 'operation' && "Operation Porter"}
                    {user_info.user.user_role == 'designer' && "Designer Porter"}
                    {user_info.user.user_role == 'customer' && "Customer Porter"}
                </p>
                
                }

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
                            <div ref={calendarRef} className="absolute  w-[300px] bg-blue-700 top-[40px] right-0 flex flex-col items-start justify-start p-[10px] rounded-[3px] gap-[10px] z-20 ">
                                
                                <p className="text-sm text-white font-semibold  ">Events</p>
                                <div className="w-full flex flex-col justify-start items-start ">
                                    {user_info?.notification.map((data:any, ind:any)=>{
                                        const {message} = data
                                        return (
                                            <span key={ind} className="rounded-[3px] flex items-center justify-start px-[5px] w-full text-white text-sm min-h-[30px] hover:bg-blue-500">{message}</span>

                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </span>

                        {user_info?.user && <p className='text-sm text-white text-end'>{user_info?.user.first_name} {user_info?.user.last_name} </p>}
                
                <div className="relative w-[35px] h-[35px] rounded-[100%] overflow-hidden p-[7.5px] bg-blue-200">
                    <Image
                        src={user_info?.user.avatar || "https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg"}
                        alt="avatar"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>


            </span>
        </div>
    );
}

export default DashboardNav;
