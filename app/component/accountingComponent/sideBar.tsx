'use client'
import React, {useState, useEffect} from 'react'
import { RiFolderUploadFill, RiHome3Fill, RiMoneyDollarBoxFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaFileAlt, FaFileInvoice, FaTasks, FaUserTie } from "react-icons/fa";
import { IoLogOutSharp, IoStatsChartSharp, IoTicket } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import {SideBarNav} from '../../../types/index'
import { MdAssignmentTurnedIn, MdLiveHelp, MdNotifications, MdPhotoCamera, MdWork } from "react-icons/md";
import { BiSolidChart, BiLineChartDown, BiSolidReport } from 'react-icons/bi';



const AccountingSideBar = ({active, setActive}: SideBarNav) => {
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
        <div className="w-full h-[100vh] flex flex-col items-start justify-start bg-gray-100 ">
            {/* sidebar nav */}
            <div className="w-full flex flex-row items-center justify-start h-[50px] bg-blue-700 pl-[20px] ">
                <span className="flex flex-row items-center justify-start">
                    <p className="text-xl font-semibold text-white">SBD</p>
                </span>
            </div>
            {/* sidebar items */}
            <div className="w-full h-[600px]  flex flex-col items-start justify-between admin-side-bar-cont ">
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-[50px] pl-[10px] pr-[10px]">
                    <span className={active === "home"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('home')}}>
                        <RiHome3Fill size={21} />
                        <p className="text-[15.5px]">Home</p>
                    </span>
                    <span className={active === "profit&loss"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('profit&loss')}}>
                        <RiMoneyDollarBoxFill size={21} /> 
                        <p className="text-[15.5px]">Profit & Loss</p>
                    </span>
                    <span className={active === "averageCostPerPage"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('averageCostPerPage')}}>
                        <RiMoneyDollarCircleFill size={21} /> 
                        <p className="text-[15.5px]"> Cost Per Project</p>
                    </span>
                    <span className={active === "profitMargin"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('profitMargin')}}>
                        <BiSolidChart size={21} /> 
                        <p className="text-[15.5px]">Profit Margin</p>
                    </span>
                    <span className={active === "loss"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('loss')}}>
                        <BiLineChartDown size={21} /> 
                        <p className="text-[15.5px]">Loss</p>
                    </span>
                    <span className={active === "bills&report"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('bills&report')}}>
                        <BiSolidReport size={21} /> 
                        <p className="text-[15.5px]">Bills/Invoices</p>
                    </span>
                    <span className={active === "payroll"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('payroll')}}>
                        <RiMoneyDollarBoxFill size={21} /> 
                        <p className="text-[15.5px]">Payroll</p>
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

export default AccountingSideBar