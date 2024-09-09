'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { DeleteTaskProps, UpdateTaskProps } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'

const InvoiceModal = ({ showModal, setShowModal, selectedItem, setSelectedItem, show, setShow, edit, setEdit }: UpdateTaskProps) => {

    const [filter, setFilter] = useState({date: '', date2: ''})
    const [clickedDate, setClickedDate] = useState('')
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
        status: false, priority:false, paymentMenthod:false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status', priority:'Priority', paymentMenthod:'Payment Method'
    })

    useEffect(() => {
        setFilter({...filter, date: clickedDate})
        setShowCalender(false)
    }, [clickedDate])


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
                triggerAlert('Invoice Updated Successfully', "success")
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
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-[20] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={edit ? "w-full h-screen pt-[20px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[70px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={edit ? "h-auto w-[92.5%] mx-auto shadow-xl flex items-start ": "h-auto w-[90%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                {edit && 
                                <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Update Invoice Details </p>
                                    </span>
                                    <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                        {/* column one */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Invoice Summary</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Invoice ID:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='IV1000...' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Customer Name:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='John Doe' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Amount ($):</p>
                                                    <span className="w-[65%] ">
                                                        <input type="number" name="" id="" placeholder='000' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Due Date:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="date" name="" id="" placeholder='000' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>


                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px] ">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Status:</p>
                                                    <span className="h-full w-[65%]">
                                                        <DropDownBlankTransparent
                                                            handleSelectDropdown={handleSelectDropdown}
                                                            title={'status'}
                                                            dropArray={['All', 'UnPaid', 'Paid', 'Overdue']}
                                                            dropElements={dropElements}
                                                            dropMenus={dropMenus}
                                                            handleDropMenu={handleDropMenu}
                                                            setDropElements={setDropElements}
                                                            setDropMenus={setDropMenus}
                                                        />
                                                    </span>
                                                </span>

                                                
                                            </div>
                                        </div>
                                        {/* column two */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Invoice Information</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Customer Name:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='John Doe' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Customer Address:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='123 Manhanttan Str.' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px] ">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Phone Number:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='09012345678' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Email:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="email" name="" id="" placeholder='johndoe@yopmail.com' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Job Number:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='JB10001...' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Contract ($):</p>
                                                    <span className="w-[65%] ">
                                                        <input type="number" name="" id="" placeholder='000' className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Contract Date:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="date" name="" id=""  className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Permit Number:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="text" name="" id="" placeholder='PT10001...'  className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Approved Date:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="date" name="" id=""  className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                            </div>
                                        </div>
                                        {/* column three */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Payment Information</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px] ">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Payment Method:</p>
                                                    <span className="h-full w-[65%]">
                                                        <DropDownBlankTransparent
                                                            handleSelectDropdown={handleSelectDropdown}
                                                            title={'paymentMenthod'}
                                                            dropArray={['Credit Card', 'Wire Transfer',]}
                                                            dropElements={dropElements}
                                                            dropMenus={dropMenus}
                                                            handleDropMenu={handleDropMenu}
                                                            setDropElements={setDropElements}
                                                            setDropMenus={setDropMenus}
                                                        />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Total Paid:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="number" name="" id="" placeholder='000'  className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2 h-[40px]">
                                                    <p className="text-[15.5px] font-normal w-[35%]">Total Due:</p>
                                                    <span className="w-[65%] ">
                                                        <input type="number" name="" id="" placeholder='000'  className="normal-input focus:bg-transaparent" />
                                                    </span>
                                                </span>
                                                
                                            </div>
                                        </div>

                                    </div>

                                    <span className="w-full flex flex-row items-start justify-between gap-2">
                                        <button className="rounded-[5px] h-[40px] w-[150px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCloseModal}>Close</button>

                                        <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Update'}

                                        </button>
                                    </span>
                                </div>}

                                {!edit && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Invoice Details</p>
                                    </span>
                                    <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                        {/* column one */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Invoice Summary</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Invoice ID:</p>
                                                    <p className="text-[15.5px] font-medium text-start">IV1000123</p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Customer Name:</p>
                                                    <p className="text-[15.5px] font-medium text-start">John Doe </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Amount:</p>
                                                    <p className="text-[15.5px] font-medium text-start">$500 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Due Date:</p>
                                                    <p className="text-[15.5px] font-medium text-start">July 20, 2024 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Status:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Unpaid </p>
                                                </span>

                                                
                                            </div>
                                        </div>
                                        {/* column two */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Invoice Information</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Customer Name:</p>
                                                    <p className="text-[15.5px] font-medium text-start">John Doe </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Customer Address:</p>
                                                    <p className="text-[15.5px] font-medium text-start">123 Main St, Anytown, USA</p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Phone Number:</p>
                                                    <p className="text-[15.5px] font-medium text-start">(555) 123-4567 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Email:</p>
                                                    <p className="text-[15.5px] font-medium text-start">john.doe@example.com  </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Job Number:</p>
                                                    <p className="text-[15.5px] font-medium text-start">JB1000123  </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Contract:</p>
                                                    <p className="text-[15.5px] font-medium text-start">$500  </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Contract Date:</p>
                                                    <p className="text-[15.5px] font-medium text-start">July 10, 2024 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Permit Number:</p>
                                                    <p className="text-[15.5px] font-medium text-start">PT1000123 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal"> Permit Approved Date:</p>
                                                    <p className="text-[15.5px] font-medium text-start">July 7, 2024 </p>
                                                </span>

                                                
                                            </div>
                                        </div>
                                        {/* column three */}
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[10px] ">
                                            <p className="text-[15.5px] h-[35px] flex items-center text-start font-medium border-b border-gray-300 w-full">Payment Information</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Payment Method:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Credit Cart</p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Total Paid:</p>
                                                    <p className="text-[15.5px] font-medium text-start">$500 </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Total Due:</p>
                                                    <p className="text-[15.5px] font-medium text-start">$0 </p>
                                                </span>
                                                
                                            </div>
                                        </div>

                                    </div>

                                    <span className="w-full flex flex-row items-start justify-end gap-2">
                                        <button className="rounded-[5px] h-[40px] w-[150px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCloseModal}>Close</button>
                                    </span>
                                </div> }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InvoiceModal