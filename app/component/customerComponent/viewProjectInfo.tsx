'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";

const ViewProjectInfo = ({showModal, setShowModal, selectedItem, setSelectedItem, show, setShow  }:DeleteTaskProps) => {
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
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen pt-[120px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[80%] mx-auto shadow-xl flex bg-red-200 items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[200px] flex flex-col justify-center items-center gap-[40px] px-[20px] py-[5px] ">
                                {/* Detailed Project Status */}
                                    <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                        <span className="w-full flex items-center justify-between h-[50px] border-b-2 border-gray-200">
                                            <p className="text-lg font-semibold">Detailed Project Status</p>
                                            <p className="text-lg font-semibold text-blue-600">Project 1</p>

                                        </span>

                                        <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[3px]  ">
                                            <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                                <p className="text-sm font-semibold w-[20%] px-[10px] ">Project Name</p>
                                                <p className="text-sm font-semibold w-[20%] px-[10px] ">Stage </p>
                                                <p className="text-sm font-semibold w-[20%] px-[10px] ">Status</p>
                                                <p className="text-sm font-semibold w-[20%] px-[10px] ">Last Update</p>
                                                <p className="text-sm font-semibold w-[20%] px-[10px] ">Expected Date</p>
                                            </span>
                                            <div className="w-full  flex flex-col justify-start items-start">
                                                {[1].map((data, ind)=>{
                                                    return (
                                                        <span key={ind} className="approval-flow-table-list hover:bg-white">
                                                            <span className="w-[20%] flex flex-col items-start justify-betw">
                                                                <CustomerDetailedProjectName />
                                                            </span>
                                                            <span className="w-[20%] flex flex-col items-start justify-betw">
                                                                <CustomerDetailedProjectStage />
                                                            </span>
                                                            <span className="w-[20%] flex flex-col items-start justify-betw">
                                                                <CustomerDetailedProjectStatus />
                                                            </span>
                                                            <span className="w-[20%] flex flex-col items-start justify-betw">
                                                                <CustomerDetailedProjectLastUpdate />
                                                            </span>
                                                            <span className="w-[20%] flex flex-col items-start justify-betw">
                                                                <CustomerDetailedProjectExpectedDate />
                                                            </span>
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                            
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewProjectInfo


const CustomerDetailedProjectName = ()=>{
    return (
        <div className="w-full flex flex-col  px-2">
            <p className="text-sm h-[30px]">Project 1</p>
            <p className="text-sm h-[30px]"></p>
            <p className="text-sm h-[30px]"></p>
        </div>
    )
}
const CustomerDetailedProjectStage = ()=>{
    return (
        <div className="w-full flex flex-col  px-2">
            <p className="text-sm h-[30px]">HOA Approval</p>
            <p className="text-sm h-[30px]">Permit Approval</p>
            <p className="text-sm h-[30px]">Initial Payment</p>
        </div>
    )
}

const CustomerDetailedProjectStatus = ()=>{
    return (
        <div className="w-full flex flex-col  px-2">
            <p className="text-sm h-[30px]">Approved</p>
            <p className="text-sm h-[30px]">In Progress</p>
            <p className="text-sm h-[30px]">50% Paid</p>
        </div>
    )
}

const CustomerDetailedProjectLastUpdate = ()=>{
    return (
        <div className="w-full flex flex-col  px-2">
            <p className="text-sm h-[30px]">June 11, 2024</p>
            <p className="text-sm h-[30px]">June 12, 2024</p>
            <p className="text-sm h-[30px]">June 13, 2024</p>
        </div>
    )
}

const CustomerDetailedProjectExpectedDate = ()=>{
    return (
        <div className="w-full flex flex-col  px-2">
            <p className="text-sm h-[30px]">N/A</p>
            <p className="text-sm h-[30px]">June 15, 2024</p>
            <p className="text-sm h-[30px]">N/A</p>
        </div>
    )
}