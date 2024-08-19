'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { UserDeleteProps,  } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FilesUpload, FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request } from '@/app/api/admin_api'

const DeleteModal = ({ showModal, setShowModal, selectedUser, setSelectedUser}: UserDeleteProps) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function delete_user() {
        setLoading(true)
        const response = await delete_auth_request(`user/delete-user/${selectedUser.user_id}`)

        if (response.status == 200 || response.status == 201){
            
            console.log(response.data.msg);
            
            showAlert(response.data.msg, "success")
            
            setShowModal(false)
            
            setLoading(false)
          }else{
            console.log(response);
            
            showAlert(response.response.data.err, "error")
            
            setLoading(false)
        }
        
    }
   

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] 2-[20] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-red-200 h-[40px]">
                                        <p className="text-lg font-semibold  text-red-600 ">{selectedUser.last_name} {selectedUser.first_name} </p>
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-lg font-normal text-center text-red-600 ">Are you sure you want to delete 
                                            <strong> {selectedUser.last_name} {selectedUser.first_name}</strong> </p>
                                            
                                        <p className="text-sm   text-red-600 flex items-center justify-center gap-2 "> <CiWarning size={23} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-red-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center" onClick={delete_user} disabled={loading}>
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Delete'}

                                            </button>

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

export default DeleteModal