'use cleient'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import OpsWorkflowSection, {ProjectWorkFlowApproval, ProjectWorkFlowEngineering, ProjectWorkFlowInstallation, ProjectWorkFlowPermitApproval} from './opsWorkflowSection'
import SchedulingAndLogistics, { SchedulingAndLogisticData } from './opsSchedulingLogistic'

const OpsDashboardPage = () => {
    const router = useRouter()
    return (
        <div className="w-full p-[10px] pb-[10px]">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600 ">Total Projects</p>
                            <p className="text-sm text-blue-600 ">145</p>
                            <p className="text-sm font-light text-blue-600 ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-amber-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600 ">Projects in Progress</p>
                            <p className="text-sm text-amber-600 ">45</p>
                            <p className="text-sm font-light text-amber-600 ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600 ">Project Completed</p>
                            <p className="text-sm text-sky-600 ">65</p>
                            <p className="text-sm font-light text-sky-600 ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600 ">Pending Approval</p>
                            <p className="text-sm text-lime-600 ">50</p>
                            <p className="text-sm font-light text-lime-600 ">Last 30 days</p>
                        </div>
                    </span>
                    
                    
                    
                </div>

                {/* workflow section */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Project Workflow</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] px-[10px] ">HOA Approval</p>
                            <p className="text-sm font-semibold w-[25%] px-[10px] ">Engineering </p>
                            <p className="text-sm font-semibold w-[25%] px-[10px] ">Permit Approval</p>
                            <p className="text-sm font-semibold w-[25%] px-[10px] ">Installation</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[25%] flex flex-col items-start justify-betw">
                                            <ProjectWorkFlowApproval />
                                        </span>
                                        <span className="w-[25%] flex flex-col items-start justify-betw">
                                            <ProjectWorkFlowEngineering />
                                        </span>
                                        <span className="w-[25%] flex flex-col items-start justify-betw">
                                            <ProjectWorkFlowPermitApproval />
                                        </span>
                                        <span className="w-[25%] flex flex-col items-start justify-betw">
                                            <ProjectWorkFlowInstallation />
                                        </span>
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


                {/* Scheduling and Logistic */}

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Project Workflow</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[33%] px-[10px] ">Scheduled</p>
                            <p className="text-sm font-semibold w-[34%] px-[10px] ">In Progress </p>
                            <p className="text-sm font-semibold w-[33%] px-[10px] ">Completed</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[33%] flex flex-col items-start justify-betw">
                                            <SchedulingAndLogisticData date='June 10, 2024' team="Team A" task='Scheduled Installation' />
                                        </span>
                                        <span className="w-[34%] flex flex-col items-start justify-betw">
                                            <SchedulingAndLogisticData date='June 15, 2024' team='Team C' task='Engineering Review' />
                                        </span>
                                        <span className="w-[33%] flex flex-col items-start justify-betw">
                                            <SchedulingAndLogisticData date='June 17, 2024' team='Team F' task='HOA Approval' />
                                        </span>
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
                

                {/* <div className="w-full flex flex-col gap-4">
                    <p className="text-xl font-semibold">Approval Flow Tracking</p>
                    <ApprovalFlowTracking />
                </div> */}

                {/* Approval Flow tracking */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Approval Flow Trackings</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Project Name</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Approval Step</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Project Status</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Approval Date</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Responsible Team</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-[10px] h-[30px] ">Project Alpha</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Project Alpha</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Project Alpha</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-[10px] h-[30px] ">HOA</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Engineering</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Permit</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-[10px] h-[30px] ">Completed</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">In Progress</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Pending</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-[10px] h-[30px] ">June 12, 2024</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">N/A</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">N/A</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-[10px] h-[30px] ">HOA Team</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Engineering Team</p>
                                            <p className="text-sm  px-[10px] h-[30px] ">Permit Team</p>
                                        </span>
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

export default OpsDashboardPage