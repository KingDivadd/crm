'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { DeleteTaskProps } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'

const UploadDrawingModal = ({ showModal, setShowModal, selectedItem, setSelectedItem, show, setShow }: DeleteTaskProps) => {
    const [billSheet, setBillSheet] = useState({ jobNumber: '', task: '', crew: '', date: '', amount: '' })
    const [addPermit, setAddPermit] = useState(false)
    const [newPermit, setNewPermit] = useState({ submittedDate: '', approvalDate: '', permitImage: '', showSubmittedDateCalender: false, showApprovalDateCaleder: false })
    const [updateBtn, setUpdateBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)
    const [alert, setAlert] = useState({ message: '', type: '' })
    const [clickedSubmittedDate, setClickedSubmittedDate] = useState('')
    const [clickedApprovalDate, setClickedApprovalDate] = useState('')
    const [showCalender, setShowCalender] = useState(false)

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false, priority:false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status', priority:'Priority'
    })

    useEffect(() => {
        if (selectedItem == null){setAddPermit(true)}
        if (selectedItem != null){setAddPermit(false)}
    }, [])

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({ ...dropElements, [dropdown]: 'Select' });
    };

    const handleSelectDropdown = (dropdown: any, title: any) => {
        setDropElements({ ...dropElements, [title]: dropdown }); setDropMenus({ ...dropMenus, [title]: false })
    }

    useEffect(() => {
        setNewPermit({ ...newPermit, submittedDate: clickedSubmittedDate, showSubmittedDateCalender: false })
    }, [clickedSubmittedDate])

    useEffect(() => {
        setNewPermit({ ...newPermit, approvalDate: clickedApprovalDate, showApprovalDateCaleder: false })
    }, [clickedApprovalDate])

    function triggerAlert(message: string, type: string) {
        setAlert({ message: message, type: type })
        setTimeout(() => {
            setAlert({ message: '', type: '' })
            setShowModal(false)
            setShow(false)
        }, 2000);
    }

    function handleSubmit() {
        if (false) {

        } else {
            setLoading(true); // Set loading to true when the request starts

            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                triggerAlert('Drawing Uploaded', "success")
            }, 2000);
        }
    }
    
    function handleReject() {
        if (false) {
    
        } else {
            setRejectLoading(true); // Set loading to true when the request starts
    
            // Simulate a login request with a timeout
            setTimeout(() => {
                setRejectLoading(false); // Set loading to false when the request completes
                triggerAlert('Permit Rejected', "error")
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
                <div className={addPermit ? "w-full h-screen pt-[20px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[70px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={addPermit ? "h-auto w-[42.5%] mx-auto shadow-xl flex items-start ": "h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                {addPermit && 
                                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Upload New Drawing </p>
                                    </span>

                                    <div className="w-full flex flex-row items-start justify-start gap-[20px]">
                                        <div className="w-full flex flex-col gap-[10px]">

                                            <span className="w-full flex flex-col items-start justify-start gap-2 z-[10]">
                                                <h4 className="text-md font-light ">File Type </h4>
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['PDF', 'DWG', 'PNG']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2 z-[5]">
                                                <h4 className="text-md font-light ">Project </h4>
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'priority'} dropArray={['A', 'B', 'C', 'D']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>

                                            <span className="w-full h-[340px] flex flex-col items-start justify-start gap-2">
                                                <ImageUploader id={'user-image'} title={"Choose a file"} url={''} image={''} />
                                            </span>


                                        </div>

                                    </div>

                                    <span className="w-full flex items-center justify-end">
                                        <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Upload'}

                                        </button>
                                    </span>

                                </div>}

                                {!addPermit && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Task Details</p>
                                    </span>
                                    <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                        {/* column one */}
                                        <div className="w-full flex flex-col items-start justify-start gap-[10px]">
                                            <p className="text-lg h-[35px] border-b border-gray-300 w-full text-start">Task: Design Review</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Description:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Review the design for Project X and      |
                                                    | ensure compliance with the latest standards </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Due Date:</p>
                                                    <p className="text-[15.5px] font-medium text-start">July 7, 2024 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Status:</p>
                                                    <p className="text-[15.5px] font-medium text-start">In Progress </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Priority:</p>
                                                    <p className="text-[15.5px] font-medium text-start">High </p>
                                                </span>
                                                
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Comment/Note:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Initial design looks good. Need to check dimensions.| </p>
                                                </span>
                                                



                                                <span className="w-full flex flex-row items-start justify-end gap-2">
                                                   <button className="rounded-[5px] h-[40px] w-[150px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCloseModal}>Close</button>
                                                </span>
                                                
                                            </div>
                                        </div>
                                        {/* column two */}

                                    </div>
                                </div> }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UploadDrawingModal