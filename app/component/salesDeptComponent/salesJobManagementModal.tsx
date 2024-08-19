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
    selectedJob: any;
    setSelectedJob: (selectedJob: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const Job_Management_Modal = ({ showModal, setShowModal, selectedJob, setSelectedJob, modalFor}: Job_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_leads, setAll_leads] = useState([])
    const [filtered_leads, setFiltered_leads] = useState([])
    const [show_all_lead, setShow_all_lead] = useState(false)
    const [selected_lead, setSelected_lead] = useState('')
    const [role, setRole] = useState('')


    const [auth, setAuth] = useState({lead_id: '', contract_amount: '', contract_date: '', hoa_status: '', hoa_sent_date: '', hoa_approval_date: '', engineering_submitted: '', engineering_received: '', permit_sent_date: '', permit_approved_date: '', cover_color: '', cover_size: '', engineering_status: '', permit_status: '', attached: '', structure_type: '', description: '', end_cap_style: '', trim_color: '', permit_number: '',   })

    const [showCalenders, setShowCalenders] = useState({contract_date: false, engineering_sub_date: false, engineering_received_date: false, permit_sent_date: false, permit_approved_date: false})

    const [clicked_date, setClicked_date] = useState({contract_date: '', engineering_sub_date: '', engineering_received_date: '', permit_sent_date: '', permit_approved_date: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false, hoa_status: false, engineering_status: false, permit_status: false, attached: false,structure_type: false, 
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition', hoa_status: 'HOA Status',  engineering_status: 'Engineering Status', permit_status: 'Permit Status', attached: 'Attached', structure_type: 'Structure Type',

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
        if (title == 'attached'){
            const value = dropdown.toLowerCase() == 'true' ? true : false
            console.log(' hello ', title, ' : ', value);

            setAuth({...auth, [title]: value})
            setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
        }else{

            setAuth({...auth, [title]: dropdown.replace(/ /g, '_').toUpperCase()})
            setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
        }
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
            
        const filtered_items = all_leads.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_leads(value === '' ? all_leads : filtered_items);
    }
    
    useEffect(() => {
        const user_role = localStorage.getItem('user-role')
        
        setRole(user_role || 'sales')
        if (modalFor == 'add'){
            get_all_leads()
        }else if (modalFor == 'edit'){
            get_all_leads()
            console.log('seleted job ',selectedJob)
            const {job_ind, lead_id, lead, contract_amount, contract_date, hoa_status, engineering_status, engineering_submitted, engineering_received, permit_sent_date, permit_approved_date, cover_color, cover_size, permit_status } = selectedJob

            
            setAuth({...auth,  lead_id, contract_amount: String(contract_amount), contract_date, hoa_status, engineering_submitted, engineering_received, permit_sent_date, permit_approved_date, cover_color, cover_size, engineering_status, permit_status })

            setDropElements({...dropElements, permit_status: permit_status.replace(/_/g, ' '), engineering_status: engineering_status.replace(/_/g, ' '), hoa_status: hoa_status.replace(/_/g, ' ')}); 

            setSelected_lead(lead.customer_name)
        }
    }, [])

    async function get_all_leads() {
        try {
            const response = await get_auth_request(`user/leads`)
            if (response.status == 200 || response.status == 201){

                setAll_leads(response.data.leads)

                setFiltered_leads(response.data.leads)

                console.log('lead ', response.data.leads);
                
                            
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_job(e:any) {
        e.preventDefault()
        console.log('auth', auth)
        if (!auth.contract_amount || !auth.contract_date || !auth.hoa_status || !auth.engineering_status || !auth.lead_id) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(`job/create-job`, auth)
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

    async function update_job(e:any) {
        e.preventDefault()
        if (!auth.contract_amount || !auth.contract_date || !auth.hoa_status || !auth.permit_status || !auth.lead_id) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                console.log('auth. ', auth)
                const response = await patch_auth_request(`job/edit-job/${selectedJob.job_id}`, auth)
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
            
            const response = await delete_auth_request(`job/delete-job/${selectedJob.job_id}`)
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
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[25px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={modalFor == 'delete' ?  "h-auto w-[70%] mx-auto shadow-xl flex items-start ":  "h-auto w-[85%] mx-auto shadow-xl flex items-start "}>
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
                                        <p className="text-md font-normal text-center  ">Are you sure you want to delete job  assigned to lead <strong className='text-blue-600'>{selectedJob.lead.customer_name} </strong> </p>
                                            
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
                                        <p className="text-md font-semibold  text-slate-800 ">New Job </p>

                                        <div className="relative flex items-start justify-center">
                                            <div className="flex items-center justify-center gap-5">
                                                {selected_lead && <span className="flex items-center justify-start gap-2">
                                                    <p className="text-sm">Lead name:</p>
                                                    <p className="text-sm font-semibold">{selected_lead}</p>
                                                </span>}

                                                <span className="h-[40px] rounded-[3px] flex items-center justify-center text-sm border border-slate-600 px-5 cursor-pointer flex items-center gap-[5px]" onClick={()=> setShow_all_lead(!show_all_lead)}>Select Lead <span className="h-full flex items-center"> {show_all_lead ? <FaCaretUp size={22} className='text-slate-700' /> :  <FaCaretDown size={20} className='text-slate-700' />} </span>  </span>
                                            </div>

                                            {show_all_lead && 
                                            <div className="absolute top-[45px] right-0  w-[300px]">
                                                <span className="h-[40px] w-full ">
                                                        <input type="hoa_status" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-sm' />
                                                </span>

                                                <div className="w-full h-[315px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-white shadow-md rounded-[5px] ">
                                                        <div className="w-full flex flex-col items-start justify-start">
                                                            {filtered_leads.map((data, ind)=>{
                                                                const {customer_name, customer_contract_date, hoa_status, lead_id } = data
                                                                return(
                                                                    <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-100 px-[10px] gap-[10px] rounded-[3px] " onClick={()=> {setSelected_lead(customer_name); setAuth({...auth, lead_id: lead_id}); setShow_all_lead(!show_all_lead) }}>

                                                                        <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer "  >

                                                                            <p className="text-start text-sm text-slate-900 " >{ind + 1}. </p>


                                                                            <p className=" text-start text-sm text-slate-900 font-semibold " > {customer_name} </p>

                                                                        </span>
                                                                            
                                                                        <p key={ind} className=" text-start text-sm text-slate-900 text-end " > {} </p>


                                                                    </span>
                                                                )
                                                            })}

                                                        </div>
                                                </div>

                                            </div>}
                                        </div> 

                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] ">
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Amount</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_amount' value={Number(auth.contract_amount.replace(/,/g,'')).toLocaleString()} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_date' placeholder='yyyy-mm-dd' value={auth.contract_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">HOA Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'hoa_status'} dropArray={['PENDING', 'SENT', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'engineering_status'} dropArray={['SUBMITTED', 'NOT REQUIRED', 'REVISION REQUIRED', 'APPROVED', 'REJECTED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Submition Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_submitted' placeholder='yyyy-mm-dd' value={auth.engineering_submitted} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Received Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_received' placeholder='yyyy-mm-dd' value={auth.engineering_received} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                        </div>

                                        <div className="w-1/3 flex flex-col item-start justify-start gap-[20px]">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'permit_status'} dropArray={['SUBMITTED', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Sent Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='permit_sent_date' placeholder='yyyy-mm-dd' value={auth.permit_sent_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Approval Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='permit_approved_date' placeholder='yyyy-mm-dd' value={auth.permit_approved_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover size</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_size' value={auth.cover_size} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_color' value={auth.cover_color} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                          
                                        </div>
                                        
                                        <div className="w-1/3 flex flex-col item-start justify-start gap-[20px]">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Attached</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'attached'} dropArray={['True', 'False' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Struture Type</p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'structure_type'} dropArray={['IRP', 'LATTICE', 'COMBO', 'FLAT PAN', 'LOUVER', 'HYBRID', 'OTHER' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' disabled={auth.structure_type !== 'OTHER' } placeholder='' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">End Cap Style</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='end_cap_style' value={auth.end_cap_style} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Trim color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='trim_color' value={auth.trim_color} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-white">.</p>
                                                
                                                    <button className=" w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={create_job} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Create job'}

                                                </button>
                                            </span>

                                            
                                        </div>
                                        
                                    </form>

                                </div>
                                }

                                {modalFor == 'edit' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">
                                        <p className="text-md font-semibold  text-slate-800 ">Edit Job: <strong>{selectedJob.job_ind}</strong> </p>

                                        {role == 'sale' && 
                                        <div className="relative flex items-start justify-center">
                                            <div className="flex items-center justify-center gap-5">
                                                {selected_lead && <span className="flex items-center justify-start gap-2">
                                                    <p className="text-sm">Lead name:</p>
                                                    <p className="text-sm font-semibold">{selected_lead}</p>
                                                </span>}

                                                <span className="h-[40px] rounded-[5px] flex items-center justify-center text-sm border border-slate-600 px-5 cursor-pointer" onClick={()=> setShow_all_lead(!show_all_lead)}>Select Lead</span>
                                            </div>

                                            {show_all_lead && 
                                            <div className="absolute top-[45px] right-0  w-[300px]">
                                                <span className="h-[40px] w-full ">
                                                        <input type="hoa_status" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-sm' />
                                                </span>

                                                <div className="w-full h-[315px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-white shadow-md rounded-[5px] ">
                                                        <div className="w-full flex flex-col items-start justify-start">
                                                            {filtered_leads.map((data, ind)=>{
                                                                const {customer_name, customer_contract_date, hoa_status, lead_id } = data
                                                                return(
                                                                    <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-100 px-[10px] gap-[10px] rounded-[3px] " onClick={()=> {setSelected_lead(customer_name); setAuth({...auth, lead_id: lead_id}); setShow_all_lead(!show_all_lead) }}>

                                                                        <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer "  >

                                                                            <p className="text-start text-sm text-slate-900 " >{ind + 1}. </p>


                                                                            <p className=" text-start text-sm text-slate-900 font-semibold " > {customer_name} </p>

                                                                        </span>
                                                                            
                                                                        <p key={ind} className=" text-start text-sm text-slate-900 text-end " > {} </p>


                                                                    </span>
                                                                )
                                                            })}

                                                        </div>
                                                </div>

                                            </div>}
                                        </div>}

                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] ">
                                            {role == 'sales' && <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Amount</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_amount' value={Number(String(auth.contract_amount).replace(/,/g,'')).toLocaleString()} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>}

                                            {role == 'sales' && <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_date'  placeholder='yyyy-mm-dd' value={auth.contract_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>}
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">HOA Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'hoa_status'} dropArray={['PENDING', 'SENT', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            {role !== 'sales' && <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Hoa Sent Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='hoa_sent_date' placeholder='yyyy-mm-dd' value={auth.hoa_sent_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>}

                                            {role !== 'sales' && <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Hoa Approval Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='hoa_approval_date' placeholder='yyyy-mm-dd' value={auth.hoa_approval_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>}

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'engineering_status'} dropArray={['SUBMITTED', 'NOT REQUIRED', 'REVISION REQUIRED', 'APPROVED', 'REJECTED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Submition Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_submitted' placeholder='yyyy-mm-dd' value={auth.engineering_submitted} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Engineering Received Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_received' placeholder='yyyy-mm-dd' value={auth.engineering_received} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                        </div>

                                        <div className="w-1/3 flex flex-col item-start justify-start gap-[20px]">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Status</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'permit_status'} dropArray={['SUBMITTED', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Sent Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='permit_sent_date' placeholder='yyyy-mm-dd' value={auth.permit_sent_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Permit Approval Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='permit_approved_date' placeholder='yyyy-mm-dd' value={auth.permit_approved_date} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover size</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_size'  value={auth.cover_size} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_color' value={auth.cover_color} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            
                                        </div>

                                        <div className="w-1/3 flex flex-col item-start justify-start gap-[20px]">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[10] ">
                                                <p className="text-sm text-slate-900">Attached</p>

                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'attached'} dropArray={['True', 'False' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Struture Type</p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'structure_type'} dropArray={['IRP', 'LATTICE', 'COMBO', 'FLAT PAN', 'LOUVER', 'HYBRID', 'OTHER' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Description</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='description' disabled={auth.structure_type !== 'OTHER' } placeholder='' value={auth.description} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">End Cap Style</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='end_cap_style' value={auth.end_cap_style} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Trim color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='trim_color' value={auth.trim_color} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-white">.</p>
                                                
                                                    <button className=" w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={create_job} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Create job'}

                                                </button>
                                            </span>

                                            
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

export default Job_Management_Modal