'use client'
import React, {useState, useEffect} from 'react'
import SideBar from './sideBar'
import AdminHome from './adminHome'
import UserManagement from './userManagement'
import ReportsAndAnalytics from './reportsAnalytics'
import AdminNotificationPage from './adminNotificationPage'
import AdminLogsPage from './adminLogsPage'
import AdminSystemSettings from'./adminSystemSettings'
import NotificationPage from '../notificationPage'
import DashboardNav from '../dashboardNav'
import SalesLeadPage from '../salesDeptComponent/salesLeadPage'
import SalesJobsPage from '../salesDeptComponent/salesJobsPage'
import ProjectStatusPage from '../customerComponent/projectStatusPage'
import TaskManagement from './taskManagementPage'

const AdminDashboard = () => {
    const [active, setActive] = useState('')

    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null){
            setActive('home')
            return;
        }
        setActive(item)
        // if (item == null || item == "" || !['home', 'user-management', 'analytics', 'notifications', 'logs', 'system-settings'].includes(active)) {
        //     setActive('home')
        // }else{
        //     setActive(item)
        // }
        console.log(item);
        
    }, [])




    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[250px] h-full">
                <SideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <AdminHome /> }
                    {active === "user-management" && <UserManagement /> }
                    {active === "leads" && <SalesLeadPage /> }
                    {active === "jobs" && <SalesJobsPage /> }
                    {active === "project-status" && <ProjectStatusPage /> }
                    
                    {active === "notifications" && <NotificationPage /> }
                    {/* {active === "logs" && <AdminLogsPage /> } */}
                    {active === "system-settings" && <AdminSystemSettings /> }
                    {active === "taskManagement" && <TaskManagement /> }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard