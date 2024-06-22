'use client'
import React, {useState, useEffect} from 'react'
import CustomerSideBar from './customerSidebar'
import CustomerDashboardNav from './customerNavBar'
import CustomerHomePage from './customerHomePage'
import ProjectStatusPage from './projectStatusPage'
import ServiceTicketPage from './serviceTicketPage'
import NotificationPage from './notificationPage'
import WarrantyPage from './warrantyPage'
import SettingsPage from './settingsPage'



const CustomerDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "" || !['home', 'project-status', 'service-ticket', 'notifications', 'warranty', 'system-settings'].includes(active)) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full bg-red-100 ">
                <CustomerSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <CustomerDashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <CustomerHomePage /> }
                    {active === "project-status" && <ProjectStatusPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    {active === "notifications" && <NotificationPage /> }
                    {active === "warranty" && <WarrantyPage /> }
                    {active === "system-settings" && <SettingsPage /> }
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard