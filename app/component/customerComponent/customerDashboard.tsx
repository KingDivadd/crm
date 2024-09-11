'use client'
import React, {useState, useEffect} from 'react'
import CustomerSideBar from './customerSidebar'
import CustomerHomePage from './customerHomePage'
import ProjectStatusPage from './projectStatusPage'
import ServiceTicketPage from './serviceTicketPage'
import WarrantyPage from './warrantyPage'
import DashboardNav from '../dashboardNav'
import SystemSettings from '../setting'
import NotificationPage from '../notificationPage'
import PaymentPage from '../accountingComponent/paymentPage'


const CustomerDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('side_nav')
        
        if (item == null) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[240px] h-full ">
                <CustomerSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <CustomerHomePage /> }
                    {active === "payment" && <PaymentPage /> }
                    {active === "project-status" && <ProjectStatusPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    {active === "notifications" && <NotificationPage /> }
                    {active === "warranty" && <WarrantyPage /> }
                    {active === "system-settings" && <SystemSettings /> }
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard