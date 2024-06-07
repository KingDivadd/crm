'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiSolidNotepad } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { SideBarNav } from '@/types';

const SideBar = ({active, setActive}:SideBarNav) => {
    

    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == ""){
            setActive('home')
        }else {
            setActive(item)
        }
    }, [])

    function handleActive(item:any){
        setActive(item)
        sessionStorage.setItem('sideNav', item)
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-start justify-start bg-white ">
            {/* sidebar nav */}
            <div className="w-full flex flex-row items-center justify-start h-[50px] bg-blue-700 pl-[20px] ">
                <span className="flex flex-row items-center justify-start">
                    <p className="text-xl font-semibold text-white">SBD</p>
                </span>
            </div>
            {/* sidebar items */}
            <div className="w-full h-[600px]  flex flex-col items-start justify-between relative ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] pl-[10px] pr-[10px] ">
                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={23} />
                        <p className="text-[17px]">Home</p>
                    </span>
                    <span className={active === "user-management"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('user-management')}}>
                        <FaUserTie size={23} />
                        <p className="text-[17px]">User Management</p>
                    </span>
                    <span className={active === "analytics"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('analytics')}}>
                        <IoStatsChartSharp size={23} />
                        <p className="text-[17px]">Reports and Analytics</p>
                    </span>
                    <span className={active === "notifications"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notifications')}}>
                        <RiNotificationBadgeFill size={23} />
                        <p className="text-[17px]">Notifications</p>
                    </span>
                    <span className={active === "logs"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('logs')}}>
                        <BiSolidNotepad size={23} />
                        <p className="text-[17px]">Logs</p>
                    </span>
                    <span className={active === "system-settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('system-settings')}}>
                        <IoSettingsSharp size={23} />
                        <p className="text-[17px]">System Settings</p>
                    </span>
                </div>
                <span className="sidebar-logout-navigation absolute top-0 pl-[10px]">
                    <FiLogOut size={25} />
                    <p className="text-lg">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default SideBar