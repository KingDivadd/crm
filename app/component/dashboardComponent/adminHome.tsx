'use cleient'
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

const AdminHome = () => {
    const router = useRouter()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [dash_box, setDash_box] = useState<Admin_dashboard_props | null>(null);
    const [activity_page, setActivity_page] = useState(1)
    const [task_notification_page, setTask_notification_page] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({title: '', item: []})


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

            console.log(response.data);
            
            
            showAlert(response.data.msg, "success")
          }else{
            console.log(response);
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

        console.log('new page number ', new_page_number);

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
                activity_page === i ? 'bg-blue-500 text-white' : ''
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
                activity_page === i ? 'bg-blue-500 text-white' : ''
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

        console.log('new page number ', new_page_number);

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
                task_notification_page === i ? 'bg-blue-500 text-white' : ''
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
                task_notification_page === i ? 'bg-blue-500 text-white' : ''
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
        console.log('selected ', item);
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
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] bg-white w-1/4 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-md text-blue-600">Total Lead</p>
                            <p className="text-sm text-blue-600">{dash_box?.total_number_of_leads || 0}</p>
                            <p className="text-sm font-light text-blue-600">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-lime-700 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-md text-lime-700">Total Sales</p>
                            <p className="text-sm text-lime-700">{dash_box?.total_number_of_sales || 0}</p>
                            <p className="text-sm font-light text-lime-700">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-md text-sky-600">Total Installations</p>
                            <p className="text-sm text-sky-600">{dash_box?.total_number_of_installations || 0}</p>
                            <p className="text-sm font-light text-sky-600">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-md text-lime-700">Total Projects</p>
                            <p className="text-sm text-lime-700">{dash_box?.total_number_of_projects || 0}</p>
                            <p className="text-sm font-light text-lime-700">Last 30 days</p>
                        </div>
                    </span>
                    
                    
                    
                    
                </div>

                {/* second section = recent activity */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px]">
                    <p className="text-lg font-semibold">Recent Activities</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300">
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2">Activity Type</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2">Description</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2">User</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2">Date</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2">Time</p>
                        </span>

                        { dash_box?.activities.length ?
                        
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {dash_box?.activities.map((data: any, ind: number) => {
                                const { details, user, created_at, action } = data;
                                return (
                                <span key={ind} className="recent-activity-table-list">
                                    <p className="text-sm w-[20%] pr-2 pl-2">{action}</p>
                                    <p className="text-sm w-[20%] pr-2 pl-2">{details}</p>
                                    <p className="text-sm w-[20%] pr-2 pl-2">{user?.last_name}</p>
                                    <p className="text-sm w-[20%] pr-2 pl-2">{created_at}</p>
                                    <p className="text-sm w-[20%] pr-2 pl-2">{created_at}</p>
                                </span>
                                );
                            })}
                        </div>

                        :

                        <div className="w-full h-[200px] flex items-center justify-center ">
                            <p className="text-md font-normal">No Activity yet</p>
                        </div>
                        
                        }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] rounded-b-[5px]">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer" onClick={() => recent_activity_action('prev')}>Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_page_numbers()}
                                </span>
                                <p className="text-sm cursor-pointer" onClick={() => recent_activity_action('next')}>Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-5 of {dash_box?.total_number_of_recent_activities || 0}</p>
                            </span>
                        </span>
                    </div>
                </div>

                {/* quick access secion */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-lg font-semibold">Quick Access</p>
                    <div className="w-full flex flex-wrap justify-start gap-[10px]">
                        <span className="w-[260px] quick-access-bar group">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GiChart size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-[18px] ">New Leads</p>
                                <p className="text-sm ">{dash_box?.new_lead.length} new leads</p>
                                <p className="text-sm text-blue-500 hover:underline cursor-pointer group-hover:text-slate-100 " onClick={()=>{view_details('leads')}}>View Detials</p>
                            </span>
                        </span>
                        
                        <span className="w-[250px] quick-access-bar group">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><BsBriefcase size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-[18px] ">Pending Sales</p>
                                <p className="text-sm ">{dash_box?.pending_sales.length} pending sales</p>
                                <p className="text-sm text-blue-500 hover:underline cursor-pointer group-hover:text-slate-100 " onClick={()=>{view_details('pending_sales')}}>View Detials</p>
                            </span>
                        </span>
                        <span className="w-[300px] quick-access-bar group">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GiLightningSpanner size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-[18px] ">Installations</p>
                                <p className="text-sm ">{dash_box?.ongoing_installations.length} ongoing installations</p>
                                <p className="text-sm text-blue-500  hover:underline cursor-pointer group-hover:text-slate-100  " onClick={()=>{view_details('ongoing_installations')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar group ">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><GrServices size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-[18px] ">Service Tickets</p>
                                <p className="text-sm ">{dash_box?.open_service_tickets.length} open service ticket</p>
                                <p className="text-sm text-blue-500 hover:underline cursor-pointer group-hover:text-slate-100 " onClick={()=>{view_details('service_tickets')}}>View Detials</p>
                            </span>
                        </span>

                        <span className="w-[300px] quick-access-bar group">
                            <span className="h-[80%] flex items-start justify-center w-[30%]  " ><FaMoneyBillAlt size={35} /> </span>
                            <span className="h-full flex w-full flex flex-col items-start justify-start gap-[10px] ">
                                <p className="text-[18px] ">Pending Payments</p>
                                <p className="text-sm ">{dash_box?.pending_payments.length} pending payments</p>
                                <p className="text-sm text-blue-500 hover:underline cursor-pointer group-hover:text-slate-100  " onClick={()=>{view_details('pending_payment')}}>View Detials</p>
                            </span>
                        </span>



                    </div>

                </div>

                {/* task notification */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-lg font-semibold">Task Notification</p>
                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300 ">
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2 ">Task Type</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2 ">Task</p>

                            <p className="text-sm font-normal w-[20%] pr-2 pl-2 ">Assigned To</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2 ">Due Date</p>
                            <p className="text-sm font-normal w-[20%] pr-2 pl-2 ">Status</p>
                        </span>


                        {dash_box?.task_notification.length ? 
                        
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {dash_box?.task_notification.map((data:any, ind: any)=>{

                                const { message, read, task_type, due_date, task_notification_status, user , total_number_of_recent_activities}  = data
                                return (                                        
                                        <span key={ind} className={task_notification_status === 'OVERDUE' ? "overdue-row":" recent-activity-table-list"}>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">{task_type}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">{message}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">{user.first_name}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">{due_date}</p>
                                            <p className="text-sm w-[20%] pr-2 pl-2 ">{task_notification_status}</p>
                                        </span>
                                )
                            })}
                        </div>
                        
                        :

                        <div className="w-full h-[200px] flex items-center justify-center">
                            <p className="text-md font-normal"> No Task Notification yet. </p>
                        </div>
                        
                    }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer" onClick={() => task_notification_action('prev')}>Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_task_notification_page_numbers()}
                                </span>
                                <p className="text-sm cursor-pointer" onClick={() => task_notification_action('next')}>Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-5 of {dash_box?.total_number_of_recent_activities || 0}</p>
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