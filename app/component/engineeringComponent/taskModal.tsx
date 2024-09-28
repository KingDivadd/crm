'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FileUploader, FileViewer, FlexibleImageUploader } from '../imageUploader'
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
    const [task, setTask] = useState({job_id: '', engineering_drawing_upload: [], comments: ''})    

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

    useEffect(()=>{

        const {job} = selectedTask

        const {comments, engineering_drawing_upload} = selectedTask
        

        setTask({...task, job_id:job.job_id, comments, engineering_drawing_upload })

        console.log(selectedTask.job.project[0].engineering_drawing_upload[0])

    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setTask({...task, [name]:value})

    }

    function handleCloseModal() {
        setShowModal(false)
    }

    const handleFileUpload = (fileUrl:string) => {
        const box:any = task.engineering_drawing_upload
        box.push(fileUrl)
        setTask({...task, engineering_drawing_upload: box})
    };

    async function upload_engineering_document(e:any) {
        e.preventDefault()
        
        if(!task.engineering_drawing_upload.length){
            showAlert('Please select a file', 'warning')
        }else{
            try {
                setLoading(true)
                
                const response = await patch_auth_request(`app/upload-engineering-drawing/${selectedTask.task_id}`, task)
        
                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setShowModal(false)
                    
                    setLoading(false)
    
                }else{       
    
                    showAlert(response.response.data.err, "error")
    
                    setLoading(false)
    
                }
            } catch (err) {
                showAlert('Error occured ', 'error')
                setLoading(false)
            }
        }
    
    }

    async function update_task(e:any) {
        e.preventDefault()
        
        if(!task.engineering_drawing_upload.length){
            showAlert('Please select a file', 'warning')
        }else{
            try {
                setLoading(true)
                
                const response = await patch_auth_request(`app/upload-engineering-drawing/${selectedTask.task_id}`, task)
        
                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setShowModal(false)
                    
                    setLoading(false)
    
                }else{       
    
                    showAlert(response.response.data.err, "error")
    
                    setLoading(false)
    
                }
            } catch (err) {
                showAlert('Error occured ', 'error')
                setLoading(false)
            }
        }
    
    }



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

                                {(modalFor == 'upload' || modalFor == 'edit') && 
                                <div className="w-[70vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">

                                    <div className="w-full h-[45px] flex items-center justify-between border-b border-slate-300">
                                        <p className="text-[16.5px] font-medium ">Upload Document</p>
                                    </div>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[25px]">

                                        <div className="w-1/2 h-[68vh] flex flex-col items-start justify-between gap-[20px] overflow-y-auto ">
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Task Id</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">TS0001 </p>
                                            </span>
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Job Id</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">JB0001 </p>
                                            </span>

                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Attached</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Free Standing</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached == 'freestanding' ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cantilever</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached == 'cantilever' ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Struture Type</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].structure_type}</p>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">End Cap Style</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].end_cap_style || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cover Size</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].cover_size || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cover Color</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].cover_color || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Trim Color</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].trim_color || '-'}</p>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[12.5px] ">
                                                <p className="text-[15px] text-slate-900">Comments</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='comments' onChange={handle_change} value={task.comments} className='normal-input text-[15px]' />
                                                </span>
                                            </span>
                                        
                                        </div>

                                        <div className="w-1/2 h-[68vh] flex flex-col items-between justify-between gap-[15px] overflow-y-auto ">

                                            <div className="w-full flex items-start justify-start ">
                                                <FileUploader id='engineering_document' title='Engineering Document' url={selectedTask.job.project[0].engineering_drawing_upload[0] || 'https://www.nicepng.com/png/detail/350-3500673_default-upload-upload-image-png.png'} onFileUpload={handleFileUpload}   />
                                            </div>

                                            {modalFor == 'upload' ? 
                                        
                                                <button className="w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center"  disabled={loading} onClick={upload_engineering_document} >
                                                    {loading ? (
                                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                    ) : 'Upload'}

                                                </button>
                                                :
                                                <button className="w-full h-[40px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center"  disabled={loading} onClick={update_task} >
                                                    {loading ? (
                                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                    ) : 'Update'}

                                                </button>    
                                            }

                                        </div>

                                    </form>


                                </div>
                                }

                                {modalFor == 'view' && 
                                <div className="w-[70vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">

                                    <div className="w-full h-[45px] flex items-center justify-between border-b border-slate-300">
                                        <p className="text-[16.5px] font-medium ">{selectedTask.task_ind}</p>
                                    </div>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[25px]">

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[17.5px] ">
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Task Id</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">TS0001 </p>
                                            </span>
                                        
                                            <span className="w-full flex items-center justify-start">
                                                <p className="text-[15px] w-[35%] ">Job Id</p>
                                                <p className="text-[15.5px] w-[65%] font-medium ">JB0001 </p>
                                            </span>

                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Attached</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Free Standing</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached == 'freestanding' ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cantilever</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].attached == 'cantilever' ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Struture Type</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].structure_type}</p>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">End Cap Style</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].end_cap_style || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cover Size</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].cover_size || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Cover Color</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].cover_color || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Trim Color</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.job.project[0].trim_color || '-'}</p>
                                            </span>

                                        
                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[17.5px] ">
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Required Action</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.required_action || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[35%] ">Comments</p>
                                                <p className="text-sm w-[65%] font-medium ">{selectedTask.comments || '-'}</p>
                                            </span>

                                            <div className="w-full  flex items-start justify-start ">
                                                <FileViewer id='engineering_document' title='Engineering Document' url={selectedTask.job.project[0].engineering_drawing_upload[0] || 'https://www.nicepng.com/png/detail/350-3500673_default-upload-upload-image-png.png'} onFileUpload={handleFileUpload}   />
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