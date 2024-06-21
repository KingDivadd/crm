'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { JobListBar } from './installerHelpers'
import { jobListBasicInfo, jobListMaterialsInfo, jobListPayementInfo, jobListProjectInfo, jobListScheduleInfo } from '@/constants'

const JobListModal = ({showModal, setShowModal, selectedItem, setSelectedItem, show, setShow  }:DeleteTaskProps) => {
    const [updateBtn, setUpdateBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    

    function triggerAlert(message:string, type: string) {
        setAlert({message:message, type: type})
        setTimeout(() => {
            setAlert({message: '', type:''})
            setShowModal(false)
            setShow(false)
        }, 2000);
    }
    function handleFullDelete(){
        if (false){

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    triggerAlert('Task Deleted successfully', "success")
            }, 2000);
        }
    }



    function handleCloseModal() {
        setShowModal(false)
        setSelectedItem(null)
    }
    
    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"> </div>
                </div>
                <div className="w-full h-screen pt-[90px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[95%] mx-auto shadow-xl flex bg-red-200 items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[270px] flex flex-col justify-center items-center gap-[40px] p-[20px] pb-0 ">
                                {/* Detailed Project Status */}
                                    <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                        <span className="w-full flex flex-row items-center justify-between h-[45px] border-b border-gray-300">
                                            <p className="text-xl font-semibold">Select Job Information</p>
                                            <p className="text-xl font-semibold text-blue-600">JB1000123 </p>
                                        </span>
                                        <div className="w-full min-h-[300px] flex flex-row items-start justify-between">
                                            <div className="w-1/4 flex flex-col items-start justify-start h-full gap-3 ">
                                                <p className="text-md font-semibold">Basic Information</p>
                                                {jobListBasicInfo.map((data, ind)=>{
                                                    return (
                                                        <JobListBar key={ind} title={data.title} value={data.value} />
                                                    )
                                                })}
                                            </div>
                                            
                                            <div className="w-1/3 flex flex-col items-start justify-start h-full gap-3 ">
                                                <p className="text-md font-semibold">Project Information</p>
                                                {jobListProjectInfo.map((data, ind)=>{
                                                    return (
                                                        <JobListBar key={ind} title={data.title} value={data.value} />
                                                    )
                                                })}
                                            </div>
                                            
                                            
                                            <div className="w-1/3  flex flex-col items-start justify-start h-full gap-3 ">
                                                <p className="text-md font-semibold">Payment Information</p>
                                                {jobListPayementInfo.map((data, ind)=>{
                                                    return (
                                                        <JobListBar key={ind} title={data.title} value={data.value} />
                                                    )
                                                })}
                                                <p className="text-md font-semibold">Materials Information</p>
                                                {jobListMaterialsInfo.map((data, ind)=>{
                                                    return (
                                                        <JobListBar key={ind} title={data.title} value={data.value} />
                                                    )
                                                })}
                                            </div>
                                            

                                            
                                            <div className="w-1/5  flex flex-col items-start justify-start h-full gap-3 ">
                                                <p className="text-md font-semibold">Schedule</p>
                                                {jobListScheduleInfo.map((data, ind)=>{
                                                    return (
                                                        <JobListBar key={ind} title={data.title} value={data.value} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <span className="w-full flex flex-row items-center justify-end h-[60px] border-t border-gray-300">
                                            <button className="bg-red-600 hover:bg-red-500 rounded-[3px] h-[40px] w-[150px] text-white" onClick={handleCloseModal}>Close</button>
                                        </span>
                                        
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default JobListModal

