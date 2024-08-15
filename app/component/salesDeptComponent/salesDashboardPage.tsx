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
import { Sales_Dashboard_Props } from '@/types';

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
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] w-1/4 border border-blue-700 group bg-blue-700 shadow-md">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md text-white">Total Lead</p>
                            <p className="text-sm text-white">{dash_components?.total_lead || 0}</p>
                            <p className="text-sm font-light text-white">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-green-600  w-1/4  bg-green-700 shadow-md">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md text-white">Total Sales</p>
                            <p className="text-sm text-white">{dash_components?.total_sales || 0}</p>
                            <p className="text-sm font-light text-white">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px]  w-1/4  bg-sky-600 shadow-md">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md text-white">Conversion Rate</p>
                            <p className="text-sm text-white">{(dash_components?.conversion_rate != null) ? `${dash_components?.conversion_rate } %` : `0 %`}</p>
                            <p className="text-sm font-light text-white">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-amber-600 rounded-[5px] bg-amber-600 w-1/4  shadow-md">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md text-white">Pending Tasks</p>
                            <p className="text-sm text-white">{dash_components?.pending_task || 0}</p>
                            <p className="text-sm font-light text-white">Last 30 days</p>
                        </div>
                    </span>
                    
                                    
                </div>

                {/* second section = recent activity */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md">Recent Activities</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start  rounded-t-[4px] border-b border-gray-200 bg-blue-600 text-white">
                            <p className="text-sm w-[15%] px-2 ">Activity Id</p>
                            <p className="text-sm w-[15%] px-2 ">User</p>
                            <p className="text-sm w-[15%] px-2 ">Action</p>
                            <p className="text-sm w-[25%] px-2 ">Details</p>
                            <p className="text-sm w-[15%] px-2 ">Job Id</p>
                            <p className="text-sm w-[15%] px-2 ">Time</p>
                        </span>
                        {dash_components?.recent_activities.length ? 
                        
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {dash_components?.recent_activities.map((data:any, ind:number)=>{
                                
                                const {activity_id, user,  action, details, job_id, updated_at, created_at } = data
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] px-2 ">{activity_id}</p>
                                        <p className="text-sm w-[15%] px-2 ">{user.other_names || user.first_name}</p>
                                        <p className="text-sm w-[15%] px-2 ">{action}</p>
                                        <p className="text-sm w-[25%] px-2 ">{details}</p>
                                        <p className="text-sm w-[15%] px-2 ">{job_id}</p>
                                        <p className="text-sm w-[15%] px-2 ">{updated_at}</p>
                                    </span>
                                )
                            })}
                        </div>
                        :
                        <div className="w-full h-[200px] flex flex-col justify-center items-center">
                            <p className="text-sm ">No Activity yet</p>
                        </div>
                        
                        }
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-slate-500 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                </span>
                                <p className="text-sm  cursor-pointer">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm ">Showing 1-15 of {dash_components?.recent_activities.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* sales pipeline overview  */}

                {/* notification panel  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[4px] border-b border-blue-600 bg-blue-600 text-white">
                            <p className="text-sm w-[12.5%] px-2 ">Task Type</p>
                            <p className="text-sm w-[35%] px-2 ">Message</p>
                            <p className="text-sm w-[12.5%] px-2 ">Status</p>
                            <p className="text-sm w-[12.5%] px-2 ">User</p>
                            <p className="text-sm w-[12.5%] px-2 ">Due Date</p>
                            <p className="text-sm w-[15%] px-2 ">Time</p>
                        </span>
                        
                        {dash_components?.recent_notifications.length ? <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {dash_components?.recent_notifications.map((data:any, ind:any)=>{

                                const {message, task_type, due_date, task_notification_status, user, created_at, updated_at} = data

                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[12.5%] px-2  ">{task_type}</p>
                                        <p className="text-sm w-[35%] px-2  ">{message || 'Send proposal to Client B'}</p>
                                        <p className="text-sm w-[12.5%] px-2  ">{task_notification_status}</p>
                                        <p className="text-sm w-[12.5%] px-2  ">{user.other_names || user.first_name }</p>
                                        <p className="text-sm w-[12.5%] px-2  ">{due_date}</p>
                                        <p className="text-sm w-[15%] px-2  ">{updated_at}</p>
                                    </span>
                                )
                            })}
                        </div>
                        :
                        <div className="w-full h-[200px] flex flex-col justify-center items-center">
                            <p className="text-sm ">No Notifications yet</p>
                        </div>
                         }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-slate-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.recent_notifications.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* Task overview  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Tasks</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[6px] border-b-2 bg-blue-600 text-white ">
                            <p className="text-sm w-[15.0%] px-2 ">Title</p>
                            <p className="text-sm w-[22.5%] px-2 ">Description</p>
                            <p className="text-sm w-[12.5%] px-2 ">Status</p>
                            <p className="text-sm w-[12.5%] px-2 ">Priority</p>
                            <p className="text-sm w-[12.5%] px-2 ">Assigned To</p>
                            <p className="text-sm w-[12.5%] px-2 ">Due Date</p>
                            <p className="text-sm w-[12.5%] px-2 ">Created on</p>
                        </span>

                        {dash_components?.recent_tasks.length ?
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {dash_components?.recent_tasks.map((data:any, ind:number)=>{
                                
                                const {title, description, status, priority, assigned_to, due_date, created_at} = data

                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15.0%] px-2 ">{title}</p>
                                        <p className="text-sm w-[22.5%] px-2 ">{description}</p>
                                        <p className="text-sm w-[12.5%] px-2 ">{status}</p>
                                        <p className="text-sm w-[12.5%] px-2 ">{priority}</p>
                                        <p className="text-sm w-[12.5%] px-2 ">{assigned_to.other_names || assigned_to.first_name}</p>
                                        <p className="text-sm w-[12.5%] px-2 ">{due_date}</p>
                                        <p className="text-sm w-[12.5%] px-2 ">{created_at}</p>
                                    </span>
                                )
                            })}
                        </div>
                        :
                        <div className="w-full h-[200px] flex flex-col justify-center items-center">
                            <p className="text-sm">No Recent Task</p>
                        </div>
                        }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-slate-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                </span>
                                <p className="text-sm cursor-pointer">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-15 of {dash_components?.recent_tasks.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                

            </div>
        </div>
    )
}

export default SalesDashboardPage