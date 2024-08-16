'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix} from "../helper"


interface Job_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedTask: any;
    setSelectedTask: (selectedTask: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const Task_Management_Modal = ({ showModal, setShowModal, selectedTask, setSelectedTask, modalFor}: Job_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_jobs, setAll_jobs] = useState([])
    const [filtered_jobs, setFiltered_jobs] = useState([])
    const [show_all_lead, setShow_all_lead] = useState(false)
    const [selected_job, setSelected_job] = useState('')
    const [auth, setAuth] = useState({job_id: '', description: '', start_date: '', due_date: '', completion_date: '', note: '', assigned_to: '' })


    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false, engineering_status: false, permit_status: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition', engineering_status: 'Engineering Status', permit_status: 'Permit Status', status: 'Status'
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
        setAuth({...auth, [title]: dropdown.replace(/ /g, '_').toUpperCase()})
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

        setAuth({...auth, [name]: value})
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function filter_user(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value
            
        const filtered_items = all_jobs.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_jobs(value === '' ? all_jobs : filtered_items);
    }
    
    useEffect(() => {
        if (modalFor == 'add'){
            get_all_jobs()
            get_all_jobs()
        }else if (modalFor == 'edit'){
            get_all_jobs()
            console.log('seleted job ',selectedTask)

            const { job, job_id, description, assigned_to, status, engineering_submitted, engineering_received, start_date, due_date, completion_date, note,  }  = selectedTask

            setAuth({...auth, job_id, description, assigned_to, start_date, completion_date, due_date, note})

            setSelected_job(job.job_ind)

            // setSelected_job()
        }
    }, [])

    const handlefilter = (e:any)=>{
        const value = e.target.value


    }


    async function get_all_jobs() {
        try {
            const response = await get_auth_request(`user/jobs`)
            if (response.status == 200 || response.status == 201){

                setAll_jobs(response.data.jobs)

                setFiltered_jobs(response.data.jobs)

                console.log('lead ', response.data.jobs);
                
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_task(e:any) {
        e.preventDefault()
        console.log('auth', auth)
        if (!auth.description || !auth.job_id) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(`job/create-task`, {job_id: auth.job_id, description: auth.description, start_date: auth.start_date, due_date: auth.due_date, status: 'PENDING', assigned_to: auth.assigned_to, note: auth.note})
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
        if (!auth.description || !auth.job_id) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                console.log('auth. ', auth)
                const response = await patch_auth_request(`job/edit-task/${selectedTask.task_id}`, {job_id: auth.job_id, description: auth.description, start_date: auth.start_date, due_date: auth.due_date, status: 'PENDING', assigned_to: auth.assigned_to, note: auth.note})
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

    async function delete_job(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            
            const response = await delete_auth_request(`job/delete-job/${selectedTask.job_id}`)
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

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[35px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-blue-700 ">Delete Job</p>

                                        
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-md font-normal text-center  ">Are you sure you want to delete job  assigned to lead <strong className='text-blue-600'>{selectedTask.lead.customer_name} </strong> </p>
                                            
                                        <p className="text-xs text-red-500 flex items-center justify-center gap-2 "> <CiWarning size={20} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-blue-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center"  disabled={loading} onClick={delete_job} >
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

                                </div>}

                                {modalFor == 'add' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">
                                        <p className="text-md font-semibold  text-slate-800 ">New Task </p>

                                    </span>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] h-full ">
                                            <span className="w-full h-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Select Job</p>

                                                <span className="h-[40px] w-full rounded-[5px] text-sm flex items-center justify-center border border-slate-400">
                                                    JB000{selected_job}
                                                </span>

                                                {/* <span className="h-[40px] w-full ">
                                                    <input type="text" name='' value={auth.due_date} placeholder='Enter job number' onChange={handlefilter} className='normal-input text-sm' />
                                                </span> */}


                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-[5px] bg-slate-100 overflow-y-auto">
                                                    {filtered_jobs.reverse().map((data, ind)=>{
                                                        const {job_id, job_ind} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start gap-3 px-2 text-[15px] hover:bg-slate-300 cursor-pointer" onClick={()=> {setAuth({...auth, job_id: job_id }); setSelected_job(job_ind) } }>
                                                                {ind + 1}. JB000{job_ind}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </span>
                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Task Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Assigned To</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='assigned_to' value={auth.assigned_to} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            {/* <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['PENDING', 'IN PROGRESS', 'COMPLETED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span> */}

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Start Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='start_date' value={auth.start_date} placeholder='yyyy-mm-dd' onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Due Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='due_date' value={auth.due_date} placeholder='yyyy-mm-dd' onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Note</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='note' value={auth.note} placeholder={'Enter note'} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <button className="w-full h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={create_task} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Create Task'}

                                            </button>
                                            
                                        </div>

                                    </form>

                                </div>
                                }

                                {modalFor == 'edit' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">
                                        <p className="text-md font-semibold  text-slate-800 ">Edit Task </p>

                                    </span>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] h-full ">
                                            <span className="w-full h-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Select Job</p>

                                                <span className="h-[40px] w-full rounded-[5px] text-sm flex items-center justify-center border border-slate-400">
                                                    JB000{selected_job}
                                                </span>

                                                {/* <span className="h-[40px] w-full ">
                                                    <input type="text" name='' value={auth.due_date} placeholder='Enter job number' onChange={handlefilter} className='normal-input text-sm' />
                                                </span> */}


                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-[5px] bg-slate-100 overflow-y-auto">
                                                    {filtered_jobs.reverse().map((data, ind)=>{
                                                        const {job_id, job_ind} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start gap-3 px-2 text-[15px] hover:bg-slate-300 cursor-pointer" onClick={()=> {setAuth({...auth, job_id: job_id }); setSelected_job(job_ind) } }>
                                                                {ind + 1}. JB000{job_ind}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </span>
                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Task Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Assigned To</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='assigned_to' value={auth.assigned_to} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            {/* <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['PENDING', 'IN PROGRESS', 'COMPLETED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span> */}

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Start Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='start_date' value={auth.start_date} placeholder='yyyy-mm-dd' onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Due Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='due_date' value={auth.due_date} placeholder='yyyy-mm-dd' onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Note</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='note' value={auth.note} placeholder={'Enter note'} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <button className="w-full h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-700 flex items-center justify-center text-sm "  disabled={loading} onClick={update_task} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Update Task'}

                                            </button>
                                            
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

export default Task_Management_Modal