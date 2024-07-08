'use client'
import React, {useState, useEffect} from 'react'
import { FiLogOut } from "react-icons/fi";
import { SideBarNav } from '../../../types/index';
import {useRouter} from 'next/navigation'
import { FaTasks, FaTicketAlt  } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { FaFileAlt } from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { MdLiveHelp } from "react-icons/md";


const EngineeringSidebar = ({active, setActive}:SideBarNav) => {
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
                    <span className={active === "taskManagement"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('taskManagement')}}>
                        <FaFileAlt size={22} /> 
                        <p className="text-[17px]">Task Management</p>
                    </span>
                    <span className={active === "uploadDrawing"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('uploadDrawing')}}>
                        <MdAssignmentTurnedIn size={22} /> 
                        <p className="text-[17px]"> Drawing Upload</p>
                    </span>
                    <span className={active === "rfi"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('rfi')}}>
                        <MdLiveHelp size={22} /> 
                        <p className="text-[17px]">RFI</p>
                    </span>
                    <span className={active === "permit-history"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('permit-history')}}>
                        <RiHistoryFill size={22} /> 
                        <p className="text-[17px]">Project Management</p>
                    </span>
                    <span className={active === "permit-history"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('permit-history')}}>
                        <RiHistoryFill size={22} /> 
                        <p className="text-[17px]">Reports</p>
                    </span>
                    <span className={active === "permit-history"? "active-sidebar-navigation": "sidebar-navigation"} onClick={()=>{handleActive('permit-history')}}>
                        <RiHistoryFill size={22} /> 
                        <p className="text-[17px]">Settings</p>
                    </span>
                    
                </div>
                <span onClick={()=>{router.push('/auth/login')}} className="sidebar-logout-navigation  pl-[10px] mb-[30px] ">
                    <FiLogOut size={25} />
                    <p className="text-lg">Logout</p>
                </span>
            </div>
        </div>
    )
}

export default EngineeringSidebar