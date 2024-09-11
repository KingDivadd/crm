'use client'
import React, {useState, useEffect} from 'react'
import InstallerSideBar from './installerSidebar'
import InstallerNavbar from './installerNavbar'
import InstallerHomePage from './installerHomePage'
import JobListPage from './jobListPage'
import PhotoUpload from './photoUpload'
import BillSheetPage from './billSheetPage'
import ReportsPage from './reportsPage'
import Image from 'next/image'
import DashboardNav from '../dashboardNav'
import SystemSettings from '../setting'
import NotificationPage from '../notificationPage'
import ServiceTicketPage from '../customerComponent/serviceTicketPage'



const InstallerDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null ) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full  ">
                <InstallerSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <InstallerHomePage /> }
                    {active === "job-list" && <JobListPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    {active === "photo-upload" && <PhotoUpload /> }
                    {active === "bill-sheet" && <BillSheetPage /> }
                    {active === "report" && <ReportsPage /> }
                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }
                    
                </div>
            </div>
        </div>
    )
}

export default InstallerDashboard