'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { AdminShortcutProps,  } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request } from '@/app/api/admin_api'
import LeadTable from './subComponent/shortcutTables'

const ShortCutModal = ({ showModal, setShowModal, selectedItem, setSelectedItem}: AdminShortcutProps) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)

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
        console.log(selectedItem);
        

    }, [])
    

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] 2-[20] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ "w-full h-screen pt-[40px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={"h-auto w-[90%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full admin-shortcut-cont flex flex-col justify-start items-center p-[20px] pb-0 ">

                                {/* below is to upload new permit */}
                                <div className="w-full h-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-blue-200 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">{selectedItem.title} </p>
                                    </span>

                                    <div className="w-full h-full  flex flex-col items-center justify-center gap-[34px]">
                                            
                                        <LeadTable />
                                        

                                    </div>

                                    <span className="w-full flex items-center justify-center">
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

export default ShortCutModal