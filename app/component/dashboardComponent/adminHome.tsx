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

const AdminHome = () => {
    const router = useRouter()
    return (
        <div className="w-full p-[10px] pb-[10px] ">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] bg-white w-1/4 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Lead</p>
                            <p className="text-sm text-blue-600">450</p>
                            <p className="text-sm font-light text-blue-600">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-lime-700 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-700">Total Sales</p>
                            <p className="text-sm text-lime-700">450</p>
                            <p className="text-sm font-light text-lime-700">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600">Total Installations</p>
                            <p className="text-sm text-sky-600">450</p>
                            <p className="text-sm font-light text-sky-600">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-700">Total Projects</p>
                            <p className="text-sm text-lime-700">450</p>
                            <p className="text-sm font-light text-lime-700">Last 30 days</p>
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

                {/* quick access secion */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Quick Access</p>
                    <div className="w-full flex flex-wrap justify-start gap-[10px]">
                        <span className="w-[250px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GiChart size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">New Leads</p>
                                <p className="text-sm ">15 new leads</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>
                        
                        <span className="w-[250px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><BsBriefcase size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Pending Sales</p>
                                <p className="text-sm ">8 pending sales</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>
                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GiLightningSpanner size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Installations</p>
                                <p className="text-sm ">10 ongoing installations</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GrServices size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Service Tickets</p>
                                <p className="text-sm ">5 open service ticket</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><FaMoneyBillAlt size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Pending Payments</p>
                                <p className="text-sm ">10 pending payments</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><LuPencilRuler size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Engineerin Tasks</p>
                                <p className="text-sm ">5 tasks pending</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><MdOutlineNoteAlt size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Permits</p>
                                <p className="text-sm ">5 permits pending</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><RiBarChartFill size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-lg ">Accounting</p>
                                <p className="text-sm ">profit/loss details</p>
                                <p className="text-sm  hover:underline cursor-pointer " onClick={()=>{router.push('#')}}>View Detials</p>
                            </span>
                        </span>

                    </div>

                </div>

                {/* task notification */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Task Notification</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Task</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Assigned To</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Due Date</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className={ind === 2 ? "overdue-row":" recent-activity-table-list"}>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Follow up with client GHI</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Sales Rep B</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">June 12, 2024</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">{ind === 2 ? "Overdue" : "Pending"}</p>
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

export default AdminHome