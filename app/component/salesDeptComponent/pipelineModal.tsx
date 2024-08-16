'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix} from "../helper"


interface Pipeline_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedPipeline: any;
    setSelectedPipeline: (selectedPipeline: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const Pipeline_Modal = ({ showModal, setShowModal, selectedPipeline, setSelectedPipeline, modalFor}: Pipeline_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    function handleCloseModal() {
        setShowModal(false)
    }

    useEffect(() => {
        if (modalFor == 'add'){
        }else if (modalFor == 'view'){

            console.log('selected pipeline ', selectedPipeline);
            
            
            const {customer_name, address, phone_number, email, assigned_to, appointment_date, disposition, gate_code} = selectedPipeline
            
        }
    }, [])

   



    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[75px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {modalFor == 'view' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] ">
                                    <div className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">View pipeline </p>
                                        
                                    </div>

                                    <div className="w-full h-full flex items-start justify-start gap-[15px]">
                                        <div className="w-1/2 h-full flex flex-col items-start justify-start gap-[10px] bg-green-100 ">
                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-medium w-[35%]">Pipeline Id</p>    
                                                <p className="text-sm font-normal w-[65%] text-start">{selectedPipeline.pipeline_id}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-medium w-[35%]">Contract Amount</p>    
                                                <p className="text-sm font-normal w-[65%] text-start">{selectedPipeline.contract_amount}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-medium w-[35%]">Disposition</p>    
                                                <p className="text-sm font-normal w-[65%] text-start">{selectedPipeline.disposition.replace(/_/g, ' ')}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-medium w-[35%]">Status</p>    
                                                <p className="text-sm font-normal w-[65%] text-start">{selectedPipeline.status.replace(/_/g, ' ')}</p>    
                                            </span>

                                        </div>
                                    </div>
                                        



                            </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Pipeline_Modal