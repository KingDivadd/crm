'use client'
import React, {useState, useEffect} from 'react'
import {JobListNumber, JobListCustomerName, JobListInstallDates, JobListProjectDetails} from './installerHelpers'

const InstallerHomePage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    function viewProjectDetiail(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }


    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[25px] pt-[20px] ">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-centereen gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Jobs</p>
                            <p className="text-sm text-blue-600">15</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-lime-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Recent Jobs</p>
                            <p className="text-sm text-lime-600">3</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600">Pending Jobs Update</p>
                            <p className="text-sm text-amber-600">12</p>
                        </div>
                    </span>         
                </div>

                {/* Task notification*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Task Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-2 ">Notification ID</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Task Description</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Date Received</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list" onClick={()=> viewProjectDetiail(data)}>
                                        <p className="text-sm w-[20%] px-2 ">NOT1000{ind + 1}</p>
                                        <p className="text-sm w-[20%] px-2 ">JB1001{ind + 1}</p>
                                        <p className="text-sm w-[20%] px-2 ">New service ticket received</p>
                                        <p className="text-sm w-[20%] px-2 ">June 12, 2024</p>
                                        <p className="text-sm w-[20%] px-2 ">{ind % 2 == 1 ? "Pending" : "In Progress"}</p>
                                    </span>
                                )
                            })}
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-centereen bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
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

                {/* Job List*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Job List</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Job Number</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Customer Name </p>
                            <p className="text-sm font-semibold w-[30%] px-[10px] ">Install Dates</p>
                            <p className="text-sm font-semibold w-[30%] px-[10px] ">project Details</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[20%] flex flex-col items-start justify-center">
                                            <JobListNumber />
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-center">
                                            <JobListCustomerName />
                                        </span>
                                        <span className="w-[30%] flex flex-col items-start justify-center">
                                            <JobListInstallDates />
                                        </span>
                                        <span className="w-[30%] flex flex-col items-start justify-center">
                                            <JobListProjectDetails />
                                        </span>
                                    </span>
                                )
                            })}
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-centereen bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
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

                {/* Service Ticket */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Service Tickets</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] px-2 ">Ticket ID</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[30%] px-2 ">Description</p>
                            <p className="text-sm font-semibold w-[10%] px-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Date Created</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Date Due</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start " >
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] px-2 ">1002{ind + 1}</p>
                                        <p className="text-sm w-[15%] px-2 ">1002{ind + 1}</p>
                                        <p className="text-sm w-[30%] px-2 ">Inspection Fail - Reinspection Needed</p>
                                        <p className="text-sm w-[10%] px-2 ">{ind % 2 === 1 ? "In Progress":"Pending"}</p>
                                        <p className="text-sm w-[15%] px-2 ">June 21, 2024</p>
                                        <p className="text-sm w-[15%] px-2 ">June 30, 2024</p>
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

            {/* {showModal && <ViewProjectInfo showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />} */}
        </div>
    )
}

export default InstallerHomePage

