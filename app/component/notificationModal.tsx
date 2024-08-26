'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

import { DropDownBlankTransparent } from './dropDown'
import { CiWarning } from 'react-icons/ci'
import Alert from './alert'
import { get_auth_request } from '../api/admin_api'


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
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_leads, setAll_leads] = useState([])
    const [filtered_leads, setFiltered_leads] = useState([])
    const [show_all_lead, setShow_all_lead] = useState(false)
    const [selected_lead, setSelected_lead] = useState('')
    const [role, setRole] = useState('')


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

    function filter_user(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value
            
        const filtered_items = all_leads.filter((data: { customer_name: string,  lead_ind: string }) =>
            data.customer_name.toLowerCase().includes(value.toLowerCase()) ||
            data.lead_ind.toLowerCase().includes(value.toLowerCase())
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
            console.log('seleted job ',selectedItem)
            const {
                lead_id, contract_amount, contract_date, lead,
                hoa_permit_status, hoa_permit_submit_date, hoa_permit_approval_date, hoa_permit_documents, 
                engineering_permit_submit_date, engineering_permit_approval_date, engineering_permit_status, engineering_permit_documents, 
                electrical_permit_submit_date, electrical_permit_approval_date, electrical_permit_status, electrical_permit_documents, 
                general_permit_submit_date, generall_permit_approval_date, general_permit_status, general_permit_documents, 
                cover_color, cover_size,  attached, structure_type, description, end_cap_style, trim_color, permit_number 
            } = selectedItem

            
            setAuth({...auth,  
                lead_id, contract_amount, contract_date, 
                hoa_permit_status, hoa_permit_submit_date, hoa_permit_approval_date, hoa_permit_documents, 
                engineering_permit_submit_date, engineering_permit_approval_date, engineering_permit_status, engineering_permit_documents, 
                electrical_permit_submit_date, electrical_permit_approval_date, electrical_permit_status, electrical_permit_documents, 
                general_permit_submit_date, generall_permit_approval_date, general_permit_status, general_permit_documents, 
                cover_color, cover_size, trim_color, attached, structure_type, description, end_cap_style, permit_number 
             })

            // setDropElements({...dropElements,
            //     hoa_permit_status: hoa_permit_status.replace(/_/g, ' '), engineering_permit_status: engineering_permit_status.replace(/_/g, ' '),
            //     electrical_permit_status: electrical_permit_status.replace(/_/g, ' '), general_permit_status: general_permit_status.replace(/_/g, ' ')
                
            // }); 

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

   

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": modalFor =='add' ? "w-full h-screen pt-[60px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[60px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={modalFor == 'delete' ?  "h-auto w-[70%] mx-auto shadow-xl flex items-start ": modalFor == 'add' ?  "h-auto w-[65%] mx-auto shadow-xl flex items-start ": "h-auto w-[65%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">
                                

                                {modalFor == 'view' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] pt-0 ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] z-[15] ">
                                        <p className="text-md flex items-center gap-[10px] ">Edit Job: <p className="text-md font-medium">{selectedItem.job_ind}</p> </p>

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
                                                        <input type="hoa_permit_status" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='normal-input text-sm' />
                                                </span>

                                                <div className="w-full h-[315px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-white shadow-md rounded-[5px] ">
                                                        <div className="w-full flex flex-col items-start justify-start">
                                                            {filtered_leads.map((data, ind)=>{
                                                                const {customer_name, customer_contract_date, hoa_permit_status, lead_id, lead_ind } = data
                                                                return(
                                                                    <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-100 px-[10px] gap-[10px] rounded-[3px] " onClick={()=> {setSelected_lead(customer_name); setAuth({...auth, lead_id: lead_id}); setShow_all_lead(!show_all_lead) }}>

                                                                        <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer "  >

                                                                            <p className="text-start text-sm text-slate-900 " >{lead_ind} </p>


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
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Amount</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_amount' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Contract Date</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='contract_date' placeholder='yyyy-mm-dd' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover size</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_size' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Cover color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='cover_color' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">Trim color</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='trim_color' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>
                                            
                                        </div>
                                        
                                        <div className="w-1/2 flex flex-col item-start justify-start gap-[20px]">

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
                                                    <input type="text" name='description' placeholder='' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-slate-900">End Cap Style</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='end_cap_style' value={''} onChange={handle_change} className='normal-input text-sm' />
                                                </span>
                                            </span>

                                            

                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-sm text-white">.</p>
                                                
                                              
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

export default NotificationModal