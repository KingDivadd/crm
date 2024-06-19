'use client'
import React, {useState, useEffect} from 'react'

const OpsReportPage = () => {
    const [reportType, setReportType] = useState('')

    useEffect(() => {
        let item = sessionStorage.getItem('reportType')
        if (!item || item == null || !['project', 'financial', 'performance'].includes(item)){
            setReportType('project')
        }else{
            setReportType(item)
        }
    }, [])

    function handleReportType(data:string) {
        console.log(data)
        setReportType(data)
        sessionStorage.setItem('reportType', data)
    }

    return (
        <div className="w-full p-[10px] ">
            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                {/* Project Report */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Project Report</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Project Name</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Start Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Completion Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Total Cost</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Profit Margin</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Project Alpha</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">{ind % 2 === 1 ? "Completed":"In Progress"}</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 12, 2024</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">June 15, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">$50,000</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">20%</p>
                                    </span>
                                )
                            })}
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
                                <p className="text-sm">Showing 1-5 of 60</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* Financial Report */}
                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                    <p className="text-xl font-semibold">Financial Report</p>
                    <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Monthly Profit/Loss</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[40%] pr-2 pl-2 ">Month</p>
                                    <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Profit</p>
                                    <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Loss</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[40%] pr-2 pl-2 ">January</p>
                                                <p className="text-sm w-[30%] pr-2 pl-2 ">$50,000</p>
                                                <p className="text-sm w-[30%] pr-2 pl-2 ">$15,000</p>
                                            </span>
                                        )
                                    })}
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
                                        <p className="text-sm">Showing 1-5 of 60</p>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Average Cost Per Project Type</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[50%] pr-2 pl-2 ">Project Type</p>
                                    <p className="text-sm font-semibold w-[50%] pr-2 pl-2 ">Average Cost</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[50%] pr-2 pl-2 ">{ind % 2 === 1 ? "Residential": "Commercial" }</p>
                                                <p className="text-sm w-[50%] pr-2 pl-2 ">$20,000</p>
                                            </span>
                                        )
                                    })}
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
                                        <p className="text-sm">Showing 1-5 of 60</p>
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Performance Report */}
                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                    <p className="text-xl font-semibold">Performance Report</p>
                    <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Team Efficiency</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[40%] pr-2 pl-2 ">Team</p>
                                    <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Efficiency (%)</p>
                                    <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Task Completed</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[40%] pr-2 pl-2 ">Team {ind + 1}</p>
                                                <p className="text-sm w-[30%] pr-2 pl-2 ">75</p>
                                                <p className="text-sm w-[30%] pr-2 pl-2 ">14{ind}</p>
                                            </span>
                                        )
                                    })}
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
                                        <p className="text-sm">Showing 1-5 of 60</p>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Task Completed by Team</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[32.5%] pr-2 pl-2 ">Task Type</p>
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Team A</p>
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Team B</p>
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Team C</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[32.5%] pr-2 pl-2 ">{ind % 2 === 1 ? "Installations": "Inspections" }</p>
                                                <p className="text-sm w-[22.5%] pr-2 pl-2 ">40</p>
                                                <p className="text-sm w-[22.5%] pr-2 pl-2 ">55</p>
                                                <p className="text-sm w-[22.5%] pr-2 pl-2 ">47</p>
                                            </span>
                                        )
                                    })}
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
                                        <p className="text-sm">Showing 1-5 of 60</p>
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default OpsReportPage