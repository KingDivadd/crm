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


interface Lead_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedLead: any;
    setSelectedLead: (selectedLead: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const InspectionModal = ({ showModal, setShowModal, selectedLead, setSelectedLead, modalFor}: Lead_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_staff, setAll_staff] = useState([])
    const [filtered_staff, setFiltered_staff] = useState([])
    const [auth, setAuth] = useState({inspection_type: '', pass: '', inspection_comments: '', date: '', })
    const [showCalender, setShowCalender] = useState(false)
    const [clicked_appointment_date, setClicked_appointment_date] = useState('')
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        pass: false
    });
    const [dropElements, setDropElements] = useState({
        pass: 'Pass'

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
        setAuth({...auth, pass: dropdown})
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
            
        const filtered_items = all_staff.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_staff(value === '' ? all_staff : filtered_items);
    }
    
    useEffect(() => {
        if (modalFor == 'add'){
            get_all_staff()
        }else if (modalFor == 'edit'){
            get_all_staff()
            const {inspection_type, pass, date, inspection_comments, } = selectedLead
            
            setAuth({...auth,  inspection_type, pass, date, inspection_comments })
        }
    }, [])

    async function get_all_staff() {
        try {
            const response = await get_auth_request(`user/all-sales-staff`)
            if (response.status == 200 || response.status == 201){

                setAll_staff(response.data.staffs)

                setFiltered_staff(response.data.staffs)
                            
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_lead(e:any) {
        e.preventDefault()
        console.log('auth', auth)
        if (!auth.inspection_type || !auth.date || !auth.inspection_comments || !auth.pass ) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(`lead/create-lead`, { inspection_type: auth.inspection_type, pass: auth.pass , date: auth.date, inspection_comments: auth.inspection_comments })
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
        if (!auth.inspection_type || !auth.date || !auth.inspection_comments || !auth.pass) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await patch_auth_request(`lead/edit-lead/${selectedLead.lead_id}`, 
                    { inspection_type: auth.inspection_type, pass: auth.pass , date: auth.date, inspection_comments: auth.inspection_comments, })
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

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[50px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[50%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-slate-900 ">{selectedLead.name} </p>

                                        
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-md font-normal text-center text-slate-900 ">Are you sure you want to delete lead <strong>{selectedLead.inspection_type}</strong>
                                            <strong> {selectedLead.name}</strong> assigned to <strong>{selectedLead.assigned_to.last_name} {selectedLead.assigned_to.first_name} </strong> </p>
                                            
                                        <p className="text-xs text-slate-900 flex items-center justify-center gap-2 "> <CiWarning size={20} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-slate-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center"  disabled={loading} onClick={delete_lead} >
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
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">New Inspection </p>

                                        <h4 className="text-md flex items-center gap-2">Project Id: <p className="font-medium">PJ0001</p></h4>
                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                        <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-sm text-slate-900 flex items-center gap-2">Inspection Stage <p className="font-light">(Initial, Final, etc)</p> </p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='inspection_type' value={auth.inspection_type} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Inspection Score</p>
                                                <span className="h-[40px] w-full">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'pass'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900 flex items-center gap-2">Inspection Date <p className="font-light">(yyyy-mm-dd)</p> </p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="date" value={auth.date} placeholder='yyyy-mm-dd' onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900 flex items-center gap-2">Inspection Comments </p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="inspection_comments" value={auth.inspection_comments} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <button className=" w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={create_lead} >
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Add Inspection Note'}

                                            </button>
                                            
                                        </div>

                                      
                                        
                                    </form>

                                </div>
                                }

                                {modalFor == 'edit' && <></>
                                // <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] ">
                                //     <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                //         <p className="text-md font-semibold  text-slate-800 ">Edit Lead: <strong>{selectedLead.lead_ind}</strong> </p>

                                //         <span className="h-[35px] min-w-[150px] z-[10]">
                                //             <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'pass'} dropArray={['Sold', 'Not Sold', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                //         </span>
                                //     </span>

                                //     <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                //         <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900">Customer Name.</p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name='inspection_type' value={auth.inspection_type} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>

                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900">Customer pass</p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name='pass' value={auth.pass} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>
                                            
                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900 flex items-center gap-2">Customer Phone <p className="font-light">(Please enter a valid phone number)</p> </p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name="date" value={auth.date} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>
                                            
                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900 flex items-center gap-2">Customer inspection_comments <p className="font-light">(Please enter a valid inspection_comments)</p> </p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name="inspection_comments" value={auth.inspection_comments} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>
                                            
                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900">Gate Code</p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name='gate_code' value={auth.gate_code} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>

                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900">Assigned to</p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="text" name='assigned_name' value={auth.assigned_name} onChange={handle_change} className='normal-input text-sm' />
                                //                 </span>
                                //             </span>
                                            
                                //         </div>

                                //         <div className="w-1/2 flex flex-col item-start justify-start gap-[20px]">
                                //             <span className="w-full flex flex-col items-start justify-start gap-[10px] ">

                                //                 <h4 className="text-sm ">Appointment Date</h4>
                                //                 <div className="w-full flex flex-col items-end justify-end relative z-[5] ">
                                //                     <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-sm" onClick={(e:any) => {e.preventDefault(); setShowCalender(!showCalender)}}>

                                //                         {auth.appointment_date ? auth.appointment_date : "Select Appointment Date"}
                                //                         <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                //                             {showCalender ? <FaCaretUp /> : <FaCaretDown />}
                                //                         </span>
                                //                     </button>
                                //                     {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                //                         <MyDatePicker clickedDate={clicked_appointment_date} setClickedDate={setClicked_appointment_date} />
                                //                     </div>}
                                //                 </div>

                                //             </span>

                                //             <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                //                 <p className="text-sm text-slate-900">Select Staff</p>
                                //                 <span className="h-[40px] w-full ">
                                //                     <input type="inspection_comments" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-sm' />
                                //                 </span>
                                //                 <div className="w-full h-[300px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-100 rounded-[5px] ">
                                //                     <div className="w-full flex flex-col items-start justify-start">
                                //                         {filtered_staff.map((data, ind)=>{
                                //                             const {first_name, last_name, user_id, user_role } = data
                                //                             return(
                                //                                 <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-300 px-[10px] gap-[10px] rounded-[3px] ">

                                //                                     <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer " onClick={()=> setAuth({...auth, assigned_name: `${last_name} ${first_name}`, assigned_to:  user_id })} >

                                //                                         <p className="text-start text-sm text-slate-900 " >{ind + 1}. </p>

                                //                                         <p className="text-start text-sm text-slate-900 " >{last_name} </p>

                                //                                         <p className=" text-start text-sm text-slate-900 " > {first_name} </p>

                                //                                     </span>
                                                                        
                                //                                     <p key={ind} className=" text-start text-sm text-slate-900 text-end " > {user_role} </p>


                                //                                 </span>
                                //                             )
                                //                         })}

                                //                     </div>
                                //                 </div>

                                //                 <button className=" w-full h-[40px] text-white bg-amber-700 rounded-[5px] hover:bg-amber-600 flex items-center justify-center text-sm "  disabled={loading} onClick={update_lead} >
                                //                 {loading ? (
                                //                     <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                //                     </svg>
                                //                 ) : 'Update Lead'}

                                //             </button>
                                //             </span>
                                //         </div>
                                        
                                //     </form>


                                // </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InspectionModal
