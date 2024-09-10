'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { get_auth_request } from '@/app/api/admin_api';
import Alert from '../alert';
import { timestamp_to_readable_value } from '../helper';

interface Sales_Dashboard_Props {
    total_lead?: number, converted_lead?:number, total_job?:number, total_task?:number, recent_lead?:any, recent_tasks?:any, recent_notifications?:any
}

const SalesDashboardPage = () => {

    const [alert, setAlert] = useState({message: '', type: ''})
    const [dash_box, setDash_box] = useState<Sales_Dashboard_Props | null>(null);

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
            const response = await get_auth_request(`app/sales-main-dashboard`)
            
    
            if (response.status == 200 || response.status == 201){
                
                setDash_box(response.data)      
    
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
                            <p className="text-sm ">{dash_box?.total_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Converted Lead</p>
                            <p className="text-sm ">{dash_box?.converted_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Job</p>
                            <p className="text-sm ">{dash_box?.total_job?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Tasks</p>
                            <p className="text-sm ">{dash_box?.total_task?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                                    
                </div>

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
                            {dash_box?.recent_lead.reverse().map((data:any, ind:any)=>{

                                const {customer_first_name, customer_last_name, created_at, state, city, zip, phone_number, email, gate_code, assigned_to, disposition, lead_ind} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[7.5%] px-2 ">{lead_ind}</p>
                                        <p className="text-sm w-[15%] px-2 ">{customer_first_name} {customer_last_name}</p>
                                        <p className="text-sm w-[17.5%] px-2 ">{state}, {city}</p>
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

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-blue-700 text-white rounded-t-[3.5px]  ">
                            <p className="text-sm w-[16.5%] px-2  ">Date / Time</p>
                            <p className="text-sm w-[20%] px-2  ">Subject</p>
                            <p className="text-sm w-[32.5%] px-2  ">Details</p>
                            <p className="text-sm w-[13.5%] px-2  ">Status</p>
                            <p className="text-sm w-[17.5%] px-2  ">Source</p>
                        </span>
                        
                        
                        {dash_box !== null ? <div className="w-full h-[300px] flex flex-col justify-start items-start overflow-y-auto">

                            {dash_box?.recent_notifications.length ? 
                            <>
                            {dash_box?.recent_notifications.map((data:any, ind:any)=>{

                                const {created_at, subject, message, read, user, source, } = data
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[16.5%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className="text-sm w-[20%] px-2 ">{subject}</p>
                                        <p className="text-sm w-[32.5%] px-2 ">{message}</p>
                                        <p className={read ? "text-sm w-[13.5%] text-green-600 px-2 ":"text-sm w-[15%] px-2 text-red-600 "}>{read ? "read": "unread"}</p>
                                        <p className="text-sm w-[17.5%] px-2 ">{source.last_name} {source.first_name} </p>
                                    </span>
                                )
                            })}
                            </> 
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Notifications yet</p>
                            </div>
                            }
                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
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
                                <p className="text-sm  ">Showing 1-15 of {dash_box?.recent_notifications.length}</p>
                            </span>
                        </span>
                    </div>
                </div>
                
                
                

            </div>
        </div>
    )
}

export default SalesDashboardPage