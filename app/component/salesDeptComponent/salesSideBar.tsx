'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutSharp, IoStatsChartSharp } from "react-icons/io5";
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
import { HiMiniLink } from "react-icons/hi2";




const SalesSideBar = ({active, setActive}: SideBarNav) => {
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
                    <span className={active === "dashboard"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('dashboard')}}>
                        <RiHome8Fill size={21} className='text-slate-800' />
                        <p className="text-[16px]">Home</p>
                    </span>
                    <span className={active === "leads"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('leads')}}>
                        <FaUserTag size={21} className='text-slate-800' /> 
                        <p className="text-[16px]">Leads</p>
                    </span>
                    <span className={active === "jobs"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('jobs')}}>
                        <GiSuitcase size={21} className='text-slate-800' />
                        <p className="text-[16px]">Jobs</p>
                    </span>
                    <span className={active === "pipeline"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('pipeline')}}>
                        <HiMiniLink size={21} className='text-slate-800' />
                        <p className="text-[16px]">Pipeline</p>
                    </span>
                    {/* <span className={active === "reports"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('reports')}}>
                        <BiSolidReport size={21} className='text-slate-800' />
                        <p className="text-[16px]">Reports</p>
                    </span> */}
                    <span className={active === "notification"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notification')}}>
                        <RiNotificationBadgeFill size={21} className='text-slate-800' />
                        <p className="text-[16px]">Notification</p>
                    </span>
                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <IoSettingsSharp size={21} className='text-slate-800' />
                        <p className="text-[16px]">Settings</p>
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

export default SalesSideBar