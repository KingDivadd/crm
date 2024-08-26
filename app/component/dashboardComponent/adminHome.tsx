'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { GiChart } from "react-icons/gi";
import { BsBriefcase } from "react-icons/bs";
import { GiLightningSpanner } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { LuPencilRuler } from 'react-icons/lu';
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { admin_dashboard_request, get_auth_request } from '@/app/api/admin_api';
import { Admin_dashboard_props } from '@/types';
import ShortCutModal from './shortCutModal';
import { timestamp_to_readable_value } from '../helper';

interface Sales_Dashboard_Props {
    total_lead?: number, converted_lead?:number, total_job?:number, total_task?:number, recent_lead?:any, recent_tasks?:any, recent_notifications?:any
}

interface Admin_Dashboard_Props {
    total_lead?:number, total_sale?:number, total_installation?:number, total_project?: number, recent_task?:any, recent_lead?:any, recent_project?:any, recent_payment?:any
}

const AdminHome = () => {
    const router = useRouter()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [dash_box, setDash_box] = useState<Admin_Dashboard_Props | null>(null);
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({title: '', item: []})


    useEffect(() => {

      get_admin_dashboard()

        // simulateDashboardData()
   
    }, [])
    

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_admin_dashboard() {     
        console.log('start fetching admin admin dashboad');
         

        const response = await get_auth_request('auth/admin-dashboard')

        if (response.status == 200 || response.status == 201){

            console.log(response.data);
        
            setDash_box(response.data)
        
            showAlert(response.data.msg, "success")

        }else{
            if (response){
                if (response.response.status == 402) {
                    setTimeout(() => {
                        router.push('auth/login')
                    }, 3000)
                }

                showAlert(response.response.data.err, "error")
            }
        }
          
      }

    function simulateDashboardData() {
        const simulatedData: Admin_dashboard_props = {
        total_number_of_leads: 50,
        total_number_of_sales: 20,
        total_number_of_installations: 15,
        total_number_of_projects: 30,
        total_number_of_recent_activities: 5,
        total_number_of_recent_activities_pages: 2, // Simulating 3 pages of activities
        activities: [],
        total_number_of_task_notifications_pages: 5,
        total_number_of_task_notification: 5,
        task_notification: [
            { details: 'Activity 1', user: { last_name: 'Doe' }, created_at: '2024-07-23', action: 'Action 1' },
            { details: 'Activity 2', user: { last_name: 'Smith' }, created_at: '2024-07-23', action: 'Action 2' },
            { details: 'Activity 3', user: { last_name: 'Johnson' }, created_at: '2024-07-23', action: 'Action 3' },
            { details: 'Activity 4', user: { last_name: 'Brown' }, created_at: '2024-07-23', action: 'Action 4' },
            { details: 'Activity 5', user: { last_name: 'Williams' }, created_at: '2024-07-23', action: 'Action 5' },
        ],
        msg: 'Dashboard data loaded successfully',
        // Include other properties as needed
        };
    
    }

    return (
        <div className="w-full p-[10px] pb-[10px] ">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px] relative ">
                    <span className="absolute h-[145px] bg-blue-700 -top-[10px] -left-[10px] rounded-b-[3px] " style={{width: 'calc(100% + 20px)'}}></span>
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] w-1/4 group bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md">Total Lead</p>
                            <p className="text-sm ">{dash_box?.total_lead || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Sales</p>
                            <p className="text-sm ">{dash_box?.total_sale || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Installations</p>
                            <p className="text-sm ">{dash_box?.total_installation || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>  
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Projects</p>
                            <p className="text-sm ">{dash_box?.total_project || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>                  
                </div>

                {/* Recent Lead */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Lead</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Lead Id</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Customer Name</p>
                            <p className="text-sm font-normal w-[17.5%] px-2 ">Customer Address</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Phone Number</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Gate Code</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Assigned to</p>
                            <p className="text-sm font-normal w-[15%] px-2 "> Assigned On</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Disposition</p>
                        </span>
                        
                        {dash_box != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start">
                            {dash_box?.recent_lead.length ? <>
                            {dash_box?.recent_lead.map((data:any, ind:any)=>{

                                const {customer_name, created_at, address, phone_number, email, gate_code, assigned_to, disposition, lead_ind} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[7.5%] px-2 ">{lead_ind}</p>
                                        <p className="text-sm w-[15%] px-2 ">{customer_name}</p>
                                        <p className="text-sm w-[17.5%] px-2 ">{address}</p>
                                        <p className="text-sm w-[15%] px-2 ">{phone_number}</p>
                                        <p className="text-sm w-[10%] px-2 ">{gate_code}</p>
                                        <p className="text-sm w-[15%] px-2 flex items-center justify-between ">{assigned_to.last_name} {assigned_to.first_name}</p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className={disposition == 'SOLD' ? "text-sm w-[10%] px-2 text-blue-600 ":"text-sm w-[10%] px-2 text-red-600 "}>{disposition.replace(/_/g, ' ').toLowerCase()}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Lead yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_box?.recent_lead.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* Recent Project */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Project</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[10%] px-2 ">Project Id</p>
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Job Id</p>
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Lead Id</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Customer Name</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Contract Amt</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Assigned to</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Status</p>

                            <p className="text-sm font-normal w-[15%] px-2 ">Last Upated</p>
                        </span>
                        
                        {dash_box != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start">
                            {dash_box?.recent_project.length ? <>
                            {dash_box?.recent_project.map((data:any, ind:any)=>{

                                const {project_ind, job, contract_amount, status, updated_at} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[10%] px-2 ">{project_ind}</p>
                                        <p className="text-sm w-[7.5%] px-2 ">{job.job_ind}</p>
                                        <p className="text-sm w-[7.5%] px-2 ">{job.lead.lead_ind}</p>
                                        <p className="text-sm w-[15%] px-2 ">{job.lead.customer_name}</p>
                                        <p className="text-sm w-[15%] px-2 ">{contract_amount.toLocaleString()}</p>
                                        <p className={status.toLowerCase() == "pending" ? "text-sm w-[15%] px-2 text-red-600 " : status.toLowerCase() == 'in_progress' ? "text-sm w-[15%] px-2 text-amber-600 " : "text-sm w-[15%] px-2 text-green-500 " }>{status.toLowerCase().replace(/_/g, ' ')}</p>
                                        <p className="text-sm w-[15%] px-2 flex items-center justify-between gap-[10px] ">{job.lead.assigned_to.first_name} {job.lead.assigned_to.last_name} </p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(updated_at))}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Project yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_box?.recent_project.length}</p>
                            </span>
                        </span>
                    </div>
                </div>
                
                {/* Recent Task */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Task</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[7.5%] px-2 ">Task Id</p>
                            <p className="text-sm font-normal w-[22.5%] px-2 ">Description</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Assigned To</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Status</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Created On</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Due Date</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Last Updated</p>
                        </span>
                        
                        {dash_box != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start">
                            {dash_box?.recent_task.length ? <>
                            {dash_box?.recent_task.map((data:any, ind:any)=>{

                                const {task_ind, description, job, status, created_at, task_assigned_to, updated_at, due_date} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[7.5%] px-2 ">{task_ind}</p>
                                        <p className="text-sm w-[22.5%] px-2 ">{description}</p>
                                        <p className="text-sm w-[15%] px-2 flex items-center justify-between gap-[10px] ">
                                            {task_assigned_to.last_name} {task_assigned_to.first_name}</p>
                                        <p className={status.toLowerCase() == "pending" ? 
                                            "text-sm w-[10%] px-2 text-red-600 " : status.toLowerCase() == 'in_progress' ? 
                                            "text-sm w-[10%] px-2 text-amber-600 " : "text-sm w-[10%] px-2 text-green-500 " }>{status.toLowerCase().replace(/_/g, ' ')}</p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className="text-sm w-[15%] px-2 ">{due_date}</p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(updated_at))}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Task yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_box?.recent_task.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* Recent Notification */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[10%] px-2 ">Payment Id</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Job Id</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Amount</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Customer Name</p>
                            <p className="text-sm font-normal w-[25%] px-2 ">Customer email</p>

                            <p className="text-sm font-normal w-[10%] px-2 ">Status</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Date</p>
                        </span>
                        
                        {dash_box != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start">
                            {dash_box?.recent_payment.length ? <>
                            {dash_box?.recent_payment.map((data:any, ind:any)=>{

                                const {payment_ind, job, created_at, amount, status } = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[10%] px-2 ">{payment_ind}</p>
                                        <p className="text-sm w-[10%] px-2 ">{job.job_ind}</p>
                                        <p className="text-sm w-[15%] px-2 ">{amount.toLocaleString()}</p>
                                        <p className="text-sm w-[15%] px-2 ">{job.customer.first_name} {job.customer.last_name}</p>
                                        <p className="text-sm w-[25%] px-2 ">{job.customer.email}</p>
                                        <p className={status.toLowerCase() == "pending" ? 
                                            "text-sm w-[10%] px-2 text-amber-600 " : status.toLowerCase() == 'completed' ? 
                                            "text-sm w-[10%] px-2 text-green-500 " : "text-sm w-[10%] px-2 text-red-600 " }>{status.toLowerCase().replace(/_/g, ' ')}</p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Payment yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_box?.recent_payment.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

            </div>

            {showModal && <ShortCutModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} showModal={showModal} setShowModal={setShowModal} /> }
        </div>
    )
}

export default AdminHome