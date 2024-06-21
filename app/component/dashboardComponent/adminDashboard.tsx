'use client'
import React, {useState, useEffect} from 'react'
import DashboardNav from './dashboardNav'
import SideBar from './sideBar'
import AdminHome from './adminHome'
import UserManagement from './userManagement'
import ReportsAndAnalytics from './reportsAnalytics'
import AdminNotificationPage from './adminNotificationPage'
import AdminLogsPage from './adminLogsPage'
import AdminSystemSettings from'./adminSystemSettings'

const AdminDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "" || !['home', 'user-management', 'analytics', 'notifications', 'logs', 'system-settings'].includes(active)) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full bg-red-100 ">
                <SideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <AdminHome /> }
                    {active === "user-management" && <UserManagement /> }
                    {active === "analytics" && <ReportsAndAnalytics /> }
                    {active === "notifications" && <AdminNotificationPage /> }
                    {active === "logs" && <AdminLogsPage /> }
                    {active === "system-settings" && <AdminSystemSettings /> }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard