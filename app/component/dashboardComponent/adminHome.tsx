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
import { admin_dashboard_request } from '@/app/api/admin_api';
import { Admin_dashboard_props } from '@/types';
import ShortCutModal from './shortCutModal';

interface Sales_Dashboard_Props {
    total_lead?: number, converted_lead?:number, total_job?:number, total_task?:number, recent_lead?:any, recent_tasks?:any, recent_notifications?:any
}

const AdminHome = () => {
    const router = useRouter()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [dash_box, setDash_box] = useState<Admin_dashboard_props | null>(null);
    const [activity_page, setActivity_page] = useState(1)
    const [task_notification_page, setTask_notification_page] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({title: '', item: []})
    const [dash_components, setDash_components] = useState<Sales_Dashboard_Props | null>(null);


    useEffect(() => {

      load_dashboard()

        // simulateDashboardData()
   
    }, [])
    

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function load_dashboard() {      

          const response = await admin_dashboard_request('auth/logged-in-admin', 1, 1)

          if (response.status == 200 || response.status == 201){
            
            setDash_box(response.data)
            
            
            showAlert(response.data.msg, "success")
          }else{
            if (response){

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
    
        setDash_box(simulatedData);
    }

    async function recent_activity_action(item: any) {
        let new_page_number = activity_page;
        let max_page_number = dash_box?.total_number_of_recent_activities_pages;

        if (item === 'prev') {
        if (activity_page > 1) {
            new_page_number = activity_page - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && activity_page < max_page_number) {
            new_page_number = activity_page + 1;
        }
        } else {
        new_page_number = item;
        }


        setActivity_page(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = dash_box?.total_number_of_recent_activities_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                activity_page === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => recent_activity_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, activity_page - 1);
        let endPage = Math.min(activity_page + 1, max_page_number);

        if (activity_page === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (activity_page === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                activity_page === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => recent_activity_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    async function task_notification_action(item: any) {
        let new_page_number = task_notification_page;
        let max_page_number = dash_box?.total_number_of_task_notifications_pages;

        if (item === 'prev') {
        if (task_notification_page > 1) {
            new_page_number = task_notification_page - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && task_notification_page < max_page_number) {
            new_page_number = task_notification_page + 1;
        }
        } else {
        new_page_number = item;
        }


        setTask_notification_page(new_page_number);
    }

    const render_task_notification_page_numbers = () => {
        const pages = [];
        const max_page_number = dash_box?.total_number_of_task_notifications_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                task_notification_page === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => task_notification_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, task_notification_page - 1);
        let endPage = Math.min(task_notification_page + 1, max_page_number);

        if (task_notification_page === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (task_notification_page === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                task_notification_page === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => task_notification_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    const view_details = (item:any) =>{
        if (item == 'leads'){ setSelectedItem({title: 'Leads', item: dash_box?.new_lead}) }
        else if (item == 'pending_sales'){ setSelectedItem({title: 'Pending Sales', item: dash_box?.pending_sales}) }
        else if (item == 'ongoing_installations'){ setSelectedItem({title: 'Ongoing Installations', item: dash_box?.ongoing_installations}) }
        else if (item == 'service_tickets'){ setSelectedItem({title: 'Service Tickets', item: dash_box?.open_service_tickets}) }
        else if (item == 'pending_payment'){ setSelectedItem({title: 'Pending Payment', item: dash_box?.pending_payments}) }
        else if (item == 'engineering_task'){ setSelectedItem({title: 'Engineering Task', item: dash_box?.engineering_task}) }
        else if (item == 'pending_permit'){ setSelectedItem({title: 'Pending Permit', item: dash_box?.permit}) }
        else if (item == 'accounting'){ setSelectedItem({title: 'Accounting', item: dash_box?.accounting}) }

        setShowModal(!showModal)
        
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
                            <p className="text-sm ">{dash_box?.total_number_of_leads || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Sales</p>
                            <p className="text-sm ">{dash_box?.total_number_of_sales || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Installations</p>
                            <p className="text-sm ">{dash_box?.total_number_of_installations || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>  
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Total Projects</p>
                            <p className="text-sm ">{dash_box?.total_number_of_projects || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>                  
                </div>

                {/* Recent Lead */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Lead</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
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
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
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

                {/* Recent Project */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Project</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
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
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
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

                {/* Recent Notification */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
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
                        

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-300 px-[15px] rounded-b-[3px] ">
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

            </div>

            {showModal && <ShortCutModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} showModal={showModal} setShowModal={setShowModal} /> }
        </div>
    )
}

export default AdminHome