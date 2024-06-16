'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"

const DeleteTaskModal = ({showModal, setShowModal, selectedItem, setSelectedItem  }:DeleteTaskProps) => {
    const [updateBtn, setUpdateBtn] = useState(false)
    



    function handleCloseModal() {
        setShowModal(false)
        setSelectedItem(null)
    }
    
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" id="modal">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen pt-[120px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[60%] mx-auto shadow-xl flex bg-red-200 items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <span className="w-full h-[5px] bg-blue-600 rounded-t-[5px] "></span>
                            <div className="w-full h-[300px] flex flex-col justify-center items-center ">
                                <p className="text-lg font-semibold">Are you sure you want to delete TASK <strong>TS10023</strong></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DeleteTaskModal