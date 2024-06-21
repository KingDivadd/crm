
'use client'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '../component/dashboardComponent/adminDashboard'
import SalesDashboard from '../component/salesDeptComponent/salesDashboard'
import OpsDashboard from "../component/opsDeptComponent/opsDashboard"
import CustomerDashboard from "../component/customerComponent/customerDashboard"
import InstallerDashboard from "../component/installerComponent/installerDashboard"

const Dashboard = () => {
    const [userRole, setUserRole] = useState('admin')
    return (
        <div className="">
            {/* {userRole === 'admin' && <AdminDashboard />  } */}
            {/* {userRole === 'admin' && <SalesDashboard />  } */}
            {/* {userRole === 'admin' && <OpsDashboard />  } */}
            {/* {userRole === 'admin' && <CustomerDashboard />  } */}
            {userRole === 'admin' && <InstallerDashboard />  }

        </div>
    )
}

export default Dashboard