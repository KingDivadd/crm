'use client'
import { notificationExample } from '@/constants'
import React, {useState, useEffect} from 'react'
import { FaBullseye } from 'react-icons/fa'
import { MdEdit, MdDeleteForever } from 'react-icons/md'


const AdminNotificationPage = () => {
    const [viewNotif, setViewNotif] = useState(true)
    const [selectNotificaion, setSelectNotificaion] = useState('')
    const [viewNotification, setViewNotification] = useState(null)

    const [userArray, setUserArray] = useState([{lastName: "Iroegbu", firstName: "David", email: 'ireugbudavid@gmail.com', phone: '07044907610', role: 'Sales', status: 'active',password: 'user1password' }, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}])

    useEffect(() => {
        const item = sessionStorage.getItem('notificationField')
        if (item == null || item == ''){
            setSelectNotificaion('all')
        }else{
            setSelectNotificaion(item)
        }
    }, [])

    function handleNotification(item:any){
        setSelectNotificaion(item)
        sessionStorage.setItem('notificationField', item)
    }

    function handleViewNotificaton(item:any){
        setViewNotification(item)
        console.log(item)
    }



    return (
        <div className="w-full p-[10px] ">
            <div className="w-full flex flex-col items-start justify-start gap-3 ">
                <p className="text-2xl font-bold">Notification</p>
                <span className="w-full h-[35px] flex flex-row justify-start gap-3">
                    <p className={viewNotif ? "text-md text-blue-500" : "text-md text-black cursor-pointer hover:underline"} onClick={()=>{setViewNotif(true)}} >View Notifications</p>
                    <p className={viewNotif ? "text-md text-black cursor-pointer hover:underline" : "text-md text-blue-500"} onClick={()=>{setViewNotif(false)}} >Notificaiton Settings</p>
                </span>
                {/* notification body when view notification */}
                <div className="w-full h-full flex flex-row items-start justify-between gap-[10px] ">
                    {/* left side, notification list */}
                    <div className="w-[40%] h-full flex flex-col items-start justify-start gap-3 ">
                        <span className="h-[40px] w-full gap-2 flex flex-row items-center justify-between  ">
                            <span onClick={()=>{handleNotification('all')}} className={selectNotificaion === "all"? "active-notification-list-select":"notification-list-select"}>
                                <p className="text-sm ">All</p>
                            </span>
                            <span onClick={()=>{handleNotification('high')}} className={selectNotificaion === "high"? "active-notification-list-select":"notification-list-select"}>
                                <p className="text-sm ">High </p>
                            </span>
                            <span onClick={()=>{handleNotification('medium')}} className={selectNotificaion === "medium"? "active-notification-list-select":"notification-list-select"}>
                                <p className="text-sm ">Medium </p>
                            </span>
                            <span onClick={()=>{handleNotification('low')}} className={selectNotificaion === "low"? "active-notification-list-select":"notification-list-select"}>
                                <p className="text-sm ">Low </p>
                            </span>
                        </span>
                        <div className="w-full notification-list-cont flex flex-col items-start justify-start overflow-y-auto ">
                            <div className="w-full flex flex-col">
                                {notificationExample.map((data, ind)=>{
                                    const {title, details, dateTime, status} = data
                                return(
                                    <span key={ind} className="notification-list-item" onClick={()=>{handleViewNotificaton(data)}}>
                                        {status === "primary" && <span className="notification-list-status-bar bg-blue-500"></span>}
                                        {status === "success" && <span className="notification-list-status-bar bg-lime-500"></span>}
                                        {status === "error" && <span className="notification-list-status-bar bg-red-500"></span>}
                                        {status === "warning" && <span className="notification-list-status-bar bg-amber-500"></span>}
                                        <p className="text-sm font-semibold">{title}</p>
                                        <p className="text-sm">{details}</p>
                                        <p className="text-sm font-light w-full text-end">{dateTime}</p>
                                    </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>  
                    {/* right side, full notification info */}
                    <div className="w-[60%] relative notification-detail-cont flex flex-col items-start justify-start gap-3 p-[10px] bg-white border border-blue-500 rounded-[5px]">
                            <p className="text-md h-[30px] font-semibold">High Priority Task Overdue</p>
                            <p className="text-md h-[30px] ">June 13, 2024 12:45</p>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Priority: </p>
                                <p className="text-md text-red-500 ">High</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Created By: </p>
                                <p className="text-md ">John Doe ( Sales )</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Addressed To: </p>
                                <p className="text-md ">Peter Parker ( Technician )</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 min-h-[30px]">
                                <p className="text-md ">Details: </p>
                                <p className="text-md "> 
                                    Task Submit Permit Application for Project #456 is overdue by 3 days. Immediate action is  required to avoid project delays.  
                                </p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Created On: </p>
                                <p className="text-md ">June 10, 2024 10:35</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Department: </p>
                                <p className="text-md ">Operations</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 h-[30px]">
                                <p className="text-md ">Status: </p>
                                <p className="text-md ">Unresolved</p>
                            </span>
                            <span className="w-full flex flex-row justify-start items-start gap-3 min-h-[30px]">
                                <p className="text-md ">Attachment / Links: </p>
                                <span className="w-auth h-auto flex flex-col items-start justify-start">
                                    <p className="text-md ">#attanchmentOnePdf</p>
                                    <p className="text-md ">#attanchmentTwoPdf</p>
                                    <p className="text-md ">#attanchmentTwo.com</p>
                                </span>
                            </span>
                            <span className="absolute bottom-[10px] left-[0px] w-full flex flex-row justify-between items-start gap-3 px-[10px]">
                                <button className="w-[200px] flex items-center justify-center rounded-[3px] border border-blue-500 h-[40px] hover:bg-blue-500 hover:text-white ">Mark as Resolved</button>
                                <button className="w-[200px] flex items-center justify-center rounded-[3px] border border-amber-500 h-[40px] hover:bg-amber-600 hover:text-white">Dismiss</button>
                            </span>
                
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AdminNotificationPage

