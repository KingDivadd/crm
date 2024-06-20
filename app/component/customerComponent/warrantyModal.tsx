'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";

const WarrantyModal = ({showModal, setShowModal, selectedItem, setSelectedItem, show, setShow  }:DeleteTaskProps) => {
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
                    <div className="h-auto w-[60%] mx-auto shadow-xl flex bg-red-200 items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[270px] flex flex-col justify-center items-center gap-[40px] p-[20px] ">
                                {/* Detailed Project Status */}
                                    <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                        <p className="text-xl font-semibold">Warranty Details</p>
                                            
                                        <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Project Name:</p>
                                                <p className="text-md ">Project 1</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Warranty Start Date:</p>
                                                <p className="text-md ">June 11, 2024</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Warranty End Date:</p>
                                                <p className="text-md ">June 21, 2024</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Full Coverage Detail:</p>
                                                <p className="text-md ">Covers electrical issues, structural defects</p>
                                            </span>
                                            
                                        </div>
                                        <div className="w-full flex flex-col items-start justify-start gap-[20px] border-t border-gray-200 pt-[10px]">
                                            <p className="text-md font-semibold">Contact Information for Warranty Claims</p>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Name:</p>
                                                <p className="text-md ">Jone Doe</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Email:</p>
                                                <p className="text-md text-blue-600 cursor-pointer hover:underline ">john.doe@yopmailcom</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Phone:</p>
                                                <p className="text-md ">(123)-456-789</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Address:</p>
                                                <p className="text-md ">123 Warranty Lane, Suite 100, Anytown, USA 12345</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
                                                <p className="text-md font-light">Support Hours:</p>
                                                <p className="text-md ">Monday - Friday, 9 AM - 5 PM</p>
                                            </span>
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

export default WarrantyModal

