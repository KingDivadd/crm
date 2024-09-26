'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FileUploader, FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix} from "../helper"
import { IoCheckmark } from 'react-icons/io5';


interface Job_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedTask: any;
    setSelectedTask: (selectedTask: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}


const TaskModal = ({ showModal, setShowModal, selectedTask, setSelectedTask, modalFor}: Job_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [loadingtwo, setLoadingtwo] = useState(false)
    const [show_job, setShow_job] = useState(false)
    

    const [selected_job, setSelected_job] = useState('')


    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false, engineering_status: false, permit_status: false, status: false, team: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition', engineering_status: 'Engineering Status', permit_status: 'Permit Status', status: 'Status', team: 'Select Assigned Team'
    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Select'});
        
    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        
        // setAuth({...auth, [title]: dropdown.replace(/ /g, '').replace(/\//g,'').toLowerCase()})
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

    }

    function handleCloseModal() {
        setShowModal(false)
    }

    const handleFileUpload = (fileUrl:string) => {
        // const box:any = auth.contract_document
        // box.push(fileUrl)
        // setAuth({...auth, contract_document: box})
    };


    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={"w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {modalFor == 'upload' && 
                                <div className="w-[70vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">

                                    <div className="w-full h-[45px] flex items-center justify-between border-b border-slate-300">
                                        <p className="text-[16.5px] font-medium ">Upload Document</p>
                                    </div>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[15px]">

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Task Id:</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">TS0001 </p>
                                            </span>
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Job Id:</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">JB0001 </p>
                                            </span>
                                        
                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[25px] ">

                                            <div className="w-full min-h-[400px] flex items-start justify-start ">
                                                <FileUploader id='engineering_document' title='Engineering Document' url='' onFileUpload={handleFileUpload}   />
                                            </div>

                                        </div>

                                    </form>

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

export default TaskModal