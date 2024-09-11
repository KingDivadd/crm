'use client'
import React, {useState, useEffect} from 'react'
import SalesSideBar from './salesSideBar'
import SalesDashboardPage from './salesDashboardPage'
import SalesLeadPage from './salesLeadPage'
import SalesJobsPage from './salesJobsPage'
import SalesTaskPage from './salesTaskPage'
import SalesReportPage from './salesReportPage'
import NotificationPage from '../notificationPage'
import SystemSettings from '../setting'
import DashboardNav from '../dashboardNav'
import PipelinePage from './pipelinePage'

const SalesDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('side_nav')
        if (item == null ) {
            setActive('dashboard')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full bg-red-100 ">
                <SalesSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "dashboard" && <SalesDashboardPage /> }
                    {active === "leads" && <SalesLeadPage /> }
                    {active === "jobs" && <SalesJobsPage /> }
                    {active === "pipeline" && <PipelinePage /> }
                
                    {/* {active === "reports" && <SalesReportPage /> } */}
                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }
                    
                </div>
            </div>
        </div>
    )
}

export default SalesDashboard