'use client'
import React, {useState, useEffect} from 'react'
import { get_auth_request } from '../api/admin_api';
import { timestamp_to_readable_value } from './helper';



interface Notificaiton_Props {
    total_number_of_notifications?:number;
    total_number_of_notifications_pages?:number;
    notification?:any

}

const NotificationPage = () => {

    const [notification_page, setNotification_page] = useState<Notificaiton_Props | null >(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
      get_notification(page_number)
    
    }, [])

    async function get_notification(page_num:number) {
        console.log(' start')        

        const response = await get_auth_request(`auth/all-notifications/${page_num}`)

        if (response.status == 200 || response.status == 201){
            
            setNotification_page(response.data)                  
            console.log(response.data)                  

        }else{            
            if (response.response){
                showAlert(response.response.data.err, "error")
            }
        }
    }

    return (
        <div className="w-full p-[10px] pb-[10px]">
            <div className="w-full flex flex-row items-start justify-between gap-[10px] relative">
                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md ">
                    <span className="w-full h-[40px] flex flex-row items-center justify-start bg-blue-700 text-white rounded-t-[3.5px]  ">
                        <p className="text-sm w-[15%] px-2  ">Date / Time</p>
                        <p className="text-sm w-[17.5%] px-2  ">Subject</p>
                        <p className="text-sm w-[27.5%] px-2  ">Details</p>
                        <p className="text-sm w-[15%] px-2  ">Status</p>
                        <p className="text-sm w-[15%] px-2  ">Source</p>
                        <p className="text-sm w-[10%] px-2  ">Action</p>
                    </span>

                    {notification_page ? 
                    
                    <div className="w-full flex flex-col justify-start items-start" style={{height: 'calc(100vh - 120px)'}}>
                        {
                            notification_page.notification.length ? 
                            <>
                            {notification_page.notification.map((data:any, ind:any)=>{

                                const {created_at, subject, message, read, user, source, } = data
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(created_at))}</p>
                                        <p className="text-sm w-[17.5%] px-2 ">{subject}</p>
                                        <p className="text-sm w-[27.5%] px-2 ">{message}</p>
                                        <p className={read ? "text-sm w-[15%] text-green-600 px-2 ":"text-sm w-[15%] px-2 text-red-600 "}>{read ? "read": "unread"}</p>
                                        <p className="text-sm w-[15%] px-2 ">{source.last_name} {source.first_name} </p>
                                        <p className="text-sm w-[10%] px-2 "> action </p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <p className="text-sm font-normal">No Notification yet.</p>
                        
                        }
                    </div> 
                    :
                    <div className="w-full flex flex-col justify-center items-center" style={{height: 'calc(100vh - 120px)'}}>
                        <p className="text-sm font-normal">Loading Data...</p>
                    </div>}
                </div>
            </div>
        </div>   
    )
}

export default NotificationPage