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
import { get_auth_request } from '@/app/api/admin_api';
import Alert from '../alert';
import { timestamp_to_readable_value } from '../helper';

interface Sales_Dashboard_Props {
    total_lead?: number, converted_lead?:number, total_job?:number, total_task?:number, recent_lead?:any, recent_tasks?:any, recent_notifications?:any
}

const SalesDashboardPage = () => {

    const [alert, setAlert] = useState({message: '', type: ''})
    const [dash_components, setDash_components] = useState<Sales_Dashboard_Props | null>(null);

    useEffect(() => {
        get_sales_dashboard_data()
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_sales_dashboard_data() {

        try {
            const response = await get_auth_request(`sales/sales-main-dashboard`)
            
    
            if (response.status == 200 || response.status == 201){
                
                setDash_components(response.data)      
    
                console.log( 'sales data 1 ',response.data);
                
            }else{
                console.log(response);
                
                showAlert(response.response.data.err, "error")
            }
            
        } catch (err:any) {
            
            showAlert('Something went wrong while fetching data', "error")
        }
        
    }
    

    const router = useRouter()
    return (
        <div className="w-full p-[10px] pb-[10px] relative">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>

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
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Converted Lead</p>
                            <p className="text-sm ">{dash_components?.converted_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Job</p>
                            <p className="text-sm ">{dash_components?.total_job?.toLocaleString() || 0}</p>
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
                    
                                    
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-blue-700 text-white rounded-t-[3.5px]  ">
                            <p className="text-sm w-[15%] px-2  ">Date / Time</p>
                            <p className="text-sm w-[20%] px-2  ">Subject</p>
                            <p className="text-sm w-[32.5%] px-2  ">Details</p>
                            <p className="text-sm w-[15%] px-2  ">Status</p>
                            <p className="text-sm w-[17.5%] px-2  ">Source</p>
                        </span>
                        
                        
                        {dash_components !== null ? <div className="w-full h-[250px] flex flex-col justify-start items-start">
                           
                            {dash_components?.recent_notifications.length ? 
                            <>
                            {dash_components?.recent_notifications.map((data:any, ind:any)=>{

                                const {created_at, subject, message, read, user, source, } = data
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className="text-sm w-[20%] px-2 ">{subject}</p>
                                        <p className="text-sm w-[32.5%] px-2 ">{message}</p>
                                        <p className={read ? "text-sm w-[15%] text-green-600 px-2 ":"text-sm w-[15%] px-2 text-red-600 "}>{read ? "read": "unread"}</p>
                                        <p className="text-sm w-[17.5%] px-2 ">{source.last_name} {source.first_name} </p>
                                    </span>
                                )
                            })}
                            </> 
                            :
                            <div className="w-full h-[250px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Notifications yet</p>
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
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.recent_notifications.length}</p>
                            </span>
                        </span>
                    </div>
                </div>
                
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Lead</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[15%] px-2 ">Lead Id</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Customer Name</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Customer Address</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Phone Number</p>
                            <p className="text-sm font-normal w-[20%] px-2 ">Assigned to</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Disposition</p>
                        </span>
                        
                        {dash_components != null ? 
                        <div className="w-full h-[250px] flex flex-col justify-start items-start">
                            {dash_components?.recent_lead.length ? <>
                            {dash_components?.recent_lead.map((data:any, ind:any)=>{

                                const {customer_name, address, phone_number, email, user_role, assigned_to, disposition, lead_ind} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[15%] px-2 ">{lead_ind}</p>
                                        <p className="text-sm w-[20%] px-2 ">{customer_name}</p>
                                        <p className="text-sm w-[20%] px-2 ">{address}</p>
                                        <p className="text-sm w-[15%] px-2 ">{phone_number}</p>
                                        <p className="text-sm w-[20%] px-2 ">{assigned_to.last_name} {assigned_to.first}</p>
                                        <p className="text-sm w-[10%] px-2 ">{disposition}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[250px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Lead yet</p>
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
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.recent_lead.length}</p>
                            </span>
                        </span>
                    </div>
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
                        
                        <div className="w-full h-[250px] flex flex-col justify-start items-start">

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
                

            </div>
        </div>
    )
}

export default SalesDashboardPage