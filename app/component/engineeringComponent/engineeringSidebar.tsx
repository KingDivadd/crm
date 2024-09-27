'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaFileAlt, FaTasks, FaUserTie } from "react-icons/fa";
import { IoLogOutSharp, IoStatsChartSharp, IoTicket } from "react-icons/io5";
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
import { MdAssignmentTurnedIn, MdLiveHelp, MdNotifications, MdWork } from "react-icons/md";
import { RiLuggageCartFill } from "react-icons/ri";
import { GiSuitcase } from 'react-icons/gi';



const EngineeringSideBar = ({active, setActive}: SideBarNav) => {
    const router = useRouter()
    

    function handleActive(item:any){
        setActive(item)
        sessionStorage.setItem('sideNav', item)
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
            <div className="w-full flex flex-col items-start justify-between admin-side-bar-cont shadow-md rounded-[3px] ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] px-[10px]">
                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Home</p>}
                    </span>
                    <span className={active === "taskManagement"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('taskManagement')}}>
                        <FaFileAlt size={21} /> 
                        <p className="text-[15.5px]">Task Management</p>
                    </span>
                    <span className={active === "project-status"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('project-status')}}>
                        <MdWork size={22} /> 
                        <p className="text-[16px]">All Projects</p>
                    </span>
                    <span className={active === "service-ticket"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('service-ticket')}}>
                        <IoTicket  size={21} />
                        <p className="text-[15.5px]">Service Ticket</p>
                    </span>
                    {/* <span className={active === "uploadDrawing"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('uploadDrawing')}}>
                        <MdAssignmentTurnedIn size={21} /> 
                        <p className="text-[15.5px]"> Drawing Upload</p>
                    </span>
                    
                    <span className={active === "reports"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('reports')}}>
                        <BiSolidReport size={21} /> 
                        <p className="text-[15.5px]">Reports</p>
                    </span> */}
                    <span className={active === "notification"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notification')}}>
                        <MdNotifications size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Notification</p>}
                    </span>
                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <IoSettingsSharp size={21} className='text-slate-800' />
                        {active !== "sales" && <p className="text-[15.5px]">Settings</p>}
                    </span>
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[10px] ">
                    <IoLogOutSharp size={21} />
                    {active !== "sales" && <p className="text-[15.5px] ">Logout</p>}
                </span>
            </div>
        </div>
    )
}

export default EngineeringSideBar