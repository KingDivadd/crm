'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader from '../imageUploader'

const ServiceTicketModal = ({showModal, setShowModal, selectedItem, setSelectedItem, show, setShow  }:DeleteTaskProps) => {
    const [project, setProject] = useState({comment: ''})
    const [updateBtn, setUpdateBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status:false,
    });
    const [dropElements, setDropElements] = useState({
        status:'Select Project',
    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'SELECT'});
    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }
    
    function handleChange(e:any){
        const name = e.target.name
        const value =  e.target.value
        setProject({...project, [name]:value})
    }

    function triggerAlert(message:string, type: string) {
        setAlert({message:message, type: type})
        setTimeout(() => {
            setAlert({message: '', type:''})
            setShowModal(false)
            setShow(false)
        }, 2000);
    }
    function handleSubmit(){
        if (false){

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    triggerAlert('Ticket Created Successfully', "success")
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
                <div className="w-full h-screen pt-[40px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[650px] mx-auto shadow-xl flex items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">
                                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  ">Ticket Information</p>
                                        <p className="text-lg font-semibold  text-blue-600 ">10021</p>
                                    </span>

                                    <span className="w-full flex flex-row items-center justify-start gap-3">
                                        <p className="text-md font-light">Job Number:</p>
                                        <p className="text-md ">JB1000123</p>
                                    </span>

                                    <span className="w-full flex flex-row items-center justify-start gap-3">
                                        <p className="text-md font-light">Description:</p>
                                        <p className="text-md ">Electrical Completion Pending</p>
                                    </span>

                                    <span className="w-full flex flex-row items-center justify-start gap-3">
                                        <p className="text-md font-light">Status:</p>
                                        <p className="text-md text-amber-600 ">In Progress</p>
                                    </span>

                                    <span className="w-full flex flex-row items-center justify-start gap-3">
                                        <p className="text-md font-light">Date Created:</p>
                                        <p className="text-md  ">June 15, 2024</p>
                                    </span>

                                    <span className="w-full flex flex-row items-center justify-start gap-3">
                                        <p className="text-md font-light">Due Created:</p>
                                        <p className="text-md ">June 27, 2024</p>
                                    </span>

                                    <span className="w-full flex flex-col items-start justify-start gap-3">
                                        <p className="text-md font-light">Comments:</p>
                                        {['Follow up with electrician', 'Confirm completion date'].map((data, ind)=>{
                                            return (
                                                <p key={ind} className="text-md ">{ind + 1}. {data}</p>
                                            )
                                        })}
                                    </span>


                                    <span className="w-full flex flex-col items-start justify-start gap-2 z-10">
                                        <h4 className="text-md font-light">Update Project Status</h4>
                                        <span className="h-[40px] w-full z-10">
                                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Open', 'In Progress', 'Pending', 'Completed', 'Closed']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                        </span>
                                    </span>

                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Add comment</h4>
                                        <input type="text" name='comment' className='normal-input' value={project.comment} onChange={handleChange} />
                                    </span>

                                    <span className="w-full flex items-center justify-end">
                                        <button className=" w-[150px] h-[45px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            ) : 'Save Changes'}
                                            
                                        </button>
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

export default ServiceTicketModal

