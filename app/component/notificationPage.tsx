'use client'
import React, {useState, useEffect} from 'react'
import { get_auth_request } from '../api/admin_api';
import { timestamp_to_readable_value } from './helper';
import NotificationModal from './notificationModal';



interface Notificaiton_Props {
    total_number_of_notifications?:number;
    total_number_of_notification_pages?:number;
    notification?:any

}

const NotificationPage = () => {

    const [notification_page, setNotification_page] = useState<Notificaiton_Props | null >(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [modalFor, setModalFor] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [auth_id, setAuth_id] = useState('')


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
        const item = localStorage.getItem('key')
        if (item){
            setAuth_id(item)
        }
        get_notification(page_number)
    
    }, [showModal])

    async function get_notification(page_num:number) {

        const response = await get_auth_request(`app/all-notifications/${page_num}`)

        if (response.status == 200 || response.status == 201){
            
            setNotification_page(response.data);           


        }else{            
            if (response.response){
                showAlert(response.response.data.err, "error")
            }
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = notification_page?.total_number_of_notification_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        
        setPage_number(new_page_number);
        get_notification(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = notification_page?.total_number_of_notification_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    function show_item(data:any){
        setShowModal(true)
        setSelectedItem(data)
        setModalFor('view')
    }

    return (
        <div className="w-full p-[10px] pb-[10px]">
            <div className="w-full flex flex-row items-start justify-between gap-[10px] relative">
                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[3px] shadow-md ">
                    <span className="w-full h-[45px] flex flex-row items-center justify-start bg-blue-700 text-white rounded-t-[3.5px]  ">
                        <p className="text-sm w-[15%] px-2  ">Date / Time</p>
                        <p className="text-sm w-[20.5%] px-2  ">Subject</p>
                        <p className="text-sm w-[34.5%] px-2  ">Details</p>
                        <p className="text-sm w-[15%] px-2  ">Source</p>
                        <p className="text-sm w-[7.5%] px-2  ">Status</p>
                        <p className="text-sm w-[7.5%] px-2  ">Action</p>
                    </span>

                    {notification_page ? 
                    
                    <div className="w-full flex flex-col justify-start items-start overflow-y-auto " style={{height: 'calc(100vh - 165px)'}}>
                        {
                            notification_page.notification.length ? 
                            <>
                            {notification_page.notification.map((data:any, ind:any)=>{

                                const {created_at, subject, message, read, read_by, user, source, notification_source } = data
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list " onClick={()=> show_item(data)} >
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className="text-sm w-[20.5%] px-2 ">{subject}</p>
                                        <p className="text-sm w-[34.5%] px-2 ">{message}</p>
                                        <p className="text-sm w-[15%] px-2 ">{notification_source.first_name} {notification_source.last_name} </p>
                                        <p className={(read && read_by.includes(auth_id)) ? "text-sm w-[7.5%] text-green-600 px-2 ":"text-sm w-[7.5%] px-2 text-red-600 "}>{(read && read_by.includes(auth_id)) ? "read": "unread"}</p>
                                        <p className="text-sm w-[7.5%] px-2 text-blue-600 hover:underline  "> view </p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <p className="text-sm font-normal m-auto">No Notification yet.</p>
                        
                        }
                    </div> 
                    :
                    <div className="w-full flex flex-col justify-center items-center" style={{height: 'calc(100vh - 160px)'}}>
                        <p className="text-sm font-normal">Loading Data...</p>
                    </div>}

                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm">Showing 1-15 of {notification_page?.total_number_of_notifications || 0}</p>
                        </span>
                    </span>

                </div>
            </div>
            {showModal && <NotificationModal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedItem={selectedItem} setModalFor={setModalFor} setSelectedItem={setSelectedItem} /> }
        </div>   
    )
}

export default NotificationPage