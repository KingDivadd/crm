
'use client'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '../component/dashboardComponent/adminDashboard'
import SalesDashboard from '../component/salesDeptComponent/salesDashboard'

const Dashboard = () => {
    const [userRole, setUserRole] = useState('admin')
    return (
        <div className="">
            {/* {userRole === 'admin' && <AdminDashboard />  } */}
            {userRole === 'admin' && <SalesDashboard />  }

        </div>
    )
}

export default Dashboard