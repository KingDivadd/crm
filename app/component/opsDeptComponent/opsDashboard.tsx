'use client'
import React, {useState, useEffect} from 'react'
import OpsSideBar from './opsSideBar'
import OpsDashboardPage from './opsDashboardPage'
import OpsLeadsPage from './opsLeadsPage'
import OpsSalesPage from './opsSalesPage'
import OpsTaskPage from './opsTaskPage'
import OpsInstallsPage from './opsInstallsPage'
import OpsReportPage from './opsReportPage'
import OpsUserTrackingPage from './opsUserTrackingPage'
import SystemSettings from '../setting'
import NotificationPage from '../notificationPage'
import DashboardNav from '../dashboardNav'
import SalesLeadPage from '../salesDeptComponent/salesLeadPage'
import SalesJobsPage from '../salesDeptComponent/salesJobsPage'

const OpsDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('salesSideNav')
        if (item == null || item == "" || !['home', 'leads','jobs', 'sales', 'tasks', 'install','reports','notification', 'user-tracking','settings'].includes(item) ) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className={active == "sales"?"w-[80px] h-full ": "w-[250px] h-full "}>
                <OpsSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <OpsDashboardPage /> }
                    {active === "leads" && <SalesLeadPage /> }
                    {active === "sales" && <OpsSalesPage /> }
                    {active === "jobs" && <SalesJobsPage /> }
                    {active === "tasks" && <OpsTaskPage /> }
                    {active === "installs" && <OpsInstallsPage /> }
                    {active === "reports" && <OpsReportPage /> }
                    {active === "notification" && <NotificationPage /> }
                    {active === "user-tracking" && <OpsUserTrackingPage /> }
                    {active === "settings" && <SystemSettings /> }
                    
                </div>
            </div>
        </div>
    )
}

export default OpsDashboard