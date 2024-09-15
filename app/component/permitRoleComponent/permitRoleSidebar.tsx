'use client'
import React, {useState, useEffect} from 'react'
import { RiHistoryFill, RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaFileAlt, FaTasks, FaUserTie } from "react-icons/fa";
import { IoLogOutSharp, IoStatsChartSharp } from "react-icons/io5";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiSolidNotepad } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import { FaUserTag } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { PiClipboardTextFill } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";
import {SideBarNav} from '../../../types/index'
import { RiUserLocationFill } from "react-icons/ri";
import { MdAssignmentTurnedIn, MdCheckCircleOutline, MdLiveHelp, MdNotifications, MdWork } from "react-icons/md";
import { RiLuggageCartFill } from "react-icons/ri";
import { GiSuitcase } from 'react-icons/gi';
import { FcApproval } from 'react-icons/fc';
import { AiOutlineFileProtect } from "react-icons/ai";


const PermitRoleSidebar = ({active, setActive}: SideBarNav) => {
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
            <div className="w-full flex flex-row items-center justify-start h-[55px] bg-blue-700 pl-[20px] ">
                <span className="flex flex-row items-center justify-start">
                    <p className="text-xl font-semibold text-white">SBD</p>
                </span>
            </div>
            {/* sidebar items */}
            <div className="w-full h-[600px]  flex flex-col items-start justify-between admin-side-bar-cont ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] pl-[10px] pr-[10px]">
                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Home</p>}
                    </span>
                    <span className={active === "all-permit"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('all-permit')}}>
                        <AiOutlineFileProtect size={21} className={"text-slate-800"} /> 
                        <p className="text-[15.5px]">All Permit</p>
                    </span>
                    {/* <span className={active === "taskManagement"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('taskManagement')}}>
                        <FaFileAlt size={21} /> 
                        <p className="text-[15.5px]">Task Management</p>
                    </span> */}
                    
                    <span className={active === "inspection"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('inspection')}}>
                        <MdAssignmentTurnedIn size={21} /> 
                        <p className="text-[15.5px]"> Inspection Page</p>
                    </span>
                    
                    <span className={active === "notification"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notification')}}>
                        <MdNotifications size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Notification</p>}
                    </span>
                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <IoSettingsSharp size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Settings</p>}
                    </span>
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[30px] ">
                    <IoLogOutSharp size={21} />
                    {active !== "sales" && <p className="text-[15.5px] ">Logout</p>}
                </span>
            </div>
        </div>
    )
}

export default PermitRoleSidebar