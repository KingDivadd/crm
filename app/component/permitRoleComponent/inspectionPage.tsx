'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import InspectionModal from './inspectionPageModal';

interface inspections_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_inspections?: number; // Now optional and can be undefined
    inspections: any;
}  

const InspectionPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedInspection, setSelectedInspection] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [inspection_box, setInspection_box] = useState<inspections_Props | null>(null);
    const [filtered_inspection_box, setFiltered_inspection_box] = useState<inspections_Props | null>(null);
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
            setRole('permit')
        }
        get_all_inspections(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_inspections(pg_number:number) {

        console.log('started fetching');
        
        const response = await get_auth_request(`app/all-paginated-inspection/${pg_number}`)

        if (response.status == 200 || response.status == 201){
            
            setInspection_box(response.data)      
            
            setFiltered_inspection_box(response.data)

            console.log('inspection response ', response.data);
            

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function filter_inspections(item:any) {

        console.log('started fetching');
        
        const response = await get_auth_request(`/filter-inspections/${item}/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setInspection_box(response.data)      
            
            setFiltered_inspection_box(response.data)

            console.log(response.data);
            
            showAlert(response.data.msg, "success")

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = inspection_box?.total_number_of_pages

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

        get_all_inspections(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = inspection_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
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
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
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
    
        if (inspection_box && inspection_box.inspections) {
            if (value.trim() !== '') {
                const filtered_inspections = inspection_box.inspections.filter((data: any) => {
                    const customer_name = data.customer_name?.toLowerCase() || '';
                    const first_name = data.assigned_to?.first_name?.toLowerCase() || '';
                    const last_name = data.assigned_to?.last_name?.toLowerCase() || '';
                    const other_names = data.assigned_to?.other_names?.toLowerCase() || '';
                    const phone_number = data.phone_number || ''
                    
                    return (
                        first_name.includes(value) ||
                        last_name.includes(value) ||
                        other_names.includes(value) ||
                        customer_name.includes(value) || 
                        phone_number.includes(value)
                    );
                });
                
    
                setFiltered_inspection_box({...filtered_inspection_box, inspections:filter_inspections});
            } else {
                setFiltered_inspection_box(inspection_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (inspection_box && item.toLocaleLowerCase() == 'all') {
            console.log('Disposition : all ',inspection_box);
            
            // If no filter is provided, reset to the original list
            setFiltered_inspection_box(inspection_box);
        
        } 
        else if (item && inspection_box) {
            console.log(item);
            
            const new_inspections = inspection_box.inspections.filter((data: any) => {
                const disposition = data.disposition?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    disposition === item.toLowerCase()
                );
            });
    
            setFiltered_inspection_box({ ...inspection_box, inspections: new_inspections });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_inspection_box(inspection_box);
        }
    }
    
    function add_inspection(){
        setShowModal(true)
        setSelectedInspection(null)
        setModalFor('add')
    }

    function edit_inspection(inspection:any){
        setShowModal(true)
        setSelectedInspection(inspection)
        setModalFor('edit')
    }

    function delete_inspection(inspection:any){
        setShowModal(true)
        setSelectedInspection(inspection)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md font-medium text-black">All Inspection</p>
                        <p className="text-md text-black">{(inspection_box && inspection_box?.total_number_of_inspections) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 text-sm ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['All', 'Sold', 'Not Sold', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <button type="button" className="h-full px-5 flex items-center text-white bg-blue-700 hover:bg-blue-700 rounded-[4px] text-sm" onClick={add_inspection}>Add Inspection</button>
                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[10%] px-2 ">Inspection Id</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Install Id</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Inspector</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Status</p>
                        <p className="text-sm font-normal w-[17.5%] px-2 ">Last Inspection</p>
                        <p className="text-sm font-normal w-[17.5%] px-2 ">Inspector Comments</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Final Status</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Action</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_inspection_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {inspection_box?.inspections.length ?
                                <>
                                { filtered_inspection_box?.inspections.map((data:any, ind:number)=>{
                                    const {customer_name, address, phone_number, email, user_role, assigned_to, disposition, inspection_ind, gate_code} = data
                                    return (
                                        <span key={ind} className="recent-activity-table-list " >
                                            <p className="text-sm w-[7.5%] px-2 "> {inspection_ind} </p>
                                            <p className="text-sm w-[14.5%] px-2 "> {customer_name} </p>
                                            <p className="text-sm w-[25%] px-2 "> {address} </p>
                                            <p className="text-sm w-[13%] px-2 "> {phone_number} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {} </p>
                                            <p className={disposition == "SOLD" ? "text-sm w-[10%] px-2 text-green-600": "text-red-600 text-sm w-[10%] px-2 "}> {disposition.replace(/_/g, " ")} </p>
                                            <p className="text-sm w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-green-600 cursor-pointer" onClick={()=>{edit_inspection(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                            <p className="text-sm w-[10%] px-2 flex flex-row items-center justify-start gap-2 hover:text-red-400 cursor-pointer" onClick={()=>delete_inspection(data)} ><MdDeleteForever size={18} /> Delete</p>
                                        </span>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No inspections yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Data...</p>
                            </div>
                        
                        }
                    
                    </div>
                    
                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm">Showing 1-15 of {(inspection_box && inspection_box?.total_number_of_inspections) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <InspectionModal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedInspection={selectedInspection} setModalFor={setModalFor} setSelectedInspection={setSelectedInspection} /> }
        </div>
    )
}

export default InspectionPage