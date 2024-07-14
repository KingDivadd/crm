
'use client'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '../component/dashboardComponent/adminDashboard'
import SalesDashboard from '../component/salesDeptComponent/salesDashboard'
import OpsDashboard from "../component/opsDeptComponent/opsDashboard"
import CustomerDashboard from "../component/customerComponent/customerDashboard"
import InstallerDashboard from "../component/installerComponent/installerDashboard"
import PermitPortalDashboard from "../component/permitRoleComponent/permitDashboard"
import { useRouter } from 'next/navigation'
import EngineeringDashboard from '../component/engineeringComponent/engineeringDashboard'
import ElecricalDashbaord from '../component/electricalComponent/electricalDashboard'
import AccountingDashboard from '../component/accountingComponent/accountingDashboard'

const Dashboard = () => {
    const router = useRouter()
    const [userRole, setUserRole] = useState('')

    useEffect(()=>{
        const role = sessionStorage.getItem('user-role')
        if (!role || role == '' || !['admin', 'sales', 'ops','customer', 'installer', 'permit', 'engineering', 'electrical', 'accounting'].includes(role)){
            router.push('/auth/login')
        }else{
            setUserRole(role)
        }
    },[])

    return (
        <div className="">
            {userRole === 'admin' && <AdminDashboard />  }
            {userRole === 'sales' && <SalesDashboard />  }
            {userRole === 'ops' && <OpsDashboard />  }
            {userRole === 'customer' && <CustomerDashboard />  }
            {userRole === 'installer' && <InstallerDashboard />  }
            {userRole === 'permit' && <PermitPortalDashboard />  }
            {userRole === 'engineering' && <EngineeringDashboard />  }
            {userRole === 'electrical' && <ElecricalDashbaord />  }
            {userRole === 'accounting' && <AccountingDashboard />  }

        </div>
    )
}

export default Dashboard