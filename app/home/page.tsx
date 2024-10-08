'use client'
import React, { useState, useEffect } from 'react'
import AdminDashboard from '../component/dashboardComponent/adminDashboard'
import SalesDashboard from '../component/salesDeptComponent/salesDashboard'
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

    useEffect(() => {
        const role = localStorage.getItem('user-role')

        // Trim the role to remove any leading/trailing whitespace
        const trimmedRole = role ? role.trim() : ''

        if (!trimmedRole || !['admin', 'super_admin', 'sales', 'customer', 'installer', 'permit', 'engineering', 'electrical', 'accounting'].includes(trimmedRole)) {
            // console.log('Redirecting due to invalid role:', trimmedRole)
            router.push('/auth/login')
        } else {
            // console.log('Valid role:', trimmedRole)
            setUserRole(trimmedRole)
        }
    }, [router])

    return (
        <div className="">
            {(userRole === 'admin' || userRole === 'super_admin') && <AdminDashboard />}
            {userRole === 'sales' && <SalesDashboard />}
            {userRole === 'permit' && <PermitPortalDashboard />}
            {userRole === 'customer' && <CustomerDashboard />}
            {userRole === 'installer' && <InstallerDashboard />}
            {userRole === 'engineering' && <EngineeringDashboard />}
            {userRole === 'electrical' && <ElecricalDashbaord />}
            {userRole === 'accounting' && <AccountingDashboard />}
        </div>
    )
}

export default Dashboard
