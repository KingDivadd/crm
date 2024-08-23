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
import { IoCheckmark } from 'react-icons/io5';


interface Job_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedTask: any;
    setSelectedTask: (selectedTask: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

interface FilteredJobsProps {
    lead: any;

}

interface TeamProps {
    jobs?: any;
    admin_team?:any, engineering_team?:any, permit_team?:any, electrical_team?:any
}

const Task_Management_Modal = ({ showModal, setShowModal, selectedTask, setSelectedTask, modalFor}: Job_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [show_job, setShow_job] = useState(false)
    
    const [all_teams, setAll_teams] = useState<TeamProps | null>(null)

    const [filtered_teams, setFiltered_teams] = useState<TeamProps | null>(null)
    const [selected_job, setSelected_job] = useState('')
    const [auth, setAuth] = useState({job_id: '', description: '', start_date: '', due_date: '', completion_date: '', note: '', team: '', task_assigned_to: '' })


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
        setAuth({...auth, [title]: dropdown.replace(/ /g, '').replace(/\//g,'').toLowerCase()})
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
            
        const filtered_items = filtered_teams?.jobs.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_teams(value === '' ? filtered_teams?.jobs : filtered_items);
    }
    
    useEffect(() => {
        if (modalFor == 'add'){
            get_all_jobs()
            get_all_jobs()
        }else if (modalFor == 'edit'){
            get_all_jobs()
            console.log('seleted job ',selectedTask)

            const { job, job_id, description, task_assigned_to, status, engineering_submitted, engineering_received, start_date, due_date, completion_date, note,  }  = selectedTask

            setAuth({...auth, job_id, description, task_assigned_to, start_date, completion_date, due_date, note})

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
                
                setAll_teams(response.data)

                setFiltered_teams(response.data)                
                
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
                
                const response = await post_auth_request(`job/create-task`, {job_id: auth.job_id, description: auth.description, start_date: auth.start_date, due_date: auth.due_date, status: 'PENDING', task_assigned_to: auth.task_assigned_to, note: auth.note})
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
                const response = await patch_auth_request(`job/edit-task/${selectedTask.task_id}`, {job_id: auth.job_id, description: auth.description, start_date: auth.start_date, due_date: auth.due_date, status: 'PENDING', task_assigned_to: auth.task_assigned_to, note: auth.note})
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
                                    <div className="w-full flex  items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">
                                        <p className="text-md font-semibold  text-slate-800 ">New Task </p>

                                        <div className=" flex flex-col items-self justify-self relative ">
                                            <span className="flex items-center justify-end gap-[10px]">

                                                {selected_job && <h4 className="text-sm flex items-center gap-[5px]">Selected Job: <p className="font-medium">{selected_job}</p> </h4>}

                                                <button className="text-sm text-slate-900 rounded-[3px] px-5 border border-gray-400 flex items-center h-[40px]" onClick={()=> {setShow_job(!show_job)}} >Select Job {show_job ?<FaCaretUp size={18} className='text-slate-600 mt-[2px]' /> : <FaCaretDown size={18} className='text-slate-600 mb-[3px]' />} </button>
                                            </span>

                                            {show_job && 
                                            <div className="w-[450px] absolute top-[45px] right-[0] z-2 shadow-md bg-white">

                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">Job Id</p>
                                                    <p className="text-sm w-[30%] px-2 ">Contract Amt</p>
                                                    <p className="text-sm w-[45%] px-2 ">Customer Name</p>
                                                    <p className="text-sm w-[5%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.jobs.reverse().map((data:any, ind:number)=>{

                                                        const {job_id, job_ind, contract_amount, lead} = data
                                                        const {customer_name} = lead
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, job_id: job_id }); setSelected_job(job_ind); setShow_job(!show_job) } }>
                                                                <p className="text-sm w-[20%] px-2 ">{job_ind}</p>
                                                                <p className="text-sm w-[30%] px-2 ">${Number(contract_amount).toLocaleString()}</p>
                                                                <p className="text-sm font-medium w-[45%] px-2 ">{customer_name}</p>
                                                                <span className="w-[5%] ">{auth.job_id == job_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                        </div>

                                    </div>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] h-full ">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Select Team</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'team'} dropArray={['Engineering', 'Electrical', 'General Permit', 'Admin / Hoa' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            {auth.team.toLowerCase() == 'electrrical' && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.electrical_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == 'engineering' && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.engineering_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == 'generalpermit' && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.permit_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == "adminhoa" && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.admin_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}
                                                    
                                       
                                            
                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Task Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
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
                                        <p className="text-md font-semibold  text-slate-800 ">Edit Task: <strong>{selectedTask.task_ind}</strong> </p>

                                    </span>

                                    <form  action="" className="w-full h-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] h-full ">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Select Team</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'team'} dropArray={['Engineering', 'General Permit', 'Admin / Hoa', 'Electrical' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            {auth.team.toLowerCase() == 'engineering' && <div className="w-full border border-gray-400">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.engineering_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == 'electrical' && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.electrical_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == "adminhoa" && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.admin_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == 'generalpermit' && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.permit_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}

                                            {auth.team.toLowerCase() == "adminhoa" && <div className="w-full ">
                                                <span className="w-full flex items-center justify-start h-[35px] bg-blue-600 text-white rounded-t-[5px] ">
                                                    <p className="text-sm w-[20%] px-2 ">User Id</p>
                                                    <p className="text-sm w-[45%] px-2 ">Staff Name</p>
                                                    <p className="text-sm w-[25%] px-2 ">Role</p>
                                                    <p className="text-sm w-[10%] px-2 "></p>
                                                </span>
                                                <div className="h-[285px] w-full flex flex-col items-start.justify-start rounded-b-[5px]  overflow-y-auto">
                                                    {filtered_teams?.admin_team.reverse().map((data:any, ind:number)=>{
                                                        const {user_ind, last_name, first_name, user_role, user_id} = data
                                                        return(
                                                            <span key={ind} className="h-[35px] flex items-center justify-start text-sm hover:bg-blue-100 cursor-pointer " onClick={()=> {setAuth({...auth, task_assigned_to: user_id })} }>
                                                                <p className="text-sm w-[20%] px-2 ">{user_ind}</p>
                                                                <p className="text-sm w-[45%] px-2 flex items-center gap-[5px]">{last_name} {first_name}</p>
                                                                <p className="text-sm w-[25%] px-2 ">{user_role}</p>
                                                                <span className="w-[10%] flex justify-end items-center ">{auth.task_assigned_to == user_id && <IoCheckmark size={19} className='text-blue-700' />} </span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>}
                                                    

                                        </div>

                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Task Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['PENDING', 'IN PROGRESS', 'COMPLETED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

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

                                            <button className="w-full h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={update_task} >
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Task_Management_Modal