'use client'
import React, {useState, useEffect} from 'react'
import { FiLogOut } from "react-icons/fi";
import { SideBarNav } from '../../../types/index';
import {useRouter} from 'next/navigation'
import { FaTasks  } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidChart } from "react-icons/bi";
import { BiLineChartDown } from "react-icons/bi";
import { IoLogOutSharp } from 'react-icons/io5';




const AccountingSideBar = ({active, setActive}:SideBarNav) => {
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
                    <span className={active === "profit&loss"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('profit&loss')}}>
                        <RiMoneyDollarBoxFill size={22} /> 
                        <p className="text-[17px]">Profit & Loss</p>
                    </span>
                    <span className={active === "averageCostPerPage"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('averageCostPerPage')}}>
                        <RiMoneyDollarCircleFill size={22} /> 
                        <p className="text-[17px]"> Avarage Cost Per Project</p>
                    </span>
                    <span className={active === "profitMargin"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('profitMargin')}}>
                        <BiSolidChart size={23} /> 
                        <p className="text-[17px]">Profit Margin</p>
                    </span>
                    <span className={active === "loss"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('loss')}}>
                        <BiLineChartDown size={22} /> 
                        <p className="text-[17px]">Loss</p>
                    </span>
                    <span className={active === "bills&report"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('bills&report')}}>
                        <BiSolidReport size={23} /> 
                        <p className="text-[17px]">Bills/Invoices</p>
                    </span>
                    <span className={active === "payroll"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('payroll')}}>
                        <RiMoneyDollarBoxFill size={23} /> 
                        <p className="text-[17px]">Payroll</p>
                    </span>
                    {/* <span className={active === "reports"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('reports')}}>
                        <BiSolidReport size={23} /> 
                        <p className="text-[17px]">Calendar Integration</p>
                    </span> */}
                    <span className={active === "settings"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('settings')}}>
                        <FaGear size={21} /> 
                        <p className="text-[17px]">Settings</p>
                    </span>
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[30px] ">
                    <IoLogOutSharp size={25} />
                    <p className="text-lg">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default AccountingSideBar