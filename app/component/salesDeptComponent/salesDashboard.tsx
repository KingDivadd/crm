'use client'
import React, {useState, useEffect} from 'react'
import SalesSideBar from './salesSideBar'
import SalesDashboardNav from './salesDashboardNav'
import SalesDashboardPage from './salesDashboardPage'
import SalesLeadPage from './salesLeadPage'
import SalesJobsPage from './salesJobsPage'
import SalesPipeline from './salesPipeline'
import SalesTaskPage from './salesTaskPage'
import SalesReportPage from './salesReportPage'
import SalesSystemSettings from './salesSettingsPage'
import SalesNotificationPage from './salesNotificationPage'

const SalesDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('salesSideNav')
        if (item == null || item == "") {
            setActive('dashboard')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full bg-red-100 ">
                <SalesSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <SalesDashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "dashboard" && <SalesDashboardPage /> }
                    {active === "leads" && <SalesLeadPage /> }
                    {active === "sales-pipeline" && <SalesPipeline /> }
                    {active === "jobs" && <SalesJobsPage /> }
                    {active === "tasks" && <SalesTaskPage /> }
                    {active === "reports" && <SalesReportPage /> }
                    {active === "notification" && <SalesNotificationPage /> }
                    {active === "settings" && <SalesSystemSettings /> }
                    
                </div>
            </div>
        </div>
    )
}

export default SalesDashboard