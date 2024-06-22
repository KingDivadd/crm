'use client'
import React, {useState, useEffect} from 'react'
import ViewNotificationInfo from './viewNotificationInfo'

const NotificationPage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    function viewNotification(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    return (
        <div className="w-full flex p-[10px] ">
            <div className="w-full flex flex-col items-start justify-start gap-[25px] pt-[20px] ">
                <p className="text-xl font-semibold">All Notifications</p>

                {/* Notification table*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Notification Page Content</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] px-2 ">Date</p>
                            <p className="text-sm font-semibold w-[30%] px-2 ">Notification Type</p>
                            <p className="text-sm font-semibold w-[45%] px-2 ">Description</p>
                        </span>
                        <div className="w-full customer-notification-cont flex flex-col justify-start items-start" >
                            {[1,2,3,4,5,6,7,8,9,0,1].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list" onClick={()=>viewNotification(data)}>
                                        <p className="text-sm w-[25%] px-2 ">June 12, 2024</p>
                                        <p className="text-sm w-[30%] px-2 ">Payment Received</p>
                                        <p className="text-sm w-[45%] px-2 ">Initial payment received for Project 1.</p>
                                    </span>
                                )
                            })}
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">2</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">3</p>
                                    <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">4</p>

                                </span>
                                <p className="text-sm cursor-pointer">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-5 of 60</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {showModal && <ViewNotificationInfo showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default NotificationPage