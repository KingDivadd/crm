'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { DropDownBlankTransparent } from '../dropDown'
import {FileUploader, FileViewer } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix, readable_day} from "../helper"
import { IoCheckmark } from 'react-icons/io5';
import Image from "next/image"
import { FaDownload } from "react-icons/fa6";

interface Lead_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedLead: any;
    setSelectedLead: (selectedLead: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

interface StaffProps {
    staffs?: any;
}
const Lead_Management_Modal = ({ showModal, setShowModal, selectedLead, setSelectedLead, modalFor, setModalFor}: Lead_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_staff, setAll_staff] = useState< {staffs:any} |  null>(null)
    const [filtered_staff, setFiltered_staff] = useState< {staffs:any} |  null>(null)
    const [auth, setAuth] = useState({customer_first_name: '', customer_last_name: '', city: '', state: '', zip: '', address: '', email: '', phone_number: '', assigned_to: '', assigned_name: '', appointment_date: '', disposition: '', gate_code: '', desired_structure: '', contract_document: [], lead_source: ''})
    const [showCalender, setShowCalender] = useState(false)
    const [clicked_appointment_date, setClicked_appointment_date] = useState('')
    const [user_role, setuser_role] = useState('')
    const [first_stage, setFirst_stage] = useState('')
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition'
    })


    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Disposition'});

    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setAuth({...auth, disposition: dropdown})
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    useEffect(()=>{
        const role = localStorage.getItem('user-role')
        if (role) {
            setuser_role(role)
        }
        const item = sessionStorage.getItem('lead_modal')
        if (item) {
            setModalFor(item)
        }
    })

    useEffect(() => {

        const selected_date = convert_to_unix(clicked_appointment_date) * 1000

        if (selected_date < get_todays_date()){
            showAlert("Please choose an appropriate date", "warning")
        }else{
            setAuth({...auth, appointment_date: String(selected_date)})
            setShowCalender(false)
        }
        
    }, [clicked_appointment_date])

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
            
        const filtered_items = all_staff?.staffs.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );

        setFiltered_staff({...filtered_staff, staffs: filtered_items})
        
        // setFiltered_staff(value === '' ? all_staff?.staffs : filtered_items);
    }
    
    useEffect(() => {
        setFirst_stage(modalFor)
        if (modalFor == 'add'){
            get_all_staff()
        }else if (modalFor == 'edit'){
            get_all_staff()
            const {customer_first_name, customer_last_name, customer_address, customer_city, customer_state, customer_zip, customer_phone, customer_email, lead_designer, appointment_date, disposition, gate_code, lead_ind, contract_document, desired_structure, lead_source } = selectedLead
            

            setAuth({...auth,  customer_first_name, customer_last_name, phone_number: customer_phone, address: selectedLead.customer_address, email: customer_email, city: customer_city, state: customer_state, zip: customer_zip, assigned_name: `${lead_designer.last_name} ${lead_designer.first_name}`, assigned_to: lead_designer.user_id , appointment_date, disposition, gate_code, desired_structure: desired_structure || '', contract_document, lead_source })


        }
    }, [])

    async function get_all_staff() {
        try {
            const response = await get_auth_request(`app/all-lead-staffs`)

            if (response.status == 200 || response.status == 201){

                setAll_staff(response.data)

                setFiltered_staff(response.data)
                            
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_lead(e:any) {
        e.preventDefault()
        if (!auth.customer_first_name || !auth.customer_last_name || !auth.phone_number || !auth.city || !auth.state || !auth.assigned_to) {

            if (!auth.customer_first_name || !auth.customer_last_name){showAlert('Please enter client name', 'error')};
            
            if (!auth.phone_number) { showAlert("Please enter client's phone number", 'error') }

            if (!auth.city) {showAlert("Please enter client city", 'error')}

            if (!auth.state) {showAlert("Please enter client state", 'error')}

            if (!auth.assigned_to) {showAlert("Please select a sales personnel", 'error')}
            
        }else if (auth.disposition == 'SOLD' && !auth.email){
            showAlert("Email is required when lead is sold", 'error')
        }
        else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(
                    `app/new-lead`, 
                    { 
                        customer_first_name: auth.customer_first_name, customer_last_name: auth.customer_last_name, customer_zip: Number(auth.zip), customer_state: auth.state, customer_city: auth.city , customer_address: auth.address, customer_phone: auth.phone_number, customer_email: auth.email, lead_designer_id: auth.assigned_to, appointment_date: auth.appointment_date, disposition: auth.disposition.toLowerCase() || 'not_sold', gate_code: auth.gate_code, lead_source: auth.lead_source
                    })

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

    async function update_lead(e:any) {
        e.preventDefault()

        
        if (!auth.customer_first_name || !auth.customer_last_name || !auth.phone_number || !auth.city || !auth.state || !auth.zip || !auth.assigned_to || !auth.appointment_date) {
            if (!auth.customer_first_name || !auth.customer_last_name){showAlert('Please enter client name', 'error')};
            
            if (!auth.phone_number) { showAlert("Please enter client's phone number", 'error') }

            if (!auth.city) {showAlert("Please enter client city", 'error')}

            if (!auth.state) {showAlert("Please enter client city", 'error')}

            if (!auth.assigned_to) {showAlert("Please select a designer", 'error')}

            if (!auth.appointment_date) {showAlert("Please select an appointment date", 'error')}
            
        }else if ( auth.disposition.toLowerCase() === 'sold' && (!auth.desired_structure || !auth.contract_document.length || !auth.email) ){

            
            // if (!auth.desired_structure) {showAlert("Please enter the desired structure", 'error'); setModalFor("upload_lead_file")}
            
            // if (!auth.contract_document.length) {showAlert("Please select the contract file", 'error'); setModalFor("upload_lead_file")}
            
            if (!auth.email) {showAlert("Please enter a valid lead email", 'error'); setModalFor("edit")}
            
        }else{
            try {
                setLoading(true)
                
                const response = await patch_auth_request(`app/edit-lead/${selectedLead.lead_id}`, 
                    { 
                        desired_structure: auth.desired_structure, contract_document: auth.contract_document,
                        customer_first_name: auth.customer_first_name, customer_last_name: auth.customer_last_name, customer_zip: Number(auth.zip), customer_state: auth.state, customer_city: auth.city , customer_address: auth.address, customer_phone: auth.phone_number, customer_email: auth.email, lead_designer_id: auth.assigned_to, appointment_date: auth.appointment_date, disposition: auth.disposition.toLowerCase().replace(/ /g, '_') || 'not_sold', gate_code: auth.gate_code, lead_source: auth.lead_source })
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

    async function designer_update_lead(e:any){
        e.preventDefault()
        const box = {desired_structure: auth.desired_structure, contract_document: auth.contract_document}

        if(!auth.desired_structure || !auth.contract_document.length){
            if (!auth.desired_structure) { showAlert("Please provide the desired structure ", "warning"); }
            if (!auth.contract_document.length) { showAlert("Please select the contract document ", "warning"); }
        }else{
            try {
                setLoading(true)

                
                const response = await patch_auth_request(`app/upload-lead-contract-document/${selectedLead.lead_id}`, box)
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

    async function delete_lead(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            
            const response = await delete_auth_request(`lead/delete-lead/${selectedLead.lead_id}`)
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

    function upload_lead_document() {
        setModalFor('upload_lead_file')
    }

    const handleFileUpload = (fileUrl:string) => {
        const box:any = auth.contract_document
        box.push(fileUrl)
        setAuth({...auth, contract_document: box})
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
                <div className="w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[80%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[3px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex items-center  border-b border-slate-200 h-[40px]">
                                        <p className="text-sm font-semibold  text-slate-900 ">{selectedLead.lead_ind} </p>
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-[15.5px] font-normal text-center text-slate-900 ">Are you sure you want to delete lead <strong>{selectedLead.customer_first_name} {selectedLead.customer_last_name}</strong> </p>
                                            
                                        <p className="text-[14.5px] text-slate-900 flex items-center justify-center gap-2 "> <CiWarning size={19} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-slate-600 rounded-[3px] hover:bg-red-500 flex items-center justify-center text-[15.5px]"  disabled={loading} onClick={delete_lead} >
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

                                {(modalFor == 'add' || modalFor == 'edit') && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px]  ">
                                        {modalFor == 'edit' ? 
                                        <p className="text-md font-semibold  text-slate-800 ">Edit Lead: <strong>{selectedLead.lead_ind}</strong> </p>
                                        :
                                        <p className="text-md font-semibold  text-slate-800 ">New Lead </p>
                                        
                                    }

                                        <span className="flex items-center justify-end gap-[20px] ">

                                            {auth.assigned_to && <span className="h-[35px] gap-[10px] flex items-center"><p className="text-[15px]">Selected Staff:</p> <p className="text-[15px] font-medium">{auth.assigned_name}</p> </span>}

                                            <span className="h-[35px] gap-[10px] flex items-center"><p className="text-[15px]">Disposition:</p> <p className="text-[15px] font-medium">{auth.disposition.replace(/_/g, ' ') || "Not Sold"}</p> </span>

                                            <span className="h-[35px] min-w-[150px] z-[10] ">
                                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['Sold', 'Not Sold', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                            </span>
                                        </span>
                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex items-center justify-between gap-[15px] ">

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900 flex items-center gap-2">First name  </p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='customer_first_name' value={auth.customer_first_name} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900 flex items-center gap-2">Last name</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='customer_last_name' value={auth.customer_last_name} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 flex items-center gap-2">Address</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="address" value={auth.address} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex items-center justify-between gap-[15px] ">

                                                <span className="w-[37.5%] flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900">City</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='city' value={auth.city} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <span className="w-[37.5%] flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900">State</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='state' value={auth.state} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <span className="w-[25%] flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900">Zip Code</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="number" name='zip' value={auth.zip} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 flex items-center gap-2">Phone <p className="font-light">(Please enter a valid phone number)</p> </p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="phone_number" value={auth.phone_number} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>
                                                                                        
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 flex items-center gap-2">Email <p className="font-light">(Please enter a valid email)</p> </p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="email" value={auth.email} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <div className="w-full flex items-center justify-between gap-[15px] ">

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900">Gate Code</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='gate_code' value={auth.gate_code} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px] text-slate-900">Lead Source</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='lead_source' value={auth.lead_source} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                            </div>

                                            
                                        </div>

                                        <div className="w-1/2 flex flex-col item-start justify-start gap-[20px]">
                                            <span className="w-full flex flex-col items-start justify-start gap-[10px] ">

                                                <h4 className="text-[15px] ">Appointment Date</h4>
                                                <div className="w-full flex flex-col items-end justify-end relative z-[5] ">
                                                    <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalender(!showCalender)}}>

                                                        { auth.appointment_date ? readable_day(Number(auth.appointment_date)) : "Select Appointment Date"}
                                                        <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                            {showCalender ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                    </button>
                                                    {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                        <MyDatePicker clickedDate={clicked_appointment_date} setClickedDate={setClicked_appointment_date} />
                                                    </div>}
                                                </div>

                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900">Select Designer</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="email" name='assigned_to' placeholder='Enter sales personnel name to filter' onChange={filter_user} className='normal-input text-[15px]' />
                                                </span>
                                                
                                                {filtered_staff?.staffs !== null ?
                                                
                                                <div className="w-full h-[310px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-100 rounded-[3px] ">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        {filtered_staff?.staffs.length ? 
                                                        <>
                                                        {filtered_staff?.staffs.map((data:any, ind:number)=>{
                                                            const {first_name, last_name, user_id, user_role } = data
                                                            return(
                                                                <span key={ind} className="w-full h-[35px] flex items-center justify-between hover:bg-slate-300 px-[10px] gap-[10px] rounded-[3px] ">

                                                                    <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer " onClick={()=> setAuth({...auth, assigned_name: `${last_name} ${first_name}`, assigned_to:  user_id })} >

                                                                        <p className="text-start text-[15px] text-slate-900 " >{ind + 1}. </p>

                                                                        <p className="text-start text-[15px] text-slate-900 " >{last_name} </p>

                                                                        <p className=" text-start text-[15px] text-slate-900 " > {first_name} </p>


                                                                    </span>
                                                                        
                                                                    <p key={ind} className=" text-start text-[15px] text-slate-900 text-end " > {user_role} </p>
                                                                    
                                                                    <span className="w-[40px] h-full flex justify-end items-center"> {auth.assigned_to == user_id && <IoCheckmark size={18} />} </span>


                                                                </span>
                                                            )
                                                        })}
                                                        </>
                                                        :
                                                        <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                                            <p className="text-[15px] ">No Sales Personnel Registered yet</p>
                                                        </div>
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <div className="w-full h-[310px] flex items-center justify-center text-[15px]">
                                                    Loading Sales Personnels...
                                                </div>
                                                }

                                                <span className="w-full flex items-center gap-[15px] ">
                                                    <button className="h-[40px] w-1/2 flex items-center justify-center rounded-[3px] text-white bg-blue-600 hover:bg-blue-700 text-[15px] " onClick={()=>{setModalFor('upload_lead_file')}}>
                                                        Upload Lead Files
                                                    </button>

                                                    {modalFor == 'add' ?
                                                    
                                                    <button className=" w-1/2 h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px] "  disabled={loading} onClick={create_lead} >
                                                        {loading ? (
                                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                            </svg>
                                                        ) : 'Create Lead'}

                                                    </button>
                                                    :
                                                    <button className=" w-1/2 h-[40px] text-white bg-amber-700 rounded-[3px] hover:bg-amber-600 flex items-center justify-center text-[15px] "  disabled={loading} onClick={update_lead} >
                                                        {loading ? (
                                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                            </svg>
                                                        ) : 'Update Lead'}
                                                    </button>}

                                                </span>


                                            </span>
                                        </div>
                                        
                                    </form>

                                </div>
                                }

                                {modalFor == 'upload_lead_file' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">Lead Files </p>

                                        <p className="text-[15px] font-semibold  text-slate-800 ">Upload Lead Information and Pictures</p>

                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px] ">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[10px] ">

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 ">Desired Structure.  </p>
                                                
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='desired_structure' value={auth.desired_structure} onChange={handle_change} className='normal-input text-[15px]' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 ">Contract Documents / Images </p>
                                                
                                                <div className="w-full h-[400px] overflow-y-auto flex flex-col items-center justify-start gap-[20px] ">
                                                    
                                                    { auth.contract_document.map((data:any, ind:number)=>{
                                                        return(
                                                            <span key={ind} className="w-full flex flex-col items-start justify-start gap-2">
                                                                <FileViewer id={'user-image'} title={"Contract Documents"} url={data} onFileUpload={handleFileUpload} />
                                                            </span>
                                                        )
                                                    })}


                                                </div>
                                            </span>


                                        </div>

                                        <div className="w-1/2 h-full flex flex-col item-start justify-between gap-[20px] ">
                                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                                <span className="w-full flex flex-col items-center justify-start gap-2">
                                                    <FileUploader id={'user-image'} title={"Contract Documents"} url={ "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                </span>
                                            </div>

                                            
                                            <span className="w-full flex items-center justif-between gap-[20px] ">
                                                <button className="h-[40px] w-1/2 flex items-center justify-center rounded-[3px] text-white bg-blue-600 hover:bg-blue-700 text-[15px] " onClick={()=> {setModalFor(first_stage)}}>
                                                        Back to lead Information
                                                </button>

                                                <button className=" w-1/2 h-[40px] text-white bg-amber-700 rounded-[3px] hover:bg-amber-600 flex items-center justify-center text-[15px] "  disabled={loading} onClick={update_lead} >
                                                    {loading ? (
                                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                    ) : 'submit'}

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

export default Lead_Management_Modal
