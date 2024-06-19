'use client'
import React, {useState, useEffect} from 'react'
import OpsSideBar from './opsSideBar'
import OpsDashboardNav from './opsDashboardNav'
import OpsDashboardPage from './opsDashboardPage'
import OpsLeadsPage from './opsLeadsPage'
import OpsSalesPage from './opsSalesPage'
import OpsInstallsPage from './opsInstallsPage'
import OpsReportPage from './opsReportPage'
import OpsUserTrackingPage from './opsUserTrackingPage'
import OpsSettingsPage from './opsSettingsPage'
import OpsNotificationPage from './opsNotificationPage'

const OpsDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('salesSideNav')
        if (item == null || item == "" || !['home', 'leads', 'sales', 'install','reports','notification', 'user-tracking','settings'].includes(item) ) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className={active == "sales"?"w-[80px] h-full ": "w-[280px] h-full "}>
                <OpsSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <OpsDashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <OpsDashboardPage /> }
                    {active === "leads" && <OpsLeadsPage /> }
                    {active === "sales" && <OpsSalesPage /> }
                    {active === "installs" && <OpsInstallsPage /> }
                    {active === "reports" && <OpsReportPage /> }
                    {active === "notification" && <OpsNotificationPage /> }
                    {active === "user-tracking" && <OpsUserTrackingPage /> }
                    {active === "settings" && <OpsSettingsPage /> }
                    
                </div>
            </div>
        </div>
    )
}

export default OpsDashboard