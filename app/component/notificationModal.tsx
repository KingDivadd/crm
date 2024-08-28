'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

import { DropDownBlankTransparent } from './dropDown'
import { CiWarning } from 'react-icons/ci'
import Alert from './alert'
import { get_auth_request, patch_auth_request } from '../api/admin_api'


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

    
    useEffect(() => {
        console.log('selected notification ', selectedItem)
        const auth_id = localStorage.getItem('key') || ''
       
        const {read, read_by} = selectedItem

        if (read_by.includes(auth_id) && read) {
            setStatus('read')
        }else{
            setStatus('unread')
        }
        update_notification()
        
    }, [])

    async function update_notification() {
        try {
            const response = await patch_auth_request(`user/update-notification-status/${selectedItem.notification_id}`, {})
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
                <div className={ "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={modalFor == 'delete' ?  "h-auto w-[70%] mx-auto shadow-xl flex items-start ": modalFor == 'add' ?  "h-auto w-[55%] mx-auto shadow-xl flex items-start ": "h-auto w-[55%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">
                                

                                {modalFor == 'view' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">

                                        <h4 className="text-md flex items-center gap-[10px] ">Subject: 
                                            <p className="text-md font-medium">{selectedItem.subject}</p> 
                                        </h4>

                                        <p className={status == 'read' ? "text-md text-green-600 px-2 ":"text-md px-2 text-red-600 "}>{status}</p>

                                    </span>

                                    <div className="w-full min-h-[200px] flex flex-col items-start gap-10 justify-start">

                                        <span className="w-full flex flex-col gap-[10px]">
                                            <p className="text-sm">Details</p>
                                            <p className="text-sm font-medium">{selectedItem.message}</p>
                                        </span>

                                        <span className="w-full flex flex-col gap-[10px]">
                                            <p className="text-sm">Initiated By</p>
                                            <p className="text-sm font-medium">{selectedItem.user.user_ind}. {selectedItem.user.first_name} {selectedItem.user.last_name } ({selectedItem.user.user_role})  </p>
                                        </span>

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