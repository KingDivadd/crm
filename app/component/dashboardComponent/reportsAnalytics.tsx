import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import SalesAnalyticsBarChart from './stackedBarChart'

const ReportsAndAnalytics = () => {
    return (
        <div className="w-full p-[10px] ">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">

                <div className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Financial Report</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-t-[5px] ">
                            <span className="w-full h-[45px] flex flex-col items-start justify-start bg-white rounded-t-[3px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[5px] rounded-t-[3px] bg-blue-600"></span>
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white  border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Period</p>
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Total Revenue ($)</p>
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Total Expenses ($)</p>
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Net Profit ($)</p>
                                </span>
                            </span>
                            <div className="w-full min-h- flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[25%] pr-2 pl-2 ">June 2024</p>
                                            <p className="text-sm w-[25%] pr-2 pl-2 ">90,000</p>
                                            <p className="text-sm w-[25%] pr-2 pl-2 ">50,000</p>
                                            <p className="text-sm w-[25%] pr-2 pl-2 ">40,000</p>
                                        </span>
                                    )
                                })}
                            </div>
                    </div>
                    {/* sales analytics */}
                </div>

                <div className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Sales Analytics</p>
                    <div className="w-full min-h-[250px] flex flex-col bg-white rounded-t-[5px] ">
                        <SalesAnalyticsBarChart />
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Lead Management Metrics</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-t-[5px] ">
                            <span className="w-full h-[45px] flex flex-col items-start justify-start bg-white rounded-t-[3px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[5px] rounded-t-[3px] bg-green-600"></span>
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white  border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Lead Source</p>
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Lead ID</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Lead Name</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Contact Info</p>
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Assigned To</p>
                                    <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Status</p>
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Creation Date</p>
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Last Contact Date</p>
                                </span>
                            </span>
                            <div className="w-full min-h- flex flex-col justify-start items-start">
                                {[1,2,3,4,5,7,6,6,6,6,].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[10%] pr-2 pl-2 ">{(ind % 2 ) === 1 ? "Website" : "Referral"}</p>
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">100{ind}</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">irg.dge@gmail.com</p>
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">Sales Rep 1</p>
                                            <p className="text-sm w-[10%] pr-2 pl-2 ">{(ind % 2 ) === 1 ? "Contacted" : "Qualified"}</p>
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">June 12, 2024</p>
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">June 12, 2024</p>
                                        </span>
                                    )
                                })}
                            </div>
                    </div>
                    {/* sales analytics */}
                </div>
                
            </div>
        </div>
    )
}

export default ReportsAndAnalytics