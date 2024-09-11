'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaClipboardList, FaTicketAlt, } from "react-icons/fa";
import { IoLogOutSharp, IoSettingsSharp, IoTicket, IoTicketSharp } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import {SideBarNav} from '../../../types/index'
import { MdNotifications, MdPhotoCamera, MdVerifiedUser, MdWork, } from 'react-icons/md';
import { FaSheetPlastic } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';



const InstallerSideBar = ({active, setActive}: SideBarNav) => {
    const router = useRouter()
    

    useEffect(() => {
        const item = sessionStorage.getItem('side_nav')
        if (item == null || item == ""){
            setActive('home')
        }else {
            setActive(item)
        }
    }, [])

    function handleActive(item:any){
        setActive(item)
        sessionStorage.setItem('side_nav', item)
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-start justify-start bg-gray-100 ">
            {/* sidebar nav */}
            <div className="w-full flex flex-row items-center justify-start h-[50px] bg-blue-700 pl-[20px] ">
                <span className="flex flex-row items-center justify-start">
                    <p className="text-xl font-semibold text-white">SBD</p>
                </span>
            </div>
            {/* sidebar items */}
            <div className="w-full flex flex-col items-start justify-between admin-side-bar-cont shadow-md rounded-[3px] ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] px-[10px]">

                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} />
                        <p className="text-[15.5px]">Home</p>
                    </span>

                    <span className={active === "job-list"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('job-list')}}>
                        <FaClipboardList size={21} /> 
                        <p className="text-[15.5px]">Job List</p>
                    </span>

                    <span className={active === "photo-upload"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('photo-upload')}}>
                        <MdPhotoCamera size={21} />
                        <p className="text-[15.5px]">Photo Upload</p>
                    </span>

                    <span className={active === "service-ticket"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('service-ticket')}}>
                        <IoTicket  size={21} />
                        <p className="text-[15.5px]">Service Ticket</p>
                    </span>

                    <span className={active === "bill-sheet"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('bill-sheet')}}>
                        <FaSheetPlastic size={21} />
                        <p className="text-[15.5px]">Bill Sheet</p>
                    </span>

                    {/* <span className={active === "report"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('report')}}>
                        <BiSolidNotepad size={21} />
                        <p className="text-[15.5px]">Reports</p>
                    </span> */}

                    <span className={active === "notification"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notification')}}>
                        <MdNotifications size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Notification</p>}
                    </span>

                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <IoIosSettings size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Settings</p>}
                    </span>
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[10px] ">
                    <IoLogOutSharp size={21} className='text-slate-800' />
                    <p className="text-[16px]">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default InstallerSideBar