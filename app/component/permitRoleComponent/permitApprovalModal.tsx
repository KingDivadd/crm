'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { DeleteTaskProps } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader from '../imageUploader'
import MyDatePicker from '../datePicker'

const PermitApprovalModal = ({ showModal, setShowModal, selectedItem, setSelectedItem, show, setShow }: DeleteTaskProps) => {
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
        trimColor: false, coverColor:false, endCapStyle:false, overSize:false, irpLatticeCombo:false, attachedFreestanding: false
    });
    const [dropElements, setDropElements] = useState({
        trimColor: 'Select', coverColor:'Select', endCapStyle:'Select', overSize:'Select', irpLatticeCombo:'Select', attachedFreestanding: 'Select'
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
                triggerAlert('Permit Updated', "success")
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
                <div className={addPermit ? "w-full h-screen pt-[30px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[50px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={addPermit ? "h-auto w-[42.5%] mx-auto shadow-xl flex items-start ": "h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                {addPermit && <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Add New Inspection</p>
                                    </span>

                                    <div className="w-full flex flex-row items-start justify-start gap-[20px]">
                                        <div className="w-full flex flex-col gap-[10px]">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">Permit Number</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>


                                            <span className="w-full flex flex-col items-start justify-start gap-2">

                                                <h4 className="text-md font-light ">Inspection Date</h4>
                                                <div className="w-full flex flex-col items-end justify-end relative z-10 ">
                                                    <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={() => { setNewPermit({ ...newPermit, showApprovalDateCaleder: !newPermit.showApprovalDateCaleder }) }}>
                                                        {newPermit.approvalDate ? newPermit.approvalDate : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {newPermit.showApprovalDateCaleder ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {newPermit.showApprovalDateCaleder && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <MyDatePicker clickedDate={clickedApprovalDate} setClickedDate={setClickedApprovalDate} />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">Inspector Name </h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2 z-[5]">
                                                <h4 className="text-md font-light ">Status </h4>
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Scheduled', 'Completed', 'Pass', 'Fail']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">Notes</h4>
                                                <textarea  name="" id="" rows={3} className=' resize-none rounded-[3px] p-[10px] outline-none focus:border-blue-500 focus:border-2 border border-gray-400 w-full h-[100px]' ></textarea>
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
                                            ) : 'Submit'}

                                        </button>
                                    </span>

                                </div>}

                                {!addPermit && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">PT10001231</p>
                                    </span>
                                    <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                        {/* column one */}
                                        <div className="w-full flex flex-col items-start justify-start gap-[10px]">
                                            <p className="text-lg h-[35px] border-b border-gray-300 w-full text-start">Permit Details</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Permit Number:</p>
                                                    <p className="text-[15.5px] font-medium">PT10001231</p>
                                                </span>
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Date Submitted:</p>
                                                    <p className="text-[15.5px] font-medium">July 5, 2024</p>
                                                </span>
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Status:</p>
                                                    <p className="text-[15.5px] font-medium">Pending</p>
                                                </span>

                                                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                                    <p className="text-lg font-semibold">Approval Workflow</p>

                                                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-gray-400 ">
                                                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-400 ">
                                                            <p className="text-sm font-semibold w-[25%] px-2 ">Step</p>
                                                            <p className="text-sm font-semibold w-[20%] px-2 ">Date</p>
                                                            <p className="text-sm font-semibold w-[20%] px-2 ">Status</p>
                                                            <p className="text-sm font-semibold w-[35%] px-2 ">Comment</p>
                                                        </span>
                                                        <div className="w-full h-[160px] flex flex-col justify-start items-start overflow-y-auto">
                                                            <span className="w-full  flex flex-col justify-start items-start ">
                                                                {[1,2,3,4].map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="recent-activity-table-list" >
                                                                            <p className="text-sm w-[25%] px-2 ">Secondary Review</p>
                                                                            <p className="text-sm w-[20%] px-2 ">June 11, 2024</p>
                                                                            <p className="text-sm w-[20%] px-2 ">Pending Approval</p>
                                                                            <p className="text-sm w-[35%] px-2 ">inal approval granted </p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                                    <h4 className="text-md font-light ">Comments</h4>
                                                    <input type="text" name="" id="" className='normal-input' />
                                                </span>


                                                <span className="w-full flex flex-row items-start justify-between mt-[10px] gap-2">
                                                    <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                                        {loading ? (
                                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                            </svg>
                                                        ) : 'Submit'}

                                                    </button>

                                                    <button className=" w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={handleReject} disabled={rejectLoading}>
                                                        {loading ? (
                                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                            </svg>
                                                        ) : 'Reject'}

                                                    </button>

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

export default PermitApprovalModal