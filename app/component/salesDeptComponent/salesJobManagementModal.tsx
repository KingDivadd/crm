'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FileUploader, FlexibleImageUploader } from '../imageUploader'
import MyDatePicker, { DatePicker } from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix, readable_day, timestamp_to_readable_value} from "../helper"
import { IoCheckmark } from 'react-icons/io5';


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
    const [all_leads, setAll_leads] = useState<{leads: any[]}|null>(null)
    const [filtered_leads, setFiltered_leads] = useState<{ leads: any[] } | null>(null);

    const [show_all_lead, setShow_all_lead] = useState(false)
    const [selected_lead, setSelected_lead] = useState('')
    const [role, setRole] = useState('')
    const [roll_next, setRoll_next] = useState('first')

    const [auth, setAuth] = useState({
        lead_id: '', job_number: '', contract_amount: '', contract_date: '',
        attached: '',  structure_type: '', cover_size: '', end_cap_style: '', cover_color: '', trim_color: '', description: '',
        hoa_permit_status: '', hoa_permit_submit_date: 0, hoa_permit_approval_date: 0, hoa_permit_number: '', hoa_permit_cost: 0, hoa_permit_document: [],
        engineering_permit_status: '', engineering_permit_submit_date: 0, engineering_permit_approval_date: 0, engineering_permit_number: '', engineering_permit_cost: 0, engineering_permit_document: [],
        general_permit_status: '', general_permit_submit_date: 0, general_permit_approval_date: 0, general_permit_number: '', general_permit_cost: 0, general_permit_document: [],

        })

    const [showCalenders, setShowCalenders] = useState({contract_date: false, hoa_permit_submit_date: false, hoa_permit_approval_date: false, engineering_permit_submit_date: false, engineering_permit_approval_date: false, general_permit_submit_date: false, general_permit_approval_date: false })

    const [clicked_permit_date, setClicked_permit_date] = useState({contract_date: '', hoa_permit_submit_date: '', hoa_permit_approval_date: '', engineering_permit_submit_date: '', engineering_permit_approval_date: '', general_permit_submit_date: '', general_permit_approval_date: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false, hoa_permit_status: false, engineering_permit_status: false, electrical_permit_status: false, general_permit_status: false, attached: false,structure_type: false, 
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition', hoa_permit_status: 'Hoa Status',  engineering_permit_status: 'Engineering Status', electrical_permit_status: 'Electrical Status', general_permit_status: 'Permit Status', attached: 'Attached', structure_type: 'Structure Type',

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
            setAuth({...auth, [title]: value})
            setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
        }else{            
            setAuth({...auth, [title]: dropdown.replace(/ /g, '_').toLowerCase()})
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

        if (name == 'contract_amount' || name == 'hoa_permit_cost' || name == 'engineering_permit_cost' || name == 'general_permit_cost') {
            setAuth({...auth, [name]: Number(value.replace(/,/g,''))})
        }else{
            setAuth({...auth, [name]: value})
        }
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function filter_user(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
    
        const filtered_items = all_leads?.leads?.filter((data: { customer_first_name: string, customer_last_name:string, lead_ind: string }) =>
            data.customer_first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.customer_last_name.toLowerCase().includes(value.toLowerCase()) ||
            data.lead_ind.toLowerCase().includes(value.toLowerCase())
        ) ?? []; // Ensure filtered_items is an array, even if undefined
    
        setFiltered_leads({
            ...filtered_leads,
            leads: value === '' ? (all_leads?.leads ?? []) : filtered_items // Ensure leads is always an array
        });
    }
    
    
    useEffect(() => {
        const user_role = localStorage.getItem('user-role')

        if(user_role == 'permit'){
            setRole('permit')
            setRoll_next('permit')
        }
        
        setRole(user_role || 'sales')
        if (modalFor == 'add'){
            get_all_leads()
        }else if (modalFor == 'edit'){
            
            get_all_leads()
            const {
                lead, project, lead_id, job_number, contract_amount, contract_date,
                attached,  structure_type, cover_size, end_cap_style, cover_color, trim_color, description,
                hoa_permit_status, hoa_permit_submit_date, hoa_permit_approval_date, hoa_permit_number, hoa_permit_cost, hoa_permit_document,
                engineering_permit_status, engineering_permit_submit_date, engineering_permit_approval_date, engineering_permit_number, engineering_permit_cost, engineering_permit_document,
                general_permit_status, general_permit_submit_date, general_permit_approval_date, general_permit_number, general_permit_cost, general_permit_document,

            } = selectedJob
            
            const proj = project[0]
            
            setAuth({...auth,  
                lead_id, job_number, contract_amount, contract_date,
                attached:proj.attached,  structure_type:proj.structure_type, cover_size:proj.cover_size , 
                end_cap_style: proj.end_cap_style, cover_color: proj.cover_color, trim_color: proj.trim_color, description,
                
                hoa_permit_status, hoa_permit_submit_date, hoa_permit_approval_date, hoa_permit_number, 
                hoa_permit_cost: hoa_permit_cost || 0, hoa_permit_document,

                engineering_permit_status, engineering_permit_submit_date, engineering_permit_approval_date, 
                engineering_permit_number, engineering_permit_cost: engineering_permit_cost || 0, engineering_permit_document,

                general_permit_status, general_permit_submit_date, general_permit_approval_date, 
                general_permit_number, general_permit_cost: general_permit_cost || 0, general_permit_document,
            })
            
            setTimeout(() => {
                setDropElements({...dropElements, 
                    hoa_permit_status: hoa_permit_status.replace(/_/g, " "),             
                    general_permit_status:general_permit_status.replace(/_/g, " "), 
                    engineering_permit_status:engineering_permit_status.replace(/_/g, " ")
                })
                
            }, 100);

            console.log('selected JOb ', selectedJob)

            if (user_role !== 'permit'){    

                setTimeout(() => {
                    setDropElements({...dropElements, hoa_permit_status, general_permit_status, engineering_permit_status})
                    setSelected_lead(`${lead.customer_first_name} ${lead.customer_last_name}`)
                }, 100);

            
                setDropElements({...dropElements, structure_type: selectedJob.project[0].structure_type, attached: selectedJob.project[0].attached ? 'True' : 'False' })

                setSelected_lead(lead.customer_name)
                }
            }
    }, [])

    async function get_all_leads() {
        try {
            const response = await get_auth_request(`app/all-lead`)
            if (response.status == 200 || response.status == 201){

                setAll_leads(response.data)

                setFiltered_leads(response.data)


                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {            
            showAlert('Unable to fetch all leads, refresh page ', 'error')
        }
    }

    async function create_job(e:any) {
        e.preventDefault()
        if (!auth.contract_amount || !auth.contract_date || !auth.lead_id || !auth.structure_type || !auth.attached || !auth.lead_id ) {

            if (!auth.contract_amount ) {  showAlert('Please enter contract amount', 'error') }

            if (!auth.contract_date ) {  showAlert('Please select contract date', 'error') }

            if (!auth.lead_id ) {  showAlert('Please select lead', 'error') }

            if (!auth.structure_type ) {  showAlert('Please select structure type', 'error') }

            if (!auth.attached ) {  showAlert('Please select whether attached or freestanding', 'error') }

        }else if (!auth.hoa_permit_status || !auth.engineering_permit_status || !auth.general_permit_status){

            if (!auth.hoa_permit_status ) {  showAlert('Please Select Hoa Permit Status', 'error') }

            if (!auth.engineering_permit_status ) {  showAlert('Please Select Engineering Permit Status', 'error') }

            if (!auth.general_permit_status ) {  showAlert('Please Select General Permit Status', 'error') }
        }
        else{
            try {
                setLoading(true)

                const response = await post_auth_request(`app/create-job`, auth)

                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setShowModal(false)
                    
                    setLoading(false)

                    }else{       
                                    
                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                
                showAlert('Unable to create job, refresh page', 'error')
                setLoading(false)
            }
        }
    }

    async function update_job(e:any) {
        e.preventDefault()
        if (!auth.contract_amount || !auth.contract_date || !auth.lead_id || !auth.structure_type || !auth.attached || !auth.lead_id ) {

            if (!auth.contract_amount ) {  showAlert('Please enter contract amount', 'error') }

            if (!auth.contract_date ) {  showAlert('Please select contract date', 'error') }

            if (!auth.lead_id ) {  showAlert('Please select lead', 'error') }

            if (!auth.structure_type ) {  showAlert('Please select structure type', 'error') }

            if (!auth.attached ) {  showAlert('Please select whether attached or freestanding', 'error') }

        }else if (!auth.hoa_permit_status || !auth.engineering_permit_status || !auth.general_permit_status){

            if (!auth.hoa_permit_status ) {  showAlert('Please Select Hoa Permit Status', 'error') }

            if (!auth.engineering_permit_status ) {  showAlert('Please Select Engineering Permit Status', 'error') }

            if (!auth.general_permit_status ) {  showAlert('Please Select General Permit Status', 'error') }
        }else{
            try {
                setLoading(true)
                console.log('job update ', auth)
                const response = await patch_auth_request(`app/edit-job/${selectedJob.job_id}`, auth)
                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1000);
                    
                    setLoading(false)

                    }else{       

                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                
                showAlert('Unable to update job, refresh page. ', 'error')
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

    type PermitDates = {
        contract_date: string;
        hoa_permit_submit_date: string;
        hoa_permit_approval_date: string;
        engineering_permit_submit_date: string;
        engineering_permit_approval_date: string;
        general_permit_submit_date: string;
        general_permit_approval_date: string;
    };
    

    const handleDateChange = (field: keyof PermitDates, newDate: string) => {
        
        setClicked_permit_date((prevState) => ({
            ...prevState,
            [field]: newDate,  
        }));
        
        setShowCalenders({...showCalenders, [field]: false })

        setAuth({...auth, [field]: Number(convert_to_unix(newDate) * 1000 )})
    };

    const handleFileUpload = (fileUrl:string, type: string) => {
        const hoa_box:any = auth.hoa_permit_document ; const engineering_box:any = auth.engineering_permit_document; const general_box:any = auth.general_permit_document;
        if(type == 'hoa'){
            hoa_box.push(fileUrl)
            setAuth({...auth, hoa_permit_document: hoa_box})
        }else if(type == 'engineering'){
            engineering_box.push(fileUrl)
            setAuth({...auth, engineering_permit_document: engineering_box})
        }else if(type == 'general'){
            general_box.push(fileUrl)
            setAuth({...auth, general_permit_document: general_box})
        }
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
                <div className={ "w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-auto min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-[70vw] flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex items-center justify-between border-b border-slate-200 h-[50px] ">
                                        <h4 className="text-md  flex items-center gap-[10px] ">Delete Job: <p className="text-[15px] font-semibold">{selectedJob.job_ind}</p> </h4>

                                        
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[40px]">
                                        <h4 className="text-md font-normal text-center  ">Are you sure you want to delete job <p className='font-medium'>{selectedJob.job_ind} </p> </h4>
                                            
                                        <p className="text-xs flex items-center justify-center gap-2 "> <CiWarning size={20} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-blue-600 rounded-[3px] hover:bg-red-500 flex items-center justify-center"  disabled={loading} onClick={delete_job} >
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
                                <div className="w-[80vw] h-[87.5vh] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">New Job </p>

                                        {role !== 'permit' && 
                                        <div className="relative flex items-start justify-center z-[25] ">
                                            <div className="flex items-center justify-center gap-5">
                                                {selected_lead && <span className="flex items-center justify-start gap-2">
                                                    <p className="text-[15px]">Lead name:</p>
                                                    <p className="text-[15px] font-semibold">{selected_lead}</p>
                                                </span>}

                                                <span className="h-[40px] rounded-[3px] flex items-center justify-center text-[15px] border border-slate-600 px-5 cursor-pointer flex items-center gap-[5px]" onClick={()=> setShow_all_lead(!show_all_lead)}>Select Lead <span className="h-full flex items-center"> {show_all_lead ? <FaCaretUp size={22} className='text-slate-700' /> :  <FaCaretDown size={20} className='text-slate-700' />} </span>  </span>
                                            </div>

                                            {show_all_lead && 
                                            <div className="absolute top-[45px] right-0  w-[350px]">
                                                <span className="h-[40px] w-full ">
                                                        <input type="hoa_permit_status" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-[15px]' />
                                                </span>

                                                {filtered_leads 
                                                ? 
                                                <div className="w-full h-[315px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-white shadow-md rounded-[5px] ">
                                                    <div className="w-full h-full flex flex-col items-start justify-start">
                                                        {filtered_leads?.leads.length ? 
                                                        <>
                                                            {filtered_leads?.leads.map((data, ind)=>{
                                                                const {customer_first_name, customer_last_name, customer_contract_date, hoa_permit_status, lead_id, lead_ind } = data
                                                                
                                                                return(
                                                                    <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-100 px-[10px] gap-[10px] rounded-[3px] " onClick={()=> {setSelected_lead(`${customer_first_name} ${customer_last_name}`); setAuth({...auth, lead_id: lead_id}); setShow_all_lead(!show_all_lead) }}>

                                                                        <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer "  >

                                                                            <p className="text-start text-[15px] w-[30%] " >{lead_ind} </p>

                                                                            <p className=" text-start text-[15px] font-semibold w-[35%] " > {customer_first_name} </p>

                                                                            <p className=" text-start text-[15px] font-semibold w-[35%] " > {customer_last_name} </p>
                                                                            
                                                                            <span className="w-[40px] h-full flex justify-end items-center"> {auth.lead_id == lead_id && <IoCheckmark size={18} />} </span>

                                                                        </span>
                                                                            


                                                                    </span>
                                                                )
                                                            })}
                                                        </>
                                                        
                                                        : 
                                                        
                                                        <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                                            <p className="text-[15px] ">No Leads sold yet</p>
                                                        </div>
                                                        }
                                                        

                                                    </div>
                                                </div>
                                                :
                                                <div className="w-full h-[310px] flex items-center justify-center text-[15px] bg-white">
                                                    Loading Leads...
                                                </div>
                                                }

                                            </div>}
                                        </div>} 

                                    </span>

                                    {roll_next == "first" ? 
                                    
                                    <form  action="" className="w-full h-[63.5vh] flex items-start justify-between gap-[20px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Job Number</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='job_number' value={auth.job_number} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Contract Amount</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_amount' value={Number(auth.contract_amount).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] ">

                                                <h4 className="text-[15px] ">Contract Date</h4>
                                                <div className="w-full flex flex-col items-end justify-end relative z-[5] ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, contract_date: !showCalenders.contract_date }) }}>

                                                        { auth.contract_date ? readable_day(Number(auth.contract_date)) : "Select Contract Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.contract_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.contract_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'contract_date'} setClickedDate={handleDateChange}  title='contract_date'  />
                                                    </div>}
                                                </div>

                                            </span>
                                            
                                            
                                            
                                        </div>
                                        
                                        <div className="w-1/2 flex flex-col item-start justify-start gap-[20px]">

                                            <span className="w-full flex items-center justify-betweeen gap-[10px] ">
                                                <label className="flex items-center gap-[10px] ">

                                                    <input type="radio" name="attachment" value="attached" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "attached" })} checked={auth.attached === "attached"} />
                                                    <p className="text-[15px]">Attached</p>
                                                </label>

                                                <label className="flex items-center justify-end gap-[10px] ">
                                                    <input type="radio" name="attachment" value="freestanding" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "freestanding" })} checked={auth.attached === "freestanding"} />
                                                    <p className="text-[15px]">FreeStanding</p>
                                                </label>

                                                <label className="flex items-center justify-end gap-[10px] ">
                                                    <input type="radio" name="attachment" value="cantilever" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "cantilever" })} checked={auth.attached === "freestanding"} />
                                                    <p className="text-[15px]">Cantilever</p>
                                                </label>
                                            </span>


                                            <span className="w-full flex flex-col items-self justify-self gap-[5px] ">
                                                <p className="text-[15px] flex items-center gap-[10px] ">Struture Type {auth.structure_type && <span className='font-medium' > - {auth.structure_type.replace(/_/g, " ")}</span>} </p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'structure_type'} dropArray={['IRP', 'LATTICE', 'COMBO', 'FLAT PAN', 'LOUVER', 'HYBRID', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Cover size</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_size' value={auth.cover_size} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Cover color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_color' value={auth.cover_color} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Trim color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='trim_color' value={auth.trim_color} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">End Cap Style</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='end_cap_style' value={auth.end_cap_style} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self  ">
                                                
                                                    <button className=" w-full h-[40px] mt-[5px] text-white bg-blue-700 rounded-[3px] hover:bg-blue-600 flex items-center justify-center text-[15px] "  disabled={loading} onClick={()=>{setRoll_next('permit') }} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Next'}

                                                </button>
                                            </span>
                                            
                                        </div>


                                        
                                    </form>
                                    :
                                    <form  action="" className="w-full h-[65.5] flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex h-[63.5vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20]">
                                                <p className="text-[15px]">Hoa Permit Status</p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'hoa_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15] ">

                                                <h4 className="text-[15px] ">Hoa Submit Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative  ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, hoa_permit_submit_date: !showCalenders.hoa_permit_submit_date }) }}>

                                                        { auth.hoa_permit_submit_date != 0 ? readable_day(Number(auth.hoa_permit_submit_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.hoa_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.hoa_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'hoa_permit_submit_date'} setClickedDate={handleDateChange}  title='hoa_permit_submit_date'  />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                <h4 className="text-[15px] ">Hoa Approval Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, hoa_permit_approval_date: !showCalenders.hoa_permit_approval_date }) }}>

                                                        { auth.hoa_permit_approval_date != 0 ? readable_day(Number(auth.hoa_permit_approval_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.hoa_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.hoa_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'hoa_permit_approval_date'} setClickedDate={handleDateChange}  title='hoa_permit_approval_date'  />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Hoa Permit Number</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='hoa_permit_number' value={auth.hoa_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Hoa Permit Cost</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='hoa_permit_cost' value={Number(auth.hoa_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                                <span className="w-full flex flex-col items-center justify-start gap-2">
                                                    <FileUploader id={'hoa'} title={"Hoa Permit Docuement"} type={'hoa'} url={ "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                </span>
                                            </div>
                                        
                                        </div>
                                        
                                        <div className="w-1/3 flex h-[63.5vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20] ">
                                                <p className="text-[15px]">Engineering Permit Status</p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'engineering_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15]">

                                                <h4 className="text-[15px] ">Engineering Submit Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, engineering_permit_submit_date: !showCalenders.engineering_permit_submit_date }) }}>

                                                        { auth.engineering_permit_submit_date != 0 ? readable_day(Number(auth.engineering_permit_submit_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.hoa_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.engineering_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'engineering_permit_submit_date'} setClickedDate={handleDateChange}  title='engineering_permit_submit_date' />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                <h4 className="text-[15px] ">Engineering Approval Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative  ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, engineering_permit_approval_date: !showCalenders.engineering_permit_approval_date }) }}>

                                                        { auth.engineering_permit_approval_date != 0 ? readable_day(Number(auth.engineering_permit_approval_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.engineering_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.engineering_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'engineering_permit_approval_date'} setClickedDate={handleDateChange}  title='engineering_permit_approval_date'  />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Engineering Permit Number</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_permit_number' value={auth.engineering_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">Engineering Permit Cost</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='engineering_permit_cost' value={Number(auth.engineering_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                                <span className="w-full flex flex-col items-center justify-start gap-2">
                                                    <FileUploader id={'engineering'} title={"Engineering Permit Docuement"} type={'engineering'} url={ "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                </span>
                                            </div>
                                        

                                        </div>

                                        <div className="w-1/3 flex h-[63.5vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20] ">
                                                <p className="text-[15px]">General Permit Status</p>
                                                <span className="h-[40px] min-w-[150px] z-5">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'general_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15] ">

                                                <h4 className="text-[15px] ">General Permit Submit Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, general_permit_submit_date: !showCalenders.general_permit_submit_date }) }}>

                                                        { auth.general_permit_submit_date != 0 ? readable_day(Number(auth.general_permit_submit_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.general_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.general_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'general_permit_submit_date'} setClickedDate={handleDateChange}  title='general_permit_submit_date'  />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                <h4 className="text-[15px] ">General Permit Approval Date</h4>

                                                <div className="w-full flex flex-col items-end justify-end relative ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, general_permit_approval_date: !showCalenders.general_permit_approval_date }) }}>

                                                        { auth.general_permit_approval_date != 0 ? readable_day(Number(auth.general_permit_approval_date)) : "Select Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalenders.general_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalenders.general_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <DatePicker clickedDate={'general_permit_approval_date'} setClickedDate={handleDateChange}  title='general_permit_approval_date'  />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">General Permit Number</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='general_permit_number' value={auth.general_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px]">General Permit Cost</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='general_permit_cost' value={Number(auth.general_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                                <span className="w-full flex flex-col items-center justify-start gap-2">
                                                    <FileUploader id={'general'} title={"General Permit Docuement"} type={'general'} url={ "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                </span>
                                            </div>
                                        
                                        </div>

                                    </form>
                                    
                                    }

                                    {roll_next == "permit" && <span className="w-full flex items-center justify-end gap-[20px] ">

                                        <p className="text-white w-1/3 ">.</p>

                                        {role == 'permit' ? <p></p> : <button className="w-1/3 h-[40px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-[15px]" onClick={()=> setRoll_next('first')} >Back</button>}
                                        

                                        <button className=" w-1/3 h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px] "  disabled={loading} onClick={create_job} >
                                        {loading ? (
                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : 'Create Job'}

                                        </button>
                                    </span>}

                                </div>
                                }

                                {modalFor == 'edit' && 
                                <div className="w-[80vw] h-[87.5vh] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px]  ">
                                        <span className="text-md flex items-center gap-[10px] ">Edit Job: <p className="text-md font-medium">{selectedJob.job_ind}</p> </span>

                                        {role !== 'permit' && <div className="relative flex items-start justify-center z-[25] ">
                                            <div className="flex items-center justify-center gap-5">
                                                {selected_lead && <span className="flex items-center justify-start gap-2">
                                                    <p className="text-[15px]">Lead name:</p>
                                                    <p className="text-[15px] font-semibold">{selected_lead}</p>
                                                </span>}

                                                <span className="h-[40px] rounded-[3px] flex items-center justify-center text-[15px] border border-slate-600 px-5 cursor-pointer flex items-center gap-[5px]" onClick={()=> setShow_all_lead(!show_all_lead)}>Select Lead <span className="h-full flex items-center"> {show_all_lead ? <FaCaretUp size={22} className='text-slate-700' /> :  <FaCaretDown size={20} className='text-slate-700' />} </span>  </span>
                                            </div>

                                            {show_all_lead && 
                                            <div className="absolute top-[45px] right-0  w-[350px]">
                                                <span className="h-[40px] w-full ">
                                                        <input type="hoa_permit_status" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-[15px]' />
                                                </span>

                                                <div className="w-full h-[315px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-white shadow-md rounded-[5px] ">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        {filtered_leads?.leads.map((data, ind)=>{
                                                            const {customer_first_name, customer_last_name, customer_contract_date, hoa_permit_status, lead_id, lead_ind } = data
                                                            
                                                            return(
                                                                <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-100 px-[10px] gap-[10px] rounded-[3px] " onClick={()=> {setSelected_lead(`${customer_first_name} ${customer_last_name}`); setAuth({...auth, lead_id: lead_id}); setShow_all_lead(!show_all_lead) }}>

                                                                    <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer "  >

                                                                        <p className="text-start text-[15px] w-[30%] " >{lead_ind} </p>

                                                                        <p className=" text-start text-[15px] font-semibold w-[35%] " > {customer_first_name} </p>

                                                                        <p className=" text-start text-[15px] font-semibold w-[35%] " > {customer_last_name} </p>
                                                                        
                                                                        <span className="w-[40px] h-full flex justify-end items-center"> {auth.lead_id == lead_id && <IoCheckmark size={18} />} </span>

                                                                    </span>
                                                                        


                                                                </span>
                                                            )
                                                        })}

                                                    </div>
                                                </div>

                                            </div>}
                                        </div> }

                                    </span>

                                {roll_next == "first" ? 
                                
                                <form action="" className="w-full h-[63.5vh] flex items-start justify-between gap-[20px]">
                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Job Number</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='job_number' value={auth.job_number} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Contract Amount</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='contract_amount' value={Number(auth.contract_amount).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] ">

                                            <h4 className="text-[15px] ">Contract Date</h4>
                                            <div className="w-full flex flex-col items-end justify-end relative z-[5] ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, contract_date: !showCalenders.contract_date }) }}>

                                                    { auth.contract_date ? readable_day(Number(auth.contract_date)) : "Select Contract Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.contract_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.contract_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'contract_date'} setClickedDate={handleDateChange}  title='contract_date'  />
                                                </div>}
                                            </div>

                                        </span>
                                        
                                        
                                        
                                    </div>
                                    
                                    <div className="w-1/2 flex flex-col item-start justify-start gap-[20px]">

                                        <span className="w-full flex items-center justify-betweeen gap-[10px] ">
                                            <label className="flex items-center gap-[10px] ">

                                                <input type="radio" name="attachment" value="attached" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "attached" })} checked={auth.attached === "attached"} />
                                                <p className="text-[15px]">Attached</p>
                                            </label>

                                            <label className="flex items-center justify-end gap-[10px] ">
                                                <input type="radio" name="attachment" value="freestanding" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "freestanding" })} checked={auth.attached === "freestanding"} />
                                                <p className="text-[15px]">FreeStanding</p>
                                            </label>

                                            <label className="flex items-center justify-end gap-[10px] ">
                                                <input type="radio" name="attachment" value="cantilever" className="h-[17px] w-[17px] cursor-pointer" onChange={() => setAuth({...auth, attached: "cantilever" })} checked={auth.attached === "freestanding"} />
                                                <p className="text-[15px]">Cantilever</p>
                                            </label>
                                        </span>


                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] flex items-center gap-[10px] ">Struture Type {auth.structure_type && <h5> : {auth.structure_type.replace(/_/g, " ")}</h5>} </p>
                                            <span className="h-[40px] min-w-[150px] z-5">
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'structure_type'} dropArray={['IRP', 'LATTICE', 'COMBO', 'FLAT PAN', 'LOUVER', 'HYBRID', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Cover size</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='cover_size' value={auth.cover_size} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Cover color</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='cover_color' value={auth.cover_color} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Trim color</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='trim_color' value={auth.trim_color} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">End Cap Style</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='end_cap_style' value={auth.end_cap_style} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self  ">
                                            
                                                <button className=" w-full h-[40px] mt-[5px] text-white bg-blue-700 rounded-[3px] hover:bg-blue-600 flex items-center justify-center text-[15px] "  disabled={loading} onClick={()=>{ setRoll_next('permit') }} >
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Next'}

                                            </button>
                                        </span>
                                        
                                    </div>


                                    
                                </form>
                                :
                                <form  action="" className="w-full h-[65.5vh] flex items-start justify-between gap-[20px]">
                                    <div className="w-1/3 flex h-[67vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20]">
                                            <p className="text-[15px]">Hoa Permit Status</p>
                                            <span className="h-[40px] min-w-[150px] z-5">
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'hoa_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15] ">

                                            <h4 className="text-[15px] ">Hoa Submit Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative  ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, hoa_permit_submit_date: !showCalenders.hoa_permit_submit_date }) }}>

                                                    { auth.hoa_permit_submit_date != 0 ? readable_day(Number(auth.hoa_permit_submit_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.hoa_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.hoa_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'hoa_permit_submit_date'} setClickedDate={handleDateChange}  title='hoa_permit_submit_date'  />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                            <h4 className="text-[15px] ">Hoa Approval Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, hoa_permit_approval_date: !showCalenders.hoa_permit_approval_date }) }}>

                                                    { auth.hoa_permit_approval_date != 0  ? readable_day(Number(auth.hoa_permit_approval_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.hoa_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.hoa_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'hoa_permit_approval_date'} setClickedDate={handleDateChange}  title='hoa_permit_approval_date'  />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Hoa Permit Number</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='hoa_permit_number' value={auth.hoa_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Hoa Permit Cost</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='hoa_permit_cost' value={Number(auth.hoa_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <div className="w-full flex flex-col justify-start items-start gap-3">
                                            <span className="w-full flex flex-col items-center justify-start gap-2">
                                                <FileUploader id={'hoa'} title={"Hoa Permit Docuement"} type={'hoa'} url={selectedJob.hoa_permit_document[0] || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                            </span>
                                        </div>
                                    
                                    </div>
                                    
                                    <div className="w-1/3 flex h-[67vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20] ">
                                            <p className="text-[15px]">Engineering Permit Status</p>
                                            <span className="h-[40px] min-w-[150px] z-5">
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'engineering_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15]">

                                            <h4 className="text-[15px] ">Engineering Submit Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, engineering_permit_submit_date: !showCalenders.engineering_permit_submit_date }) }}>

                                                    { auth.engineering_permit_submit_date  != 0  ? readable_day(Number(auth.engineering_permit_submit_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.hoa_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.engineering_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'engineering_permit_submit_date'} setClickedDate={handleDateChange}  title='engineering_permit_submit_date' />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                            <h4 className="text-[15px] ">Engineering Approval Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative  ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, engineering_permit_approval_date: !showCalenders.engineering_permit_approval_date }) }}>

                                                    { auth.engineering_permit_approval_date != 0  ? readable_day(Number(auth.engineering_permit_approval_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.engineering_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.engineering_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'engineering_permit_approval_date'} setClickedDate={handleDateChange}  title='engineering_permit_approval_date'  />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Engineering Permit Number</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='engineering_permit_number' value={auth.engineering_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">Engineering Permit Cost</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='engineering_permit_cost' value={Number(auth.engineering_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <div className="w-full flex flex-col justify-start items-start gap-3">
                                            <span className="w-full flex flex-col items-center justify-start gap-2">
                                                <FileUploader id={'engineering'} title={"Engineering Permit Docuement"} type={'engineering'} url={ selectedJob.engineering_permit_document[0] || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                            </span>
                                        </div>
                                    

                                    </div>

                                    <div className="w-1/3 flex h-[67vh] flex-col item-start justify-start gap-[20px] overflow-y-auto " >
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20] ">
                                            <p className="text-[15px]">General Permit Status</p>
                                            <span className="h-[40px] min-w-[150px] z-5">
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'general_permit_status'} dropArray={['Not Required', 'Required', 'Pending', 'Submitted', 'Approved', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[15] ">

                                            <h4 className="text-[15px] ">General Permit Submit Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, general_permit_submit_date: !showCalenders.general_permit_submit_date }) }}>

                                                    { auth.general_permit_submit_date != 0  ? readable_day(Number(auth.general_permit_submit_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.general_permit_submit_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.general_permit_submit_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'general_permit_submit_date'} setClickedDate={handleDateChange}  title='general_permit_submit_date'  />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                            <h4 className="text-[15px] ">General Permit Approval Date</h4>

                                            <div className="w-full flex flex-col items-end justify-end relative ">
                                                <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, general_permit_approval_date: !showCalenders.general_permit_approval_date }) }}>

                                                    { auth.general_permit_approval_date != 0  ? readable_day(Number(auth.general_permit_approval_date)) : "Select Date"}
                                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                        {showCalenders.general_permit_approval_date ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                </button>
                                                {showCalenders.general_permit_approval_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                    <DatePicker clickedDate={'general_permit_approval_date'} setClickedDate={handleDateChange}  title='general_permit_approval_date'  />
                                                </div>}
                                            </div>

                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">General Permit Number</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='general_permit_number' value={auth.general_permit_number} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px]">General Permit Cost</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='general_permit_cost' value={Number(auth.general_permit_cost).toLocaleString()} onChange={handle_change} className='normal-input text-[15px]' />
                                            </span>
                                        </span>

                                        <div className="w-full flex flex-col justify-start items-start gap-3">
                                            <span className="w-full flex flex-col items-center justify-start gap-2">
                                                <FileUploader id={'general'} title={"General Permit Docuement"} type={'general'} url={selectedJob.general_permit_document[0] || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                            </span>
                                        </div>
                                    
                                    </div>

                                </form>
                                
                                }

                                {roll_next == "permit" && <span className="w-full flex items-center justify-end gap-[15px] h-[45px] ">

                                    <p className="text-white w-1/3 ">.</p>
                                    <p className="text-white w-1/3 ">.</p>

                                    {role == "permit" ? <p className="text-white">.</p> : <button className="w-1/3 h-[40px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-[15px]"  onClick={()=> setRoll_next('first')}>Back</button>}
                                    

                                    <button className=" w-1/3 h-[40px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-[15px] "  disabled={loading} onClick={update_job} >
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : 'Update Job'}

                                    </button>
                                </span>}

                                </div>
                                }

                                {modalFor == 'view' && 
                                
                                <div className="w-[77.5vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] ">
                                    <span className="w-full flex items-center justify-start border-b border-slate-200 h-[45px] gap-[20px] ">
                                        <span className="text-md  text-slate-800 flex items-center justify-start gap-[10px] font-medium">Job Id: <div className='font-semibold'>{selectedJob.job_ind}</div> </span>
                                        <span className="text-md  text-slate-800 flex items-center justify-start gap-[10px] font-medium">Job Number: <div className='font-semibold'> {selectedJob.job_number}</div> </span>
                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 h-[75vh] flex flex-col items-start justify-start gap-[15px] overflow-y-auto">
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Contract Amount</p>
                                                <p className="text-sm w-[55%] font-medium ">$ {selectedJob.contract_amount.toLocaleString()}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Contract Date</p>
                                                <p className="text-sm w-[55%] font-medium ">{readable_day(Number(selectedJob.contract_date))}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Created On</p>
                                                <p className="text-sm w-[55%] font-medium ">{timestamp_to_readable_value(Number(selectedJob.created_at))}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Attached</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].attached ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Free Standing</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].attached == 'freestanding' ? 'True': 'False'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Struture Type</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].structure_type}</p>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">End Cap Style</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].end_cap_style || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Cover Size</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].cover_size || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Cover Color</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].cover_color || '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[45%] ">Trim Color</p>
                                                <p className="text-sm w-[55%] font-medium ">{selectedJob.project[0].trim_color || '-'}</p>
                                            </span>
                                            
                                        </div>

                                        <div className="w-1/2 h-[75vh] flex flex-col item-start justify-start gap-[15px] overflow-y-auto">

                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">General Permit Status</p>
                                                {selectedJob.general_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedJob.general_permit_status.replace(/_/g, ' ')}</p>:
                                                <p className="text-sm w-[50%] font-medium ">-</p>}
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">General Permit Submit Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.general_permit_submit_date != 0 ? readable_day(Number(selectedJob.general_permit_submit_date)) : '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">General Permit Approval Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.general_permit_approval_date != 0 ? readable_day(Number(selectedJob.general_permit_approval_date)) : '-'}</p>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">General Permit Number</p>
                                                <p className="text-sm w-[50%] font-medium ">{selectedJob.general_permit_number || '-'}</p>
                                            </span>
                                            <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                <p className="text-sm text-start ">General Permit Documents</p>
                                                <span className="w-full flex flex-col items-start justify-start gap-[5px] ">
                                                    {
                                                        selectedJob.general_permit_document.map((data:string, ind:number)=>{
                                                            return(
                                                                <span key={ind} className="w-full flex items-center gap-[10px] pl-[20px] ">
                                                                    {ind + 1}.
                                                                
                                                                    <a href={data} className="text-sm text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" >{data}</a>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Hoa Permit Status</p>
                                                {selectedJob.hoa_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedJob.hoa_permit_status.replace(/_/g, ' ')}</p>:
                                                <p className="text-sm w-[50%] font-medium ">-</p>}
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Hoa Permit Submit Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.hoa_permit_submit_date != 0 ? readable_day(Number(selectedJob.hoa_permit_submit_date)) : '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Hoa Approval Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.hoa_permit_approval_date != 0 ? readable_day(Number(selectedJob.hoa_permit_approval_date)) : '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Hoa Permit Number</p>
                                                <p className="text-sm w-[50%] font-medium ">{selectedJob.hoa_permit_number || '-'}</p>
                                            </span>
                                            <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                <p className="text-sm text-start ">Hoa Permit Documents</p>
                                                <span className="w-full  flex flex-col items-start justify-start gap-[5px] ">
                                                    {
                                                        selectedJob.hoa_permit_document.map((data:string, ind:number)=>{
                                                            return(
                                                                <span key={ind} className="w-full flex items-center gap-[10px] pl-[20px] ">
                                                                    {ind + 1}.
                                                                
                                                                    <a href={data} className="text-sm text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" >{data}</a>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Engineering Permit Status</p>
                                                {selectedJob.engineering_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedJob.engineering_permit_status.replace(/_/g, ' ')}</p>:
                                                <p className="text-sm w-[50%] font-medium ">-</p>}
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Engineering Permit Submit Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.engineering_permit_submit_date != 0 ? readable_day(Number(selectedJob.engineering_permit_submit_date)) : '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Engineering Permit Approval Date</p>
                                                <p className="text-sm w-[50%] font-medium ">{ selectedJob.engineering_permit_approval_date != 0 ? readable_day(Number(selectedJob.engineering_permit_approval_date)) : '-'}</p>
                                            </span>
                                            <span className="w-full flex items-start justify-start gap-[10px]  ">
                                                <p className="text-sm w-[50%] ">Engineering Permit Number</p>
                                                <p className="text-sm w-[50%] font-medium ">{selectedJob.engineering_permit_number || '-'}</p>
                                            </span>
                                            <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                <p className="text-sm text-start ">Engineering Permit Documents</p>
                                                <span className="w-full flex flex-col items-start justify-start gap-[5px] ">
                                                    {
                                                        selectedJob.engineering_permit_document.map((data:string, ind:number)=>{
                                                            return(
                                                                <span key={ind} className="w-full flex items-center gap-[10px] pl-[20px] ">
                                                                    {ind + 1}.
                                                                
                                                                    <a href={data} className="text-sm text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" >{data}</a>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </span>
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