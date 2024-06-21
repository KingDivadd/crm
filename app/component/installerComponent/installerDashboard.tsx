'use client'
import React, {useState, useEffect} from 'react'
import InstallerSideBar from './installerSidebar'
import InstallerNavbar from './installerNavbar'
import InstallerHomePage from './installerHomePage'
import JobListPage from './jobListPage'
import ServiceTicketPage from './serviceTickets'



const InstallerDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "") {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full bg-red-100 ">
                <InstallerSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
                <InstallerNavbar />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">
                    {active === "home" && <InstallerHomePage /> }
                    {active === "job-list" && <JobListPage /> }
                    {active === "service-ticket" && <ServiceTicketPage /> }
                    
                </div>
            </div>
        </div>
    )
}

export default InstallerDashboard