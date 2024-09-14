'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

import { DropDownBlankTransparent } from './dropDown'
import { CiWarning } from 'react-icons/ci'
import Alert from './alert'
import { get_auth_request, patch_auth_request } from '../api/admin_api'
import { readable_day, timestamp_to_readable_value } from './helper'


interface Job_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const NotificationModal = ({ showModal, setShowModal, selectedItem, setSelectedItem, modalFor}: Job_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [all_leads, setAll_leads] = useState([])
    const [filtered_leads, setFiltered_leads] = useState([])
    const [show_all_lead, setShow_all_lead] = useState(false)
    const [selected_lead, setSelected_lead] = useState('')
    const [status, setStatus] = useState('')


    const [auth, setAuth] = useState({})

    const [showCalenders, setShowCalenders] = useState({contract_date: false, engineering_sub_date: false, engineering_permit_approval_date_date: false, permit_sent_date: false, permit_approved_date: false})

    const [clicked_date, setClicked_date] = useState({contract_date: '', engineering_sub_date: '', engineering_permit_approval_date_date: '', permit_sent_date: '', permit_approved_date: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false, hoa_permit_status: false, engineering_permit_status: false, electrical_permit_status: false, general_permit_status: false, attached: false,structure_type: false, 
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition', hoa_permit_status: 'HOA Status',  engineering_permit_status: 'Engineering Status', electrical_permit_status: 'Electrical Status', general_permit_status: 'Permit Status', attached: 'Attached', structure_type: 'Structure Type',

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

    
    useEffect(() => {
        const auth_id = localStorage.getItem('key') || ''

        const {read, read_by} = selectedItem

        if (read_by.includes(auth_id) && read) {
            setStatus('read')
        }else{
            setStatus('unread')
        }
        console.log('selected notification ', selectedItem)
        update_notification()
        
    }, [])

    async function update_notification() {
        try {
            const response = await patch_auth_request(`app/update-notification-status/${selectedItem.notification_id}`, {})

            if (response.status == 200 || response.status == 201){

                setStatus('read')

                }else{       

                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
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
                <div className={ "w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className="h-auto w-auto mx-auto shadow-xl flex items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">
                                

                                {modalFor == 'view' && 
                                <div className="w-[75vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">

                                        <h4 className="text-md flex items-center gap-[10px] ">Subject: 
                                            <p className="text-md font-medium">{selectedItem.subject}</p> 
                                        </h4>

                                        <p className={status == 'read' ? "text-md text-green-600 px-2 ":"text-md px-2 text-red-600 "}>{status}</p>

                                    </span>

                                    <div className="w-full flex items-center justify-start gap-[20px] ">

                                        <div className="w-1/2 h-[65vh] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0">

                                            <div className="w-full min-h-[200px] flex flex-col items-start gap-10 justify-start">

                                                <span className="w-full flex flex-col gap-[10px]">
                                                    <p className="text-sm">Initiated By</p>
                                                    <p className="text-sm font-medium">{selectedItem.notification_source.user_ind}. {selectedItem.notification_source.first_name} {selectedItem.notification_source.last_name } ({selectedItem.notification_source.user_role})  </p>
                                                </span>

                                                <span className="w-full flex flex-col gap-[10px]">
                                                    <p className="text-sm">Details</p>
                                                    <p className="text-sm font-medium">{selectedItem.message}</p>
                                                </span>


                                            </div>

                                        </div>

                                        <div className="w-1/2 h-[65vh] flex flex-col items-start justify-start gap-[15px] rounded-[4px] p-[15px] pt-0">
                                            <p className="text-[15px] font-medium w-full flex items-center px-[10px] text-start h-[35px] bg-blue-200 ">
                                                {selectedItem.job && "New Job Information"}
                                                {selectedItem.lead && "New Lead Information"}
                                            </p>
                                            {selectedItem.job && 
                                            
                                            <div className="w-full flex flex-col items-start justify-start gap-[15px] flex-1 overflow-y-auto ">

                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Contract Amount</p>
                                                    <p className="text-sm w-[50%] font-medium ">$ {Number(selectedItem.job.contract_amount).toLocaleString()}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Contract Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{readable_day(Number(selectedItem.job.contract_date))}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Created On</p>
                                                    <p className="text-sm w-[50%] font-medium ">{timestamp_to_readable_value(Number(selectedItem.job.created_at))}</p>
                                                </span>

                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">General Permit Status</p>
                                                    {selectedItem.job.general_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedItem.job.general_permit_status.replace(/_/g, ' ')}</p>:
                                                    <p className="text-sm w-[50%] font-medium ">-</p>}
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">General Permit Submit Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.general_permit_submit_date != 0 ? readable_day(Number(selectedItem.job.general_permit_submit_date)) : '-'}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">General Permit Approval Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.general_permit_approval_date != 0 ? readable_day(Number(selectedItem.job.general_permit_approval_date)) : '-'}</p>
                                                </span>
                                                
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">General Permit Number</p>
                                                    <p className="text-sm w-[50%] font-medium ">{selectedItem.job.general_permit_number || '-'}</p>
                                                </span>
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                    <p className="text-sm text-start ">General Permit Documents</p>
                                                    <span className="w-full flex flex-col items-start justify-start gap-[5px] ">
                                                        {
                                                            selectedItem.job.general_permit_document.map((data:string, ind:number)=>{
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
                                                
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Hoa Permit Status</p>
                                                    {selectedItem.job.hoa_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedItem.job.hoa_permit_status.replace(/_/g, ' ')}</p>:
                                                    <p className="text-sm w-[50%] font-medium ">-</p>}
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Hoa Permit Submit Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.hoa_permit_submit_date != 0 ? readable_day(Number(selectedItem.job.hoa_permit_submit_date)) : '-'}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Hoa Approval Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.hoa_permit_approval_date != 0 ? readable_day(Number(selectedItem.job.hoa_permit_approval_date)) : '-'}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Hoa Permit Number</p>
                                                    <p className="text-sm w-[50%] font-medium ">{selectedItem.job.hoa_permit_number || '-'}</p>
                                                </span>
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                    <p className="text-sm text-start ">Hoa Permit Documents</p>
                                                    <span className="w-full  flex flex-col items-start justify-start gap-[5px] ">
                                                        {
                                                            selectedItem.job.hoa_permit_document.map((data:string, ind:number)=>{
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
                                                
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Engineering Permit Status</p>
                                                    {selectedItem.job.engineering_permit_status ? <p className="text-sm w-[50%] font-medium ">{selectedItem.job.engineering_permit_status.replace(/_/g, ' ')}</p>:
                                                    <p className="text-sm w-[50%] font-medium ">-</p>}
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Engineering Permit Submit Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.engineering_permit_submit_date != 0 ? readable_day(Number(selectedItem.job.engineering_permit_submit_date)) : '-'}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Engineering Permit Approval Date</p>
                                                    <p className="text-sm w-[50%] font-medium ">{ selectedItem.job.engineering_permit_approval_date != 0 ? readable_day(Number(selectedItem.job.engineering_permit_approval_date)) : '-'}</p>
                                                </span>
                                                <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                    <p className="text-sm w-[50%] ">Engineering Permit Number</p>
                                                    <p className="text-sm w-[50%] font-medium ">{selectedItem.job.engineering_permit_number || '-'}</p>
                                                </span>
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px]  ">
                                                    <p className="text-sm text-start ">Engineering Permit Documents</p>
                                                    <span className="w-full flex flex-col items-start justify-start gap-[5px] ">
                                                        {
                                                            selectedItem.job.engineering_permit_document.map((data:string, ind:number)=>{
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
                                            
                                            }

                                            {
                                                selectedItem.lead && 

                                                <div className="w-full flex flex-col items-start justify-start gap-[15px] flex-1 overflow-y-auto "> 
                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Lead Id</p>
                                                        <p className="text-sm w-[50%] font-medium "> {selectedItem.lead.lead_ind}</p>
                                                    </span>
                                                    
                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Updated On</p>
                                                        <p className="text-sm w-[50%] font-medium ">{timestamp_to_readable_value(Number(selectedItem.lead.updated_at))}</p>
                                                    </span>

                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Customer Name</p>
                                                        <p className="text-sm w-[50%] font-medium ">{selectedItem.lead.customer_first_name} {selectedItem.lead.customer_last_name} </p>
                                                    </span>

                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Customer Email</p>
                                                        <p className="text-sm w-[50%] font-medium ">{selectedItem.lead.customer_email || "n/a"}</p>
                                                    </span>

                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Customer Phone</p>
                                                        <p className="text-sm w-[50%] font-medium ">{selectedItem.lead.customer_phone} {selectedItem.lead.customer_last_name} </p>
                                                    </span>

                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Disposition</p>
                                                        <p className="text-sm w-[50%] font-medium ">{selectedItem.lead.disposition.replace(/_/g, " ")} {selectedItem.lead.customer_last_name} </p>
                                                    </span>

                                                    <span className="w-full flex items-start justify-start gap-[10px] px-[10px]  ">
                                                        <p className="text-sm w-[50%] ">Gate Code</p>
                                                        <p className="text-sm w-[50%] font-medium ">{selectedItem.lead.gate_code} </p>
                                                    </span>

                                                    <span className="w-full flex flex-col items-start justify-start gap-[10px] px-[10px] ">
                                                        <p className="text-sm text-start ">Contract Documents</p>
                                                        <span className="w-full flex flex-col items-start justify-start gap-[5px] ">
                                                            {
                                                                selectedItem.lead.contract_document.map((data:string, ind:number)=>{
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
                                            }
                                        </div>

                                    </div>
                                    
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

export default NotificationModal