'use client'
import React, {useState, useEffect} from 'react'
import { RiHome3Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaTicketAlt, } from "react-icons/fa";
import { IoLogOutSharp, IoSettingsSharp, IoTicketSharp } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import {SideBarNav} from '../../../types/index'
import { MdNotifications, MdVerifiedUser, MdWork, } from 'react-icons/md';



const CustomerSideBar = ({active, setActive}: SideBarNav) => {
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
            <div className="w-full flex flex-col bg-red-200 items-start justify-between admin-side-bar-cont shadow-md rounded-[3px]  ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] px-[10px]">
                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} />
                        <p className="text-[16px]">Home</p>
                    </span>
                    <span className={active === "project-status"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('project-status')}}>
                        <MdWork size={22} /> 
                        <p className="text-[16px]">All Projects</p>
                    </span>
                    <span className={active === "service-ticket"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('service-ticket')}}>
                        <IoTicketSharp  size={21} />
                        <p className="text-[16px]">Service Ticket</p>
                    </span>
                    <span className={active === "payment"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('payment')}}>
                        <RiMoneyDollarBoxFill size={21} /> 
                        <p className="text-[15.5px]">Payments </p>
                    </span>
                    <span className={active === "notifications"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('notifications')}}>
                        <MdNotifications size={21} />
                        <p className="text-[16px]">Notifications</p>
                    </span>
                    {/* <span className={active === "warranty"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('warranty')}}>
                        <MdVerifiedUser size={21} />
                        <p className="text-[16px]">Warranty</p>
                    </span> */}
                    <span className={active === "system-settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('system-settings')}}>
                        <IoSettingsSharp size={21} />
                        <p className="text-[16px]">System Settings</p>
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

export default CustomerSideBar