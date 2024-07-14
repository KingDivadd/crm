'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { DeleteTaskProps } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FilesUpload, FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'

const UploadModalPage = ({ showModal, setShowModal, selectedItem, setSelectedItem, show, setShow }: DeleteTaskProps) => {
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
                <div className={addPermit ? "w-full h-screen pt-[20px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[40px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={addPermit ? "h-auto w-[42.5%] mx-auto shadow-xl flex items-start ": "h-auto w-[80%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}

                                {!addPermit && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Project Details:Project A</p>
                                    </span>
                                    <div className="w-full flex flex-row items-start justify-between gap-[20px] h-[210px] border-b border-gray-300  ">
                                       <div className="w-[30%] h-full flex flex-col items-start justify-start gap-3  ">
                                            <p className="text-[15px] font-medium">Basic Information</p>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Project ID:</p>
                                                <p className="text-[14.5px] font-medium">PJ1000123</p>
                                            </span>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Project Name:</p>
                                                <p className="text-[14.5px] font-medium">Project AB</p>
                                            </span>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Client Name:</p>
                                                <p className="text-[14.5px] font-medium">Bill Gate</p>
                                            </span>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Status:</p>
                                                <p className="text-[14.5px] font-medium">HOA</p>
                                            </span>
                                       </div>

                                       <div className="w-[30%] h-full flex flex-col items-start justify-start gap-3  ">
                                            <p className="text-[15px] font-medium">Key Dates</p>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Submittal Date:</p>
                                                <p className="text-[14.5px] font-medium">July 4, 2024</p>
                                            </span>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Approval Date:</p>
                                                <p className="text-[14.5px] font-medium">July 5, 2024</p>
                                            </span>
                                            <span className="w-full flex items-center justify-start gap-3">
                                                <p className="text-[14.5px] font-normal">Completion Date:</p>
                                                <p className="text-[14.5px] font-medium">July 7, 2024</p>
                                            </span>

                                       </div>

                                       <div className="w-[40%] h-full flex flex-col items-start justify-start gap-3 ">
                                            <p className="font-medium text-[15px] ">Tasks and Milestones</p>
                                            <div className="w-full flex flex-col items-start justify-start">
                                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300 ">
                                                    <p className="text-sm font-semibold w-[50%] px-2 ">Task Description</p>
                                                    <p className="text-sm font-semibold w-[25%] px-2 ">Due Date</p>
                                                    <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                                                </span>
                                                <div className="w-full h-[160px] flex flex-col justify-start items-start overflow-y-auto">
                                                    <span className="w-full  flex flex-col justify-start items-start ">
                                                        {[1,2,3].map((data, ind)=>{
                                                            return (
                                                                <span key={ind} className="recent-activity-table-list" >
                                                                    <p className="text-sm w-[50%] px-2 ">Design Submission</p>
                                                                    <p className="text-sm w-[25%] px-2 ">2024-07-01</p>
                                                                    <p className="text-sm w-[25%] px-2 ">Pending</p>
                                                                </span>
                                                            )
                                                        })}
                                                    </span>
                                                </div>

                                            </div>
                                       </div>

                                    </div>

                                    <div className="w-full flex h-[250px] items-start justify-start gap-[20px]">
                                        <div className="w-[30%] h-full flex flex-col items-start justify-start gap-3  ">
                                            <p className="font-medium text-[15px] ">Uploaded Drawings</p>
                                            <div className="w-full h- flex flex-col overflow-y-auto">
                                                {['Site_Plan_2024_07_01.pdf','Structural_Drawing_2024_07_02.dwg','Structural_Drawing_2024_07_03.dwg', 'Structural_Drawing_2024_07_04.dwg'].map((data, ind)=>{
                                                    return(
                                                        <p className="text-sm h-[40px] flex items-center w-full text-start font-normal">{ind + 1}. {data} </p>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="w-[40%] flex flex-col item-start justify-start">
                                            <p className="font-medium text-[15px] ">RFI Logs</p>
                                            <div className="w-full flex flex-col items-start justify-start">
                                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300 ">
                                                    <p className="text-sm font-semibold w-[25%] px-2 ">RFI ID</p>
                                                    <p className="text-sm font-semibold w-[50%] px-2 ">Request Description</p>
                                                    <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                                                </span>
                                                <div className="w-full h-[160px] flex flex-col justify-start items-start overflow-y-auto">
                                                    <span className="w-full  flex flex-col justify-start items-start ">
                                                        {[1,2,3].map((data, ind)=>{
                                                            return (
                                                                <span key={ind} className="recent-activity-table-list" >
                                                                    <p className="text-sm w-[25%] px-2 ">RFI1000123</p>
                                                                    <p className="text-sm w-[50%] px-2 "> Clarification on design</p>
                                                                    <p className="text-sm w-[25%] px-2 ">Responded</p>
                                                                </span>
                                                            )
                                                        })}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="w-[30%] h-full flex flex-col items-start justify-start gap-3 ">
                                            <p className="font-medium text-[15px] ">Comments/Notes</p>
                                            <div className="w-full h- flex flex-col overflow-y-auto">
                                                {['Need to expedite HOA approval ','Follow up with engineering team ','Follow up with engineering team ', 'Follow up with engineering team '].map((data, ind)=>{
                                                    return(
                                                        <p className="text-sm h-[40px] flex items-center w-full text-start font-normal">{ind + 1}. {data} </p>
                                                    )
                                                })}
                                            </div>
                                        </div>

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

export default UploadModalPage