'use client'
import React, {useState, useEffect} from 'react'
import { FiLogOut } from "react-icons/fi";
import { SideBarNav } from '../../../types/index';
import {useRouter} from 'next/navigation'
import { RiDashboardFill } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
import { MdNotifications } from "react-icons/md";
import { RiTicket2Fill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa6";
import { RiFolderUploadFill } from "react-icons/ri";
import { MdDescription } from "react-icons/md";
import { BsCalendar2WeekFill } from "react-icons/bs";



const ElectricalSidebar = ({active, setActive}:SideBarNav) => {
    const router = useRouter()
    

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
        <div className="w-full h-[100vh] flex flex-col items-start justify-start bg-gray-100 ">
            {/* sidebar nav */}
            <div className="w-full flex flex-row items-center justify-start h-[50px] bg-blue-700 pl-[20px] border-b border-gray-100 ">
                <span className="flex flex-row items-center justify-start">
                    <p className="text-xl font-semibold text-white ">SBD</p>
                </span>
            </div>
            {/* sidebar items */}
            <div className="w-full h-[600px]  flex flex-col items-start justify-between admin-side-bar-cont  ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] pl-[10px] pr-[10px]">
                    <span className={active === "dashboard"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('dashboard')}}>
                        <RiDashboardFill size={22} />
                        <p className="text-[17px]">Dashboard</p>
                    </span>
                    <span className={active === "taskNotification"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('taskNotification')}}>
                        <MdNotifications size={24} /> 
                        <p className="text-[17px]">Task Notificaitions</p>
                    </span>
                    <span className={active === "serviceTicket"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('serviceTicket')}}>
                        <RiTicket2Fill size={22} /> 
                        <p className="text-[17px]"> Service Tickets</p>
                    </span>
                    <span className={active === "invoices"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('invoices')}}>
                        <FaFileInvoice size={21} /> 
                        <p className="text-[17px]">Invoices</p>
                    </span>
                    <span className={active === "photoUpload"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('photoUpload')}}>
                        <RiFolderUploadFill size={22} /> 
                        <p className="text-[17px]">Photo Upload</p>
                    </span>
                   
                    {/* <span className={active === "calender"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('calender')}}>
                        <BsCalendar2WeekFill size={20} /> 
                        <p className="text-[17px]">Calender</p>
                    </span>
                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <FaGear size={21} /> 
                        <p className="text-[17px]">Settings</p>
                    </span> */}
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[30px] ">
                    <FiLogOut size={25} />
                    <p className="text-lg">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default ElectricalSidebar