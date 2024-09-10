'use client'
import React, {useState, useEffect} from 'react'
import PermitRoleSidebar from './permitRoleSidebar'
import PermitRoleNavbar from './permitRoleNavbar'
import PermitHomePage from './permitHomePage'
import AllPermitPage from './allPermitPage'
import InspectionPage from './inspectionPage'
import PermitApprovalPage from './permitApprovalPage'
import PermitHistory from './permitHistoryPage'
import SystemSettings from '../setting'
import NotificationPage from '../notificationPage'
import DashboardNav from '../dashboardNav'
import TaskManagement from './taskManagementPage'



const PermitPortalDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "" || !['dashboard', 'all-permit', 'inspection', 'permit-approval', 'permit-history'].includes(item) ) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full  ">
                <PermitRoleSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "home" && <PermitHomePage /> }
                    {active === "all-permit" && <AllPermitPage /> }
                    {active === "inspection" && <InspectionPage /> }
                    {active === "taskManagement" && <TaskManagement /> }
                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }

                </div>
            </div>
        </div>
    )
}

export default PermitPortalDashboard