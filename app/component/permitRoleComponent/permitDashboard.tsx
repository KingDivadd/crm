'use client'
import React, {useState, useEffect} from 'react'
import PermitRoleSidebar from './permitRoleSidebar'
import PermitRoleNavbar from './permitRoleNavbar'
import PermitHomePage from './permitHomePage'
import AllPermitPage from './allPermitPage'
import InspectionPage from './inspectionPage'
import PermitApprovalPage from './permitApprovalPage'
import PermitHistory from './permitHistoryPage'



const PermitPortalDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "") {
            setActive('dashboard')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full  ">
                <PermitRoleSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <PermitRoleNavbar />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "dashboard" && <PermitHomePage /> }
                    {active === "all-permit" && <AllPermitPage /> }
                    {active === "inspection" && <InspectionPage /> }
                    {active === "permit-approval" && <PermitApprovalPage /> }
                    {active === "permit-history" && <PermitHistory /> }

                </div>
            </div>
        </div>
    )
}

export default PermitPortalDashboard