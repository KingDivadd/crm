'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaFileAlt, FaUserTag, FaUserTie } from "react-icons/fa";
import { IoLogOutSharp, IoStatsChartSharp } from "react-icons/io5";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiSolidNotepad } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { SideBarNav } from '@/types';
import {useRouter} from 'next/navigation'
import { MdNotifications, MdWork } from "react-icons/md";
import { GiSuitcase } from 'react-icons/gi';
import { HiMiniLink } from 'react-icons/hi2';
import { PiLinkSimpleBold } from 'react-icons/pi';


const SideBar = ({active, setActive}:SideBarNav) => {
    const router = useRouter()
    

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
                    <span className={active === "user-management"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('user-management')}}>
                        <FaUserTie size={21} /> 
                        <p className="text-[15.5px]">User Management</p>
                    </span>
                    <span className={active === "leads"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('leads')}}>
                        <FaUserTag size={21} className='text-slate-800' /> 
                        <p className="text-[15.5px]">Leads</p>
                    </span>
                    <span className={active === "jobs"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('jobs')}}>
                        <GiSuitcase size={21} className='text-slate-800' />
                        <p className="text-[15.5px]">Jobs</p>
                    </span>
                    <span className={active === "project-status"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('project-status')}}>
                        <MdWork size={22} /> 
                        <p className="text-[15.5px]">All Projects</p>
                    </span>
                    <span className={active === "pipeline"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('pipeline')}}>
                        <PiLinkSimpleBold  size={22} /> 
                        <p className="text-[15.5px]">Pipeline</p>
                    </span>
                    <span className={active === "taskManagement"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('taskManagement')}}>
                        <FaFileAlt size={21} /> 
                        <p className="text-[15.5px]">Task Management</p>
                    </span>

                    <span className={active === "notifications"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notifications')}}>
                        <MdNotifications size={21} />
                        <p className="text-[15.5px]">Notifications</p>
                    </span>
                    {/* <span className={active === "logs"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('logs')}}>
                        <BiSolidNotepad size={21} />
                        <p className="text-[15.5px]">Logs</p>
                    </span> */}
                    <span className={active === "system-settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('system-settings')}}>
                        <IoSettingsSharp size={21} />
                        <p className="text-[15.5px]">System Settings</p>
                    </span>
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[10px] ">
                    <IoLogOutSharp size={21} />
                    <p className="text-[15.5px]">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default SideBar