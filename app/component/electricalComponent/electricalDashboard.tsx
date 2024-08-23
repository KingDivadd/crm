'use client'
import React, {useState, useEffect} from 'react'
import ElectricalSidebar from './sideBar'
import ElectricalNav from './navBar'
import ElectricalDashboardPage from './elecricalDashboardPage'
import TaskNotificationPage from './taskNotification'
import ServiceTicketPage from './serviceTicket'
import InvoicePage from './invoices'
import PhotoUpload from './photoUpload'
import TaskManagement from './taskManagementPage'

const ElecricalDashbaord = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "" || !['dashboard', 'taskNotificaition', 'serviceTicket', 'invoices', 'photoUpload', 'taskManagement'].includes(item)) {
            setActive('dashboard')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full  ">
                <ElectricalSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <ElectricalNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "dashboard" && <ElectricalDashboardPage /> }
                    {active === "taskNotification" && <TaskNotificationPage /> }
                    {active === "serviceTicket" && <ServiceTicketPage /> }
                    {active === "invoices" && <InvoicePage /> }
                    {active === "photoUpload" && <PhotoUpload /> }
                    {active === "taskManagement" && <TaskManagement /> }

                </div>
            </div>
        </div>
    )
}

export default ElecricalDashbaord