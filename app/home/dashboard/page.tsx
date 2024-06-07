'use client'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '../../component/dashboardComponent/adminDashboard'

const Dashboard = () => {
    const [userRole, setUserRole] = useState('admin')
    return (
        <div className="">
            {userRole === 'admin' && <AdminDashboard />  }
        </div>
    )
}

export default Dashboard