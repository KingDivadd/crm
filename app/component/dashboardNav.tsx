import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Image from "next/image"
import {get_auth_request} from "../api/admin_api"
import { get_current_time } from './helper';
import { useRouter } from 'next/navigation';

interface Nav_Props {
    user?:any;
    notification?:any;
}

const DashboardNav = () => {
    const router = useRouter()
    const [user_info, setUser_info] = useState<Nav_Props | null>(null)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [date_time, setDate_time] = useState('')
    const calendarRef = useRef(null);
    

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
        
        const gotten_time = get_current_time()
        if (gotten_time) {
            setDate_time(gotten_time)
        }
        setInterval(() => {
            const gotten_time = get_current_time()
            if (gotten_time) {
                setDate_time(gotten_time)                
            }
        }, 60000);

    }, [])

    useEffect(() => {
        get_dashboard_data()
    }, [])
    

    async function get_dashboard_data() {

        try {        
            
            const response = await get_auth_request(`app/logged-in-user`)
            
            
            if (response.status == 200 || response.status == 201){
                
                setUser_info(response.data)      
                

            }else{
                if (response){
                    if (response.response.status == 402) {
                        setTimeout(() => {
                            router.push('auth/login')
                        }, 3000)
                    }
    
                    showAlert(response.response.data.err, "error")
                }
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
        <div className='w-full h-[55px] bg-blue-700 flex flex-row items-center justify-between pr-[10px]'>
            <span className="w-[70%] h-full flex  flex-row items-center justify-start gap-5 px-[10px]">
                {user_info?.user && 
                
                <p className="text-[16px] font-medium text-white whitespace-nowrap">
                    {user_info.user.user_role == 'admin'  && "Admin Portal"}
                    {user_info.user.user_role == 'super_admin'  && "Admin Portal"}
                    {user_info.user.user_role == 'sales' && "Sales Portal"}
                    {user_info.user.user_role == 'operation' && "Operation Portal"}
                    {user_info.user.user_role == 'designer' && "Designer Portal"}
                    {user_info.user.user_role == 'installer' && "Installer Portal"}
                    {user_info.user.user_role == 'customer' && "Customer Portal"}
                    {user_info.user.user_role == 'engineering' && "Engineering Portal"}
                    {user_info.user.user_role == 'electrical' && "Electrical Portal"}
                    {user_info.user.user_role == 'accounting' && "Accounting Portal"}
                    {user_info.user.user_role == 'permit' && "Permit Portal"}
                </p>
                
                }

                <span className="w-full h-full flex items-center  nav-search-input relative ">
                    <input placeholder='Search for leads or jobs' type="text" name="" id="" className='pr-[50px] nav-input h-[35px] text-[15.5px] ' /> 
                    <span className="w-[40px] h-[35px] flex items-center justify-center text-black absolute right-0 top-[10px] border-l border-gray-200 corsor-pointer">
                        <CiSearch size={22} className='font-bold' />
                    </span>
                </span>

                <p className="text-[15.5px] text-white whitespace-nowrap">{date_time}</p>

            </span>

            <span className="flex flex-row h-full items-center justify-center gap-5">
                {/* bell icon */}
                <span className='h-full flex items-center justify-center text-white'>
                    <div className="w-auto relative flex items-start justify-start">
                        <span className="h-full flex items-center justify-center text-white">
                            <BsBell size={23} className='cursor-pointer' onClick={handleCalendarToggle} />
                        </span>
                        {isCalendarOpen && (
                            <div ref={calendarRef} className="absolute max-h-[400px] w-[350px] bg-white top-[40px] right-0 flex flex-col items-start justify-start p-[10px] rounded-[3px] gap-[10px] z-20 shadow-lg overflow-y-auto">
                                
                                <p className="text-[15.5px] text-black font-semibold  ">Events</p>
                                <div className="w-full flex flex-col justify-start items-start gap-[5px] ">
                                    {user_info?.notification.map((data:any, ind:any)=>{
                                        const {message} = data
                                        return (
                                            <span key={ind} className="rounded-[3px] flex items-center justify-start px-[5px] w-full text-black text-[15px] min-h-[30px] hover:bg-slate-200">{message}</span>

                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </span>

                        {user_info?.user && <p className='text-[16px] text-white text-end'>{user_info?.user.first_name} {user_info?.user.last_name} </p>}
                
                {/* {user_info && user_info.user && <div className="relative w-[35px] h-[35px] rounded-[100%] overflow-hidden p-[7.5px] bg-blue-200">
                    <Image
                        src={user_info?.user.avatar || "https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg"}
                        alt="avatar"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>} */}


            </span>
        </div>
    );
}

export default DashboardNav;
