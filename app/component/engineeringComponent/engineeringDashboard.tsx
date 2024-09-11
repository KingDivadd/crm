'use client'
import React, {useState, useEffect} from 'react'
import EngineeringSidebar from './engineeringSidebar'
import EngineeringDashboardPage from './engineeringDashboardPage'
import TaskManagement from './taskManagement'
import UploadDrawingPage from './uploadDrawing'
import ReportPage from './report'
import NotificationPage from '../notificationPage'
import SystemSettings from '../setting'
import DashboardNav from '../dashboardNav'
import ProjectStatusPage from '../customerComponent/projectStatusPage'
import ServiceTicketPage from '../customerComponent/serviceTicketPage'


const EngineeringDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full  ">
                <EngineeringSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "home" && <EngineeringDashboardPage /> }
                    {active === "taskManagement" && <TaskManagement /> }
                    {active === "project-status" && <ProjectStatusPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    {active === "uploadDrawing" && <UploadDrawingPage /> }
                    {active === "reports" && <ReportPage /> }
                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }

                </div>
            </div>
        </div>
    )
}

export default EngineeringDashboard