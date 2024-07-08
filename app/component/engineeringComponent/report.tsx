'use client'
import React, {useState, useEffect} from 'react'

const ReportPage = () => {
    const [show, setShow] = useState(false)
    const [reportType, setReportType] = useState('')

    useEffect(() => {
        const item = sessionStorage.getItem('report-type')
        if (!item || item == null || !['taskReport', 'projectReport', 'rfiReport'].includes(item)){
                setReportType('taskReport')
        }else{
            setReportType('taskReport')
        }
    }, [])
    


    function changeReport(item:string) {
        setReportType(item)
        sessionStorage.setItem('report-type',item)
        
    }


    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[25px] pt-[0px] ">
                {/* summary tabs */}
                <span className="w-full h-[50px] flex flex-row items-center justify-between ">
                    <button className={reportType == 'taskReport' ? 'active-report-btn-style' : 'report-btn-style'} onClick={()=>changeReport('taskReport')} >Task Report</button>
                    <button className={reportType == 'projectReport' ? 'active-report-btn-style' : 'report-btn-style'} onClick={()=>changeReport('projectReport')} >Project Report</button>
                    <button className={reportType == 'rfiReport' ? 'active-report-btn-style' : 'report-btn-style'} onClick={()=>changeReport('rfiReport')} >RFI Report</button>
                </span>

               {reportType == 'taskReport' && 
                
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-lg font-semibold">Task List</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[50%] px-2 ">Task Description</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Assigned Date</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                        </span>
                        <div className="w-full engineering-cont-2 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full  flex flex-col justify-start items-start ">
                                {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" >
                                            <p className="text-sm w-[50%] px-2 "> Permit Application Review</p>
                                            <p className="text-sm w-[25%] px-2 ">June 11, 2024</p>
                                            <p className="text-sm w-[25%] px-2 ">Pending Approval</p>
                                        </span>
                                    )
                                })}
                            </span>
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">2</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">3</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">4</p>

                                </span>
                                <p className="text-sm cursor-pointer">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-10 of 60</p>
                            </span>
                        </span>
                    </div>
                </div>}

                {reportType == 'projectReport' &&

                    <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                        <p className="text-lg font-semibold">Project Report</p>

                        <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <p className="text-sm font-semibold w-[25%] px-2 ">Project Name</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">Start Date</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">End Date</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                            </span>
                            <div className="w-full engineering-cont-2 flex flex-col justify-start items-start overflow-y-auto">
                                <span className="w-full  flex flex-col justify-start items-start ">
                                    {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list" >
                                                <p className="text-sm w-[25%] px-2 "> Project A</p>
                                                <p className="text-sm w-[25%] px-2 ">June 11, 2024</p>
                                                <p className="text-sm w-[25%] px-2 ">June 11, 2024</p>
                                                <p className="text-sm w-[25%] px-2 ">In Progress</p>
                                            </span>
                                        )
                                    })}
                                </span>
                            </div>
                            <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
                                <span className="flex flex-row items-center justify-start gap-3 h-full">
                                    <p className="text-sm cursor-pointer">Prev</p>
                                    <span className="w-auto h-full flex flex-row items-center justify-start">
                                        <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">2</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">3</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">4</p>

                                    </span>
                                    <p className="text-sm cursor-pointer">Next</p>
                                </span>
                                <span className="flex flex-row items-center justify-end gap-3 h-full">
                                    <p className="text-sm">Showing 1-10 of 60</p>
                                </span>
                            </span>
                        </div>
                    </div>

                }

                {reportType == 'rfiReport' &&

                    <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                        <p className="text-lg font-semibold">RFI Report</p>

                        <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <p className="text-sm font-semibold w-[25%] px-2 ">RFI ID</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">Project Name</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">Request Date</p>
                                <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                            </span>
                            <div className="w-full engineering-cont-2 flex flex-col justify-start items-start overflow-y-auto">
                                <span className="w-full  flex flex-col justify-start items-start ">
                                    {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list" >
                                                <p className="text-sm w-[25%] px-2 "> RF1000123</p>
                                                <p className="text-sm w-[25%] px-2 ">Project A</p>
                                                <p className="text-sm w-[25%] px-2 ">July 6, 2024</p>
                                                <p className="text-sm w-[25%] px-2 ">Responded</p>
                                            </span>
                                        )
                                    })}
                                </span>
                            </div>
                            <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
                                <span className="flex flex-row items-center justify-start gap-3 h-full">
                                    <p className="text-sm cursor-pointer">Prev</p>
                                    <span className="w-auto h-full flex flex-row items-center justify-start">
                                        <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">2</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">3</p>
                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">4</p>

                                    </span>
                                    <p className="text-sm cursor-pointer">Next</p>
                                </span>
                                <span className="flex flex-row items-center justify-end gap-3 h-full">
                                    <p className="text-sm">Showing 1-10 of 60</p>
                                </span>
                            </span>
                        </div>
                    </div>

                }



            </div>
          

        </div>
    )
}

export default ReportPage