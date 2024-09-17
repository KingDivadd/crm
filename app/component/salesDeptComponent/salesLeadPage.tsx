'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import ViewLead from './salesViewLead';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import Lead_Management_Modal from "./salesLeadManagementModal"
import { readable_day } from '../helper';

interface Leads_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_leads_pages?: number; // Now optional and can be undefined
    total_number_of_leads?: number; // Now optional and can be undefined
    leads: any;
}  

const SalesLeadPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedLead, setSelectedLead] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const [role, setRole] = useState('')

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
        setDropElements({...dropElements, [dropdown]: 'SELECT'});
    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        handle_new_filter(dropdown.replace(/ /g, '_'))
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }


    useEffect(() => {
        const user_role = localStorage.getItem('user-role')
        if (user_role) {
            setRole(user_role)
        }else{
            setRole('sales')
        }
        get_all_leads()
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_leads() {
        
        const response = await get_auth_request(`app/all-paginated-leads/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setLead_box(response.data)      
            
            setFiltered_lead_box(response.data)       
            
        }else{        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = lead_box?.total_number_of_leads_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = lead_box?.total_number_of_leads_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-[15.5px] font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-[15.5px] font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    async function handleFilter(e: any) {
        const value = e.target.value.toLowerCase();
        setFilters({ ...filters, filter_input: value });
    
        if (lead_box && lead_box.leads) {
            if (value.trim() !== '') {
                const filtered_leads = lead_box.leads.filter((data: any) => {
                    const lead_ind = data.lead_ind?.toLowerCase() || '';
                    const lead_designer = data.lead_designer?.first_name.toLowerCase() || data.lead_designer?.last_name.toLowerCase() || '';
                    const customer_first_name = data.customer_first_name?.toLowerCase() || '';
                    const customer_last_name = data.customer_last_name?.toLowerCase() || '';
                    const first_name = data.lead_designer?.first_name?.toLowerCase() || '';
                    const last_name = data.lead_designer?.last_name?.toLowerCase() || '';
                    const other_names = data.lead_designer?.other_names?.toLowerCase() || '';
                    const phone_number = data.customer_phone || ''
                    
                    return (
                        lead_ind.includes(value) ||
                        first_name.includes(value) ||
                        last_name.includes(value) ||
                        other_names.includes(value) ||
                        lead_designer.includes(value) ||
                        customer_last_name.includes(value) || 
                        customer_first_name.includes(value) || 
                        phone_number.includes(value)
                    );
                });
                
    
                setFiltered_lead_box({...filtered_lead_box, leads:filtered_leads});
            } else {
                setFiltered_lead_box(lead_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (lead_box && item.toLocaleLowerCase() == 'all') {            
            // If no filter is provided, reset to the original list
            setFiltered_lead_box(lead_box);
        
        } 
        else if (item && lead_box) {            
            const new_leads = lead_box.leads.filter((data: any) => {
                const disposition = data.disposition?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    disposition === item.toLowerCase()
                );
            });
    
            setFiltered_lead_box({ ...lead_box, leads: new_leads });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_lead_box(lead_box);
        }
    }
    
    function add_lead(){
        setShowModal(true)
        setSelectedLead(null)
        setModalFor('add')
    }

    function edit_lead(lead:any){
        setShowModal(true)
        setSelectedLead(lead)
        setModalFor('edit')
    }

    function upload_lead_doc(lead:any){
        sessionStorage.setItem('lead_modal', 'upload_lead_file')
        setShowModal(true)
        setSelectedLead(lead)
        setModalFor('edit')
    }

    function delete_lead(lead:any){
        setShowModal(true)
        setSelectedLead(lead)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-[15px]">
                        <p className="text-md font-medium text-black">All Leads</p>
                        <p className="text-md font-medium text-black">{(filtered_lead_box && filtered_lead_box?.leads.length) || 0 }</p>
                    </span>

                    <span className="flex flex-row items-start justify-start gap-[20px]">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 text-[15px] ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['All', 'Sold', 'Not Sold', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            {(role == 'sales' || role == 'admin' || role == "super_admin") && <button type="button" className="h-full px-4 flex items-center text-white bg-blue-700 hover:bg-blue-700 rounded-[4px] text-[15.5px]" onClick={add_lead}>Add Lead</button>}
                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    {(role == 'sales' || role == 'admin' || role == 'super_admin' ) ? 
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-[15.5px] font-normal w-[7.5%] px-2 ">Lead Id</p>
                        <p className="text-[15.5px] font-normal w-[15%] px-2 ">Lead Name</p>
                        <p className="text-[15.5px] font-normal w-[15%] px-2 ">Address</p>
                        <p className="text-[15.5px] font-normal w-[11.5%] px-2 ">Phone </p>
                        <p className="text-[15.5px] font-normal w-[13.5%] px-2 ">Designer</p>
                        <p className="text-[15.5px] font-normal w-[9%] px-2 ">Disposition</p>
                        <p className="text-[15.5px] font-normal w-[12.5%] px-2 ">Updated On</p>
                        <p className="text-[15.5px] font-normal w-[7.5%] px-2 ">Action</p>
                        <p className="text-[15.5px] font-normal w-[9%] px-2 "></p>
                    </span>:
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-[15.5px] font-normal w-[7.5%] px-2 ">Lead Id</p>
                        <p className="text-[15.5px] font-normal w-[15%] px-2 ">Lead Name</p>
                        <p className="text-[15.5px] font-normal w-[15%] px-2 ">Address</p>
                        <p className="text-[15.5px] font-normal w-[10%] px-2 ">Phone </p>
                        <p className="text-[15.5px] font-normal w-[10.5%] px-2 ">Uploads</p>
                        <p className="text-[15.5px] font-normal w-[9%] px-2 ">Disposition</p>
                        <p className="text-[15.5px] font-normal w-[12.5%] px-2 ">Updated On</p>
                        <p className="text-[15.5px] font-normal w-[11.5%] px-2 ">Added By</p>
                        <p className="text-[15.5px] font-normal w-[9%] px-2 ">Action</p>
                    </span>}

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_lead_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {lead_box?.leads.length ?
                                <>
                                { filtered_lead_box?.leads.map((data:any, ind:number)=>{
                                    const {customer_last_name, customer_first_name, customer_state, customer_city, customer_zip, customer_phone, lead_adder, updated_at, lead_designer, disposition, lead_ind, gate_code, contract_document} = data
                                    return (
                                        <div key={ind}>
                                        {(role == 'sales' || role == 'admin' || role == 'super_admin' ) ? 
                                        <span className="recent-activity-table-list " >
                                            <p className="text-[15.5px] w-[7.5%] px-2 "> {lead_ind} </p>
                                            <p className="text-[15.5px] w-[15%] px-2 "> {customer_first_name} {customer_last_name} </p>
                                            <p className="text-[15.5px] w-[15%] px-2 "> {customer_state}, {customer_city} </p>
                                            <p className="text-[15.5px] w-[11.5%] px-2 "> {customer_phone} </p>
                                            <p className="text-[15.5px] w-[13.5%] px-2 "> {lead_designer.last_name} {lead_designer.first_name} </p>
                                            <p className={disposition == "sold" ? "text-[15.5px] w-[9%] px-2 text-green-600": "text-red-600 text-[15.5px] w-[9%] px-2 "}> {disposition.replace(/_/g, " ")} </p>
                                            <p className="text-[15.5px] w-[12.5%] px-2 "> {readable_day(Number(updated_at))} </p>
                                            <p className="text-[15.5px] w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-amber-500 cursor-pointer" onClick={()=>{edit_lead(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                            <p className="text-[15.5px] w-[9%] px-2 flex flex-row items-center justify-start gap-2 hover:text-red-400 cursor-pointer" onClick={()=>delete_lead(data)} ><MdDeleteForever size={18} /> Delete</p>
                                        </span>:
                                        <span className="recent-activity-table-list " >
                                            <p className="text-[15.5px] w-[7.5%] px-2 "> {lead_ind} </p>
                                            <p className="text-[15.5px] w-[15%] px-2 "> {customer_first_name} {customer_last_name}  </p>
                                            <p className="text-[15.5px] w-[15%] px-2 "> {customer_state}, {customer_city} </p>
                                            <p className="text-[15.5px] w-[10%] px-2 "> {customer_phone} </p>
                                            <p className={contract_document.length ? "text-[15.5px] w-[10.5%] px-2 text-green-600": "text-red-600 text-[15.5px] w-[10.5%] px-2 "}> {contract_document.length ? "true": "false"} </p>
                                            <p className={disposition == "sold" ? "text-[15.5px] w-[9%] px-2 text-green-600": "text-red-600 text-[15.5px] w-[9%] px-2 "}> {disposition.replace(/_/g, " ")} </p>
                                            <p className="text-[15.5px] w-[12.5%] px-2 ">{readable_day(Number(updated_at))} </p>
                                            <p className="text-[15.5px] w-[11.5%] px-2 "> {lead_adder.last_name} {lead_adder.first_name} </p>
                                            <p className="text-[15.5px] w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-amber-500 cursor-pointer" onClick={()=>{upload_lead_doc(data)}} ><MdEdit size={16} /> Edit</p>
                                        </span>}
                                        </div>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No Leads yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-[15.5px] font-normal">Loading Data...</p>
                            </div>
                        
                        }
                    
                    </div>
                    
                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-[15.5px] cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-[15.5px] cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-[15.5px]">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <Lead_Management_Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedLead={selectedLead} setModalFor={setModalFor} setSelectedLead={setSelectedLead} /> }
        </div>
    )
}

export default SalesLeadPage