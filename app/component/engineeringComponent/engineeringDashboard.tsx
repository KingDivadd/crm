'use client'
import React, {useState, useEffect} from 'react'
import EngineeringNav from './engineeringNav'
import EngineeringSidebar from './engineeringSidebar'
import EngineeringDashboardPage from './engineeringDashboardPage'
import TaskManagement from './taskManagement'
import UploadDrawingPage from './uploadDrawing'
import EngineeringRFI from './engineeringRfi'


const EngineeringDashboard = () => {
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
                <EngineeringSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <EngineeringNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "dashboard" && <EngineeringDashboardPage /> }
                    {active === "taskManagement" && <TaskManagement /> }
                    {active === "uploadDrawing" && <UploadDrawingPage /> }
                    {active === "rfi" && <EngineeringRFI /> }

                </div>
            </div>
        </div>
    )
}

export default EngineeringDashboard