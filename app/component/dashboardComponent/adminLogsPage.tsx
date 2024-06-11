'use client';
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import SalesAnalyticsBarChart from './stackedBarChart'
import { useRouter } from 'next/navigation'
import { adminLogTabs } from '@/constants';

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
                <div className="w-[330px] h-[230px] rounded-[5px] border border-blue-500 bg-white flex flex-col justify-start items-start gap-5 p-[10px] ">
                    <span className="w-full flex flex-row justify-between items-center h-[35px]">
                        <p className="text-md font-semibold">Admin Logs Tabs</p>
                        <span className="w-[100px] h-[40px] flex items-center justify-center rounded-[3px] border border-red-500 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white" onClick={()=>{setShowTab(!showTab)}}>
                            <p className="text-md  cursor-pointer">hide</p>
                        </span>
                    </span>
                    <div className="w-full h-full flex flex-col justify-start items-start gap-3 ">
                        {adminLogTabs.map((data, ind)=>{
                            const {title, id} = data
                            return (
                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                    <p className="text-sm ">{ind + 1}.</p>
                                    <p className="text-sm hover:underline hover:text-blue-500 cursor-pointer " onClick={()=>{router.push(`#${id}`); setShowTab(false)}} >{title}</p>
                                </span>
                            )
                        })}
                    </div>
                </div>}
            </div>

            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">

                {/* User Activity Logs */}
                <div id="userActivity" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
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
                <div id="systemLogs" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
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
                <div id="dataAccessLogs" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
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

                {/* API Access Logs*/}
                <div id="apiAccessLogs" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">API Access Logs</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">API Endpoint</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Response Status</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Timestamp</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">User/Service</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Data Transferred</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Request Duration</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">/sales/1234</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">200</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">June 13, 2024, 10:30AM</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">John Doe</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">Sales Data</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">120ms</p>
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

                {/* Audit Logs */}
                <div id="auditLogs" className="w-full h-auto flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-xl font-semibold">Audit Logs</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                            <span className="w-full h-[40px] flex flex-col items-start justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px]">
                                    <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Change Type</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Affected Entities</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Timestamp</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Performed By</p>
                                    <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Previous Value</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">New Value</p>
                                </span>
                            </span>
                            <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                {[1,2,3,4,5].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list">
                                            <p className="text-sm w-[12.5%] pr-2 pl-2 ">Update</p>
                                            <p className="text-sm w-[17.5%] pr-2 pl-2 ">Lead #12345</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">June 13, 2024 09:45AM</p> {/* set post,set post, demo */}
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">John Doe</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">Status: Open</p>
                                            <p className="text-sm w-[15%] pr-2 pl-2 ">Status: Closed</p>
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
