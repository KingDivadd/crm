'use cleient'
import React, {useState, useEffect} from 'react'
import { IoList } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { RiInstallFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { HiMiniQueueList } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import { GiChart } from "react-icons/gi";
import { BsBriefcase } from "react-icons/bs";
import { GiLightningSpanner } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { LuPencilRuler } from 'react-icons/lu';
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";

const SalesDashboardPage = () => {
    const router = useRouter()
    return (
        <div className="w-full p-[10px] pb-[10px]">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Lead</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-green-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Sales</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Conversion Rate</p>
                            <p className="text-sm font-semibold">75%</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Pending Tasks</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    
                    
                    
                </div>

                {/* second section = recent activity */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Recent Activities</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Activity Type</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Description</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">User</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Time</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Activity Type</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Description</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">User</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Date</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Time</p>
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

                {/* sales pipeline overview  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Sales Pipeline Overview</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Lead Name</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Stage</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Designer</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Appointment Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Next Action</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Peter Paker</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">New Lead</p> {/* new lead, contacted, quoted, sold, contract signed*/}
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Joe Biden</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 14, 2024</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Initiate Contract</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 text-blue-500 hover:underline ">View Details</p>
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

                {/* notification panel  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Notification Panel</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Type</p>
                            <p className="text-sm font-semibold w-[35%] pr-2 pl-2 ">Message</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Action</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">June 15, 2024 10:45AM</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Task Reminder</p>
                                        <p className="text-sm w-[35%] pr-2 pl-2 ">Follow up with ABC Corp</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Unread</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Mark as read</p>
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

                {/* Task overview  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Task Overview</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Task Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Assigned To</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Due Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Priority</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">HOA Approval for John Doe</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Marry Jane</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 16, 2024</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Completed</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">High</p>
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

                {/* Upcoming appointment  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Upcoming Appointment</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Designer</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Appointment Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Appointment Time</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Marry Jane</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">June 16, 2024</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">10:45AM</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Confirmed</p>
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
    )
}

export default SalesDashboardPage