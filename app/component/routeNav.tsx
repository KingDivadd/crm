'use client'
import { useEffect, useRef, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { PiNotepad } from "react-icons/pi";
import { BiTask } from "react-icons/bi";
import Link from "next/link";
import { RouteNavProps } from "@/types";
import { BsFillBellFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { BsGearFill } from "react-icons/bs";
import { PiPowerBold } from "react-icons/pi";
import { MdPhotoCamera } from "react-icons/md";


const RouteNav = ({userRole}: RouteNavProps) => {
    const [page, setPage] = useState('')
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files);
        }
    };

    useEffect(() => {
        const path = window.location.pathname;
        setPage(path)
    }, [])


    
    return (
        <nav className='w-full bg-sky-700 flex flex-col items-center justify-start sticky -top-[100px] z-10 '>
            <div className="w-full flex flex-row items-center justify-between h-[100px] bg-slate-100 p-2 gap-2">
                <div className="w-[20%] h-full flex items-center justify-start">
                    <span className="flex flex-row items-center justify-start w-auto gap-2">
                        <img className="h-[50px] w-[50px" src="/logo.jpg" alt="logo" />
                        <span className="flex flex-col items-end justify-center">
                            <span className="flex flex-row items-center justify-center">
                                <p className="text-[23px] text-slate-600 font-semibold">Practice</p>
                                <p className="text-[23px] text-blue-600 font-semibold">EHR</p>
                            </span>
                            <p className="text-xs text-slate-600">Simplifying Healthcare</p>
                        </span>
                    </span>
                </div>

                <div className="w-[20%] h-full flex flex-row items-cener justif-start gap-3 bg-white shadow-xl rounded-[5px] px-2 py-2">
                    <div className="h-full w-auto flex flex-col justify-between items-center ">
                        <img className="h-[45px] w-[45px] rounded-full" src="/default-female.png" alt="Avatar"  />
                        <span className="flex items-center justify-between p-1 hover:bg-slate-300 rounded-[3px] cursor-pointer "  onClick={handleClick}><MdPhotoCamera size={20} className="text-slate-600"/> </span>

                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

                    </div>
                    <div className="h-full w-auto flex flex-col justify-between items-start ">
                        <p className="text-sm font-semibold text-slate-700">ANTHONY, TIFFINI</p>
                        <span className="flex flex-row items-start justify-start gap-1">
                            <p className="text-[14px] font-semibold text-slate-700">44</p>    
                            <p className="text-[14px] text-slate-700">Year(s), Female</p>    
                        </span>
                        <p className="text-[14px] text-slate-700">26/04/2024</p>    
                    </div>
                </div>

                <div className="w-[40%]  h-full">
                    {/* here is for adds */}
                </div>

                <div className="w-[20%] h-full flex items-center justify-end ">
                    <span className="w-auto flex flex-col items-end justify-between h-full">
                        <p className="text-sm text-slate-600 font-semibold">TIFFANI ANTHONY PHILLIP</p>
                        <p className="text-sm text-slate-600 font-semibold">HEALTH4LIFE</p>
                        <span className="flex flex-row items-center justify-between gap-2">
                            <span className="flex items-center justify-between p-1 hover:bg-slate-300 rounded-[3px] cursor-pointer "><BsFillBellFill size={20} className="text-slate-600"/> </span>
                            <span className="flex items-center justify-between p-1 hover:bg-slate-300 rounded-[3px] cursor-pointer "><IoIosLock size={21} className="text-slate-600"/> </span>
                            <span className="flex items-center justify-between p-1 hover:bg-slate-300 rounded-[3px] cursor-pointer "><BsGearFill size={20} className="text-slate-600"/> </span>
                            <span className="flex items-center justify-between p-1 hover:bg-slate-300 rounded-[3px] cursor-pointer "><PiPowerBold size={21} className="text-slate-600"/> </span>
                        </span>
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row gap-1 items-center w-auto h-[50px]">
                    {['admin-1', 'admin-2','billing', 'front-desk', 'medical-assistant', 'office-manager', 'physician'].includes(userRole) &&  <Link href={'/home'} className={page === '/home'? 'active-route-nav-item':'route-nav-item'}>
                        <BiHomeAlt2 size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">Home</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2', 'medical-assistant', 'office-manager', 'physician'].includes(userRole) &&  <Link href={'/'} className={page === '/'? 'active-route-nav-item':'route-nav-item'}>
                        <BiNotepad size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">EHR</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2','billing', 'front-desk', 'office-manager','physician'].includes(userRole) &&  <Link href={'/patient'} className={page === '/patient'? 'active-route-nav-item':'route-nav-item'}>
                        <GoPerson size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">Patient</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2','billing', 'front-desk', 'medical-assistant', 'office-manager',].includes(userRole) &&  <Link href={'/scheduling'} className={page === '/scheduling'? 'active-route-nav-item':'route-nav-item'}>
                        <LuCalendarClock size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">Scheduling</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2','billing', 'office-manager',].includes(userRole) &&  <Link href={'/pm'} className={page === '/pm'? 'active-route-nav-item':'route-nav-item'}>
                        <PiNotepad size={24} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">PM</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2', 'billing', 'front-desk', 'office-manager'].includes(userRole) &&  <Link href={'/reports'} className={page === '/reports'? 'active-route-nav-item':'route-nav-item'}>
                        <HiOutlineDocumentReport size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">Reports</p>
                    </Link>}
                    
                    {['admin-1', 'admin-2','billing', 'front-desk', 'medical-assistant', 'office-manager', 'physician'].includes(userRole) &&  <Link href={'/task-management'} className={page === 'task-management'? 'active-route-nav-item':'route-nav-item'}>
                        <BiTask size={23} className="text-slate-300" />
                        <p className="text-slate-300 text-[15px]">Task Management</p>
                    </Link>}
                    
                </div>

                <div className="flex flex-row gap-2 items-center h-[70%] items-center pr-5">
                    {['admin-1', 'admin-2','billing', 'front-desk', 'medical-assistant', 'office-manager', 'physician'].includes(userRole) &&  <Link href={'/new-patient'} className='flex flex-row gap-2 h-full items-center justify-center px-3 bg-amber-500 cursor-pointer rounded-[3px]'>
                        <IoAdd size={23} className="text-white" />
                        <p className="text-white font text-[15px]">New Patient</p>
                    </Link>}
                    <span className='flex flex-row gap-2 h-full items-center justify-center px-3 bg-amber-500 cursor-pointer rounded-[3px]'>
                        <p className="text-white text-[15px]">Search</p>
                    </span>
                </div>
            </div>

        </nav>
    )
}

export default RouteNav