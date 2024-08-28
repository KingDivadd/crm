'use client'
import React, {useState, useEffect} from 'react'
import ElectricalSidebar from './sideBar'
import ElectricalDashboardPage from './elecricalDashboardPage'
import TaskNotificationPage from './taskNotification'
import InvoicePage from './invoices'
import TaskManagement from './taskManagementPage'
import DashboardNav from '../dashboardNav'
import ProjectStatusPage from '../customerComponent/projectStatusPage'
import ServiceTicketPage from '../customerComponent/serviceTicketPage'
import PhotoUpload from '../installerComponent/photoUpload'
import NotificationPage from '../notificationPage'
import SystemSettings from '../setting'

const ElecricalDashbaord = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "" || !['home', 'taskNotificaition', 'serviceTicket', 'invoices', 'photoUpload', 'taskManagement'].includes(item)) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full  ">
                <ElectricalSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "home" && <ElectricalDashboardPage /> }
                    {active === "taskNotification" && <TaskNotificationPage /> }
                    {active === "project-status" && <ProjectStatusPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    {active === "invoices" && <InvoicePage /> }
                    {active === "photo-upload" && <PhotoUpload /> }
                    {active === "taskManagement" && <TaskManagement /> }
                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }

                </div>
            </div>
        </div>
    )
}

export default ElecricalDashbaord