'use client';
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import SalesAnalyticsBarChart from './stackedBarChart'
import { useRouter } from 'next/navigation'

const AdminLogsPage = () => {
    const router = useRouter()
    const [showTab, setShowTab] = useState(false)
    return (
        <div className="w-full relative p-[10px] ">
            <div className="w-full h-[5px] flex top-[10px] right-[10px] flex justify-end sticky">
                {!showTab ? 
                <span className="w-[100px] h-[40px] flex items-center justify-center rounded-[3px] border border-blue-500 cursor-pointer text-blue-500 bg-white hover:bg-blue-600 hover:text-white" onClick={()=>{setShowTab(!showTab)}}>
                    <p className="text-sm  " >Show Tab</p> 
                </span>
                : 
                <div className="w-[330px] h-[460px] rounded-[5px] border border-blue-500 bg-white flex flex-col justify-start items-start gap-5 p-[10px] ">
                    <span className="w-full flex flex-row justify-between items-center h-[35px]">
                        <p className="text-md font-semibold">Reports and Analytics Tabs</p>
                        <span className="w-[100px] h-[40px] flex items-center justify-center rounded-[3px] border border-red-500 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white" onClick={()=>{setShowTab(!showTab)}}>
                            <p className="text-md  cursor-pointer">hide</p>
                        </span>
                    </span>
                    <div className="w-full h-full flex flex-col justify-start items-start gap-3 ">
                        {analyticsTab.map((data, ind)=>{
                            const {item, id} = data
                            return (
                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                    <p className="text-sm ">{ind + 1}.</p>
                                    <p className="text-sm hover:underline hover:text-blue-500 cursor-pointer " onClick={()=>{router.push(`#${id}`); setShowTab(false)}} >{item}</p>
                                </span>
                            )
                        })}
                    </div>
                </div>}
            </div>

            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">

                {/* User Activity Logs */}
                <div id="financialReport" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">User Activity Logs</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]  ">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">User</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Action</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Date - Time</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Details</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">User Role</p>
                                </span>
                            </span>
                            <div className="w-full min-h- flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">John Doe</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Login</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">11-06-2024 08:15</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Successful Login</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Technician</p>
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

                {/* System Logs*/}
                <div id="serviceTicketResolutionTime" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">System Logs </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Update Type</p>
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Description</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Timestamp</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Performed By</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">System Status (Before / After)</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[22.5%] pr-2 pl-2 ">Notification</p> 
                                            <p className="text-sm w-[25%] pr-2 pl-2 ">Email Notification sent</p> 
                                            <p className="text-sm w-[17.5%] pr-2 pl-2  ">June 11, 2024, 09:45AM</p> 
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">System</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-lime-500">Stable/Stable</p> 
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


                {/* Data Access Logs */}
                <div id="leadManagementMatrics" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Data Access Logs</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Data Accessed</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Action</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Timestamp</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">User</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Role</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Details</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">Lead Data</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">View</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">June 11, 2024, 10:45AM</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Peter Parker</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Operations</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">View Lead LD0012</p>  {/* this should be a url*/}
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
                    {/* sales analytics */}
                </div>

                {/* User activity report matrics */}
                <div id="userActivityReport" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">User Activity Report Matrics</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">User Name</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Login Time</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Logout Time</p>
                                    <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Duration</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Action Performed</p>
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Date - Time</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Details</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">08-06-2024 - 09:00</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">08-06-2024 - 17:00</p>
                                            <p className="text-sm w-[10%] pr-2 pl-2 ">8 hours</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">{(ind % 2 ) === 1 ? "Created new lead" : "Updated project status"}</p>
                                            <p className="text-sm w-[12.%] pr-2 pl-2 ">08-06-2024 - 09:00</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Lead ID: 123, Customer: John Doe</p>
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
                    {/* sales analytics */}
                </div>

                {/* Installation completion matrics */}
                <div id="installationCompletionMatrics" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Installation Completion Matrics</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Installation Id</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Project Id</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Phase</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Shart Date</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">End Date</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">INST000{ind + 1}</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">PROJ000{ind + 1}</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Footing</p> {/* set post,set post, demo */}
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">8 hours</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">{(ind % 2 ) === 1 ? "Created new lead" : "Updated project status"}</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Not Started</p>
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
                    {/* sales analytics */}
                </div>

                {/* Technical perfomance matrics */}
                <div id='technicianPerformanceMatrics' className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Technician Performance Matrics</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Technician Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Technician Name</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Job Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Completion Time</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Quality Score (%)</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">TCH001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">JOB001{ind}</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">2 hours</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">85</p>
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
                    {/* sales analytics */}
                </div>

                {/* Inventory levels */}
                <div id="inventoryLevels" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Inventory Levels </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Material Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Material Name</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Quantity Available</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Quantity Ordered</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Reorder Level</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">MAT001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Wooden Pallet</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">200</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">195</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">85</p>  {/* find out what reorder level is*/}
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
                    {/* sales analytics */}
                </div>

                {/* Order fufilment */}
                <div id="orderFulfilmentMatrics" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Order Fulfilment Matrics </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Order Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Material Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Order Date</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Delivery Date</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Status</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">ORD001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">MAT001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">09-06-2024</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">14-06-2024</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-lime-500 ">Delivered</p> 
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
                    {/* sales analytics */}
                </div>

                {/* Employee Attendance */}
                <div id='employeeAttendance' className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Employee Attandance </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Employee Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Employee Name</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Date</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Status</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Hours Worked</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">EMP001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">09-06-2024</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-red-600 ">Absent</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-lime-500 ">0</p> 
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
                    {/* sales analytics */}
                </div>

                 {/* Employee Performance */}
                <div id="employeePerformance" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Employee Performance </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Employee Id</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Employee Name</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Role</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Performance Score (%) </p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Last Review Date</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">EMP001{ind}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Technician</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-red-600 ">75</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 text-lime-500 ">June 13, 2024</p> 
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
                    {/* sales analytics */}
                </div>

                 {/* Payroll request */}
                <div id="payrollReport" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Payroll Report </p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Employee Id</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Employee Name</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Role</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Salary ($)</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Payment Date</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">EMP001{ind}</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">Iroegbu David</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Finance</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">12,550</p> 
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">May 31, 2024</p> 
                                            <p className="text-sm w-[15%] pr-2 pl-2 text-lime-500 ">Paid</p> 
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
                    {/* sales analytics */}
                </div>
            </div>
        </div>
    )
}

export default AdminLogsPage

export const analyticsTab = [{item: 'Financial Report', id: 'financialReport'}, {item: 'Sales Analytics', id: 'salesAnalytics'}, {item: 'Service Ticket Resolution Time', id: 'serviceTicketResolutionTime'}, {item: 'Lead Management Matrics', id: 'leadManagementMatrics'}, {item: 'User Activity Report Matrics', id: 'userActivityReport'}, {item: 'Installation Completion Matrics', id: 'installationCompletionMatrics'}, {item: 'Technician Performance Matrics', id: 'technicianPerformanceMatrics'}, {item: 'Inventory Levels', id: 'inventoryLevels'}, {item: 'Order Fulfilment Matrics', id: 'orderFulfilmentMatrics'}, {item: 'Employee Attendance', id: 'employeeAttendance'}, {item: 'Employee Performance', id: 'employeePerformance'}, {item: 'Payroll Report', id: 'payrollReport'},     ]