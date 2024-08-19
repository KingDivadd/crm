'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaTasks, FaTicketAlt, FaUserTie } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiSolidNotepad } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserTag } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { PiClipboardTextFill } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";
import {SideBarNav} from '../../../types/index'
import { GiSuitcase } from "react-icons/gi";
import { RiHome8Fill } from "react-icons/ri";
import { MdNotifications, MdVerifiedUser } from 'react-icons/md';



const CustomerSideBar = ({active, setActive}: SideBarNav) => {
    const router = useRouter()
    

    useEffect(() => {
        const item = sessionStorage.getItem('salesSideNav')
        if (item == null || item == ""){
            setActive('home')
        }else {
            setActive(item)
        }
    }, [])

    function handleActive(item:any){
        setActive(item)
        sessionStorage.setItem('salesSideNav', item)
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
            <div className="w-full h-[600px]  flex flex-col items-start justify-between admin-side-bar-cont ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] pl-[10px] pr-[10px] ">
                <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} />
                        <p className="text-[16px]">Home</p>
                    </span>
                    <span className={active === "project-status"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('project-status')}}>
                        <FaTasks size={22} /> 
                        <p className="text-[16px]">Project Status</p>
                    </span>
                    <span className={active === "service-ticket"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('service-ticket')}}>
                        <FaTicketAlt  size={21} />
                        <p className="text-[16px]">Service Ticket</p>
                    </span>
                    <span className={active === "notifications"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notifications')}}>
                        <MdNotifications size={21} />
                        <p className="text-[16px]">Notifications</p>
                    </span>
                    <span className={active === "warranty"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('warranty')}}>
                        <MdVerifiedUser size={21} />
                        <p className="text-[16px]">Warranty</p>
                    </span>
                    <span className={active === "system-settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('system-settings')}}>
                        <IoSettingsSharp size={21} />
                        <p className="text-[16px]">System Settings</p>
                    </span>
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[30px] ">
                    <FiLogOut size={21} className='text-slate-800' />
                    <p className="text-[16px]">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default CustomerSideBar