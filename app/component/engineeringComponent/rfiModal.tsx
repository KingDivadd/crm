'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { DeleteTaskProps } from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { FilesUpload } from '../imageUploader'
import MyDatePicker from '../datePicker'

const RfiModal = ({ showModal, setShowModal, selectedItem, setSelectedItem, show, setShow }: DeleteTaskProps) => {
    const [billSheet, setBillSheet] = useState({ jobNumber: '', task: '', crew: '', date: '', amount: '' })
    const [addPermit, setAddPermit] = useState(false)
    const [newPermit, setNewPermit] = useState({ submittedDate: '', approvalDate: '', permitImage: '', requestDate: false, showApprovalDateCaleder: false })
    const [addRfiRes, setAddRfiRes] = useState(false)
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
        setNewPermit({ ...newPermit, submittedDate: clickedSubmittedDate, requestDate: false })
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
                triggerAlert('Permit Approved', "success")
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

    function addRfiResponse(){
        setAddRfiRes(true)
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
                <div className={addPermit ? "w-full h-screen pt-[30px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[70px] rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={addPermit ? "h-auto w-[70%] mx-auto shadow-xl flex items-start ": "h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                {addPermit && 
                                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">Add New RFI</p>
                                    </span>

                                    <div className="w-full flex flex-row items-start justify-start gap-[20px]">
                                        <div className="w-1/2 flex flex-col gap-[10px]">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">Project name</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">

                                                <h4 className="text-md font-light ">Request Date</h4>
                                                <div className="w-full flex flex-col items-end justify-end relative z-[15] ">
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
                                                <h4 className="text-md font-light ">Requested By</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">RFI Subject</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2 z-[5]">
                                                <h4 className="text-md font-light ">Priority </h4>
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'priority'} dropArray={['Low', 'Medium', 'High']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">RFI Description</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>


                                        </div>

                                        <div className="w-1/2 flex flex-col gap-[10px]">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">

                                                <h4 className="text-md font-light ">Due Date</h4>
                                                <div className="w-full flex flex-col items-end justify-end relative z-[15] ">
                                                    <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={() => { setNewPermit({ ...newPermit, requestDate: !newPermit.requestDate }) }}>
                                                        {newPermit.requestDate ? newPermit.requestDate : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {newPermit.requestDate ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {newPermit.requestDate && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <MyDatePicker clickedDate={clickedApprovalDate} setClickedDate={setClickedApprovalDate} />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <h4 className="text-md font-light ">Assigned To</h4>
                                                <input type="text" name="" id="" className='normal-input' />
                                            </span>

                                            <span className="w-full h-[320px] ">
                                                <FilesUpload id='files' title='Attachemnt' url='' key={12} image={''} />
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

                                <>

                                    {addRfiRes ?  

                                        <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full bg-transparent ">

                                                <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                                    <p className="text-lg font-semibold  text-blue-600 ">RFI Response</p>
                                                </span>
                                                <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                                    {/* column one */}
                                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[10px]">
                                                        <span className="w-full flex flex-row items-center justify-start gap-2">
                                                            <p className="text-[15.5px] font-normal">RFI ID:</p>
                                                            <p className="text-[15.5px] font-medium text-start">RF1000123 </p>
                                                        </span>
                                                        
                                                        <span className="w-full flex flex-row items-center justify-start gap-2">
                                                            <p className="text-[15.5px] font-normal">Project:</p>
                                                            <p className="text-[15.5px] font-medium text-start">Project A </p>
                                                        </span>

                                                        <span className="w-full flex flex-row items-center justify-start gap-2">
                                                            <p className="text-[15.5px] font-normal">Request Date:</p>
                                                            <p className="text-[15.5px] font-medium text-start">July 5, 2024</p>
                                                        </span>

                                                        <span className="w-full flex flex-row items-center justify-start gap-2">
                                                            <p className="text-[15.5px] font-normal">Status:</p>
                                                            <p className="text-[15.5px] font-medium text-start">Pending</p>
                                                        </span>

                                                        <span className="w-full flex flex-row items-center justify-start gap-2">
                                                            <p className="text-[15.5px] font-normal">Priority:</p>
                                                            <p className="text-[15.5px] font-medium text-start">High</p>
                                                        </span>

                                                        <div className="w-full flex flex-col items-start justify-start gap-2 border-t border-gray-300 pt-1 ">
                                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                                <h4 className="text-md font-light ">Comments/Notes</h4>
                                                                <textarea  name="" id=""  className=' resize-none rounded-[3px] p-[10px] outline-none focus:border-blue-500 focus:border-2 border border-gray-400 w-full h-[75px]' ></textarea>
                                                            </span>

                                                           
                                                            
                                                            <div className="w-full flex flex-col items-start justify-start">
                                                                <p className="text-[15.5px] font-medium">Responses</p>
                                                                <span className="flexf flex-col items-start justify-star">
                                                                    {[{title: 'Date', value: '2024-07-02'}, {title: 'Message', value: ' Additional details will be provided shortly.'}].map((data, ind)=>{
                                                                        return(
                                                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-2">
                                                                                <p className="text-[14.5px] font-normal">{ind + 1}. {data.title}</p>
                                                                                <p className="text-[14.5px] font-normaltext-start">{data.value} </p>
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </span>

                                                            </div>


                                                           
                                                            
                                                        </div>
                                                    </div>

                                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">
                                                        <div className="w-full flex flex-col items-start justify-start">
                                                            <p className="text-[15.5px] font-medium">Attachment</p>
                                                            <span className="flexf flex-col items-start justify-star">
                                                                {['Structural_Design_WestWing.pdf ', 'Structural_Design_WestWing.pdf '].map((data, ind)=>{
                                                                    return(
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-2">
                                                                            <p className="text-[14.5px] font-normal cursor-pointer hover:text-blue-600">{ind + 1}. {data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>

                                                        </div>

                                                        <span className="w-full h-[340px] flex flex-col items-start justify-start gap-2">
                                                            <FilesUpload id={'user-image'} title={"Choose a file"} url={''} image={''} />
                                                        </span>

                                                    </div>

                                                </div>

                                                <span className="w-full flex flex-row items-center justify-between gap-2 mt-[10px] ">
                                                    <button className="rounded-[5px] h-[40px] w-[150px] bg-amber-600 hover:bg-amber-700 text-white" onClick={()=> setAddRfiRes(!addRfiRes)}>Back</button>


                                                    <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                                        {loading ? (
                                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                            </svg>
                                                        ) : 'Submit'}

                                                    </button>

                                                </span>
                                            
                                        </div>

                                    :
                                    
                                    <div className="w-full flex flex-col items-start justify-start gap-[10px]  h-full ">
                                        <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                            <p className="text-lg font-semibold  text-blue-600 ">RFI Details</p>
                                        </span>
                                        <div className="w-full flex flex-row items-start justify-between gap-[15px] ">
                                            {/* column one */}
                                            <div className="w-full flex flex-col items-start justify-start gap-[10px]">
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">RFI ID:</p>
                                                    <p className="text-[15.5px] font-medium text-start">RF1000123 </p>
                                                </span>
                                                
                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Project:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Project A </p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Request Date:</p>
                                                    <p className="text-[15.5px] font-medium text-start">July 5, 2024</p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Status:</p>
                                                    <p className="text-[15.5px] font-medium text-start">Pending</p>
                                                </span>

                                                <span className="w-full flex flex-row items-center justify-start gap-2">
                                                    <p className="text-[15.5px] font-normal">Priority:</p>
                                                    <p className="text-[15.5px] font-medium text-start">High</p>
                                                </span>

                                                <div className="w-full flex flex-col items-start justify-start gap-2 border-t border-gray-300 pt-1 ">
                                                    <span className="w-full flex flex-row items-center justify-start gap-2">
                                                        <p className="text-[15.5px] font-normal">Description:</p>
                                                        <p className="text-[15.5px] font-medium text-start">Please provide additional details on the structural design for the west wing. </p>
                                                    </span>

                                                <div className="w-full flex flex-col items-start justify-start">
                                                        <p className="text-[15.5px] font-medium">Attachment</p>
                                                        <span className="flexf flex-col items-start justify-star">
                                                            {['Structural_Design_WestWing.pdf ', 'Structural_Design_WestWing.pdf '].map((data, ind)=>{
                                                                return(
                                                                    <span key={ind} className="w-full flex flex-row items-center justify-start gap-2">
                                                                        <p className="text-[14.5px] font-normal cursor-pointer hover:text-blue-600">{ind + 1}. {data}</p>
                                                                    </span>
                                                                )
                                                            })}
                                                        </span>

                                                </div>
                                                    
                                                <div className="w-full flex flex-col items-start justify-start">
                                                        <p className="text-[15.5px] font-medium">Responses</p>
                                                        <span className="flexf flex-col items-start justify-star">
                                                            {[{title: 'Date', value: '2024-07-02'}, {title: 'Message', value: ' Additional details will be provided shortly.'}].map((data, ind)=>{
                                                                return(
                                                                    <span key={ind} className="w-full flex flex-row items-center justify-start gap-2">
                                                                        <p className="text-[14.5px] font-normal">{ind + 1}. {data.title}</p>
                                                                        <p className="text-[14.5px] font-normaltext-start">{data.value} </p>
                                                                    </span>
                                                                )
                                                            })}
                                                        </span>

                                                </div>


                                                    <span className="w-full flex flex-row items-center justify-between gap-2 mt-[10px] ">
                                                    <button className="rounded-[5px] h-[40px] w-[150px] bg-blue-600 hover:bg-blue-700 text-white" onClick={addRfiResponse} >Add Response</button>

                                                    <button className="rounded-[5px] h-[40px] w-[150px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCloseModal}>Close</button>
                                                    </span>
                                                    
                                                </div>
                                            </div>
                                            {/* column two */}

                                        </div>
                                    </div>}


                                </>
                                
                                
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RfiModal