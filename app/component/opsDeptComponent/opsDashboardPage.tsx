'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import OpsWorkflowSection, {ProjectWorkFlowApproval, ProjectWorkFlowEngineering, ProjectWorkFlowInstallation, ProjectWorkFlowPermitApproval} from './opsWorkflowSection'
import { SchedulingAndLogisticData } from './opsSchedulingLogistic'

interface Dashboard_Props {
    total_lead?: number, converted_lead?:number, total_job?:number, total_task?:number, recent_lead?:any, recent_tasks?:any, recent_notifications?:any
}

const OpsDashboardPage = () => {
    const router = useRouter()
    const [dash_components, setDash_components] = useState<Dashboard_Props | null>(null)

    return (
        <div className="w-full p-[10px] pb-[10px]">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px] relative ">
                    <span className="absolute h-[145px] bg-blue-700 -top-[10px] -left-[10px] rounded-b-[3px] " style={{width: 'calc(100% + 20px)'}}></span>
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] w-1/4 group bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md">Total Lead</p>
                            <p className="text-sm ">{dash_components?.total_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>

                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Tasks</p>
                            <p className="text-sm ">{dash_components?.total_task?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>

                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Install</p>
                            <p className="text-sm ">{dash_components?.total_task?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Sale</p>
                            <p className="text-sm ">{dash_components?.total_job?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                                    
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Task</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Task ID</p>
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Job ID</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Desription</p>
                            <p className="text-sm font-normal w-[12.5%] px-2 ">Status</p>
                            <p className="text-sm font-normal w-[17.5%] px-2 ">Assigned To</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Start Date</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">End Date</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Completion Date</p>
                        </span>
                        
                        {dash_components !== null ? 
                        
                        <div className="w-full h-[250px] flex flex-col justify-start items-start overflow-y-auto">

                            {dash_components?.recent_tasks.length ?
                            <>
                            {dash_components?.recent_tasks.map((data:any, ind:any)=>{

                                const {task_ind, job, description, assigned_to, created_by, start_date, due_date, completion_date, status,  } = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[7.5%] px-2 ">{task_ind} </p>
                                        <p className="text-sm w-[7.5%] px-2 ">{job.job_ind} </p>
                                        <p className="text-sm w-[20%] px-2 "> {description} </p>
                                        <p className="text-sm w-[12.5%] px-2 "> {status} </p>
                                        <p className="text-sm w-[17.5%] px-2 "> {assigned_to} </p>
                                        <p className="text-sm w-[10%] px-2 "> {start_date} </p>
                                        <p className="text-sm w-[10%] px-2 "> {due_date} </p>
                                        <p className="text-sm w-[15%] px-2 "> {completion_date} </p>
                                    </span>
                                )
                            })}
                            </>:
                            <div className="w-full h-[250px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Task yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[250px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.recent_tasks.length}</p>
                            </span>
                        </span>
                    </div>
                </div>
               

                {/* Approval Flow tracking */}
                <div className="w-full min-h-[150px] flex flex-col gap-[10px]">
                    <p className="text-md font-medium">Approval Flow Trackings</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[20%] px-2 ">Project Name</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Approval Step</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Project Status</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Approval Date</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Responsible Team</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-2 h-[30px] ">Project Alpha</p>
                                            <p className="text-sm  px-2 h-[30px] ">Project Alpha</p>
                                            <p className="text-sm  px-2 h-[30px] ">Project Alpha</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-2 h-[30px] ">HOA</p>
                                            <p className="text-sm  px-2 h-[30px] ">Engineering</p>
                                            <p className="text-sm  px-2 h-[30px] ">Permit</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-2 h-[30px] ">Completed</p>
                                            <p className="text-sm  px-2 h-[30px] ">In Progress</p>
                                            <p className="text-sm  px-2 h-[30px] ">Pending</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-2 h-[30px] ">June 12, 2024</p>
                                            <p className="text-sm  px-2 h-[30px] ">N/A</p>
                                            <p className="text-sm  px-2 h-[30px] ">N/A</p>
                                        </span>
                                        <span className="w-[20%] flex flex-col items-start justify-betw">
                                            <p className="text-sm  px-2 h-[30px] ">HOA Team</p>
                                            <p className="text-sm  px-2 h-[30px] ">Engineering Team</p>
                                            <p className="text-sm  px-2 h-[30px] ">Permit Team</p>
                                        </span>
                                    </span>
                                )
                            })}
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.recent_notifications.length || 0}</p>
                            </span>
                        </span>
                    </div>
                </div>

                

            </div>
        </div>
    )
}

export default OpsDashboardPage