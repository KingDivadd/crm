'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import Job_Management_Modal from "./salesJobManagementModal"
import { timestamp_to_readable_value } from '../helper';

interface Jobs_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_jobs_pages?: number; // Now optional and can be undefined
    total_number_of_jobs?: number; // Now optional and can be undefined
    jobs: any;
}  

const SalesJobPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [job_box, setjob_box] = useState<Jobs_Props | null>(null);
    const [filtered_job_box, setFiltered_job_box] = useState<Jobs_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', general_permit_status: '', hoa_permit_status: ''})
    const [role, setRole] = useState('')

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        general_permit_status: false, hoa_permit_status: false, engineering_permit_status: false, electrical_permit_status: false
    });
    const [dropElements, setDropElements] = useState({
        general_permit_status: 'Permit Status', hoa_permit_status: 'Hoa Status', engineering_permit_status: 'Engingeering Status', electrical_permit_status: 'Electrical Status'

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
        handle_new_filter(dropdown)
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }


    useEffect(() => {
        const user_role = localStorage.getItem('user-role')
        if (user_role) {
            setRole(user_role)
        }
        get_all_jobs(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_jobs(page_num:number) {

        
        const response = await get_auth_request(`auth/all-jobs/${page_num}`)

        if (response.status == 200 || response.status == 201){
            
            setjob_box(response.data)      
            
            setFiltered_job_box(response.data)            

        }else{
            
            if (response.response){
                showAlert(response.response.data.err, "error")
            }
        }
    }


    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = job_box?.total_number_of_jobs_pages

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

        get_all_jobs(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = job_box?.total_number_of_jobs_pages || 1;
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
    
        if (job_box && job_box.jobs) {
            if (value.trim() !== '') {
                const new_jobs = job_box.jobs.filter((data: any) => {
                    const contract_amount = data.contract_amount || '';
                    const contract_amount_two = Number(data.contract_amount).toLocaleString() || '';
                    const lead_id = data.lead?.lead_ind?.toLowerCase() || '';
                    const job_id = data.job_ind?.toLowerCase() || '';
                    const assigned_to = data.lead?.assigned_to?.first_name.toLowerCase() || ''
                    const assigned_to_last_name = data.lead?.assigned_to?.last_name.toLowerCase() || ''

                    
                    return (
                        String(contract_amount).includes(value) || 
                        contract_amount_two.includes(value) ||
                        job_id.includes(value) ||
                        assigned_to.includes(value) ||
                        assigned_to_last_name.includes(value) ||
                        lead_id.includes(value) 
                    );
                });
                    
                setFiltered_job_box({...filtered_job_box, jobs: new_jobs});
            } else {
                setFiltered_job_box(job_box); 
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (job_box && item.toLocaleLowerCase() == 'all') {
            
            setFiltered_job_box(job_box);
        
        } 
        else if (item && job_box) {
            
            const new_jobs = job_box.jobs.filter((data: any) => {
                const permit_status = data.permit_status?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                return (
                    permit_status === item.toLowerCase()
                );
            });
    
            setFiltered_job_box({ ...job_box, jobs: new_jobs });
        } else {
            setFiltered_job_box(job_box);
        }
    }
    
    function add_job(){
        setShowModal(true)
        setSelectedJob(null)
        setModalFor('add')
    }

    function edit_job(job:any){
        setShowModal(true)
        setSelectedJob(job)
        setModalFor('edit')
    }

    function delete_job(job:any){
        setShowModal(true)
        setSelectedJob(job)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px] ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-2">
                        <p className="text-md font-semibold text-black">All Jobs</p>
                        <p className="text-sm text-black">{(job_box && job_box?.total_number_of_jobs) || 0 }</p>
                    </span>

                    <span className=" flex flex-row items-center justif-start gap-[10px] h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="filter-input" onChange={handleFilter} placeholder='search for job...' id="" className='normal-input bg-gray-100 text-sm ' />
                        </span>

                        {/* <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'hoa_permit_status'} dropArray={['PENDING', 'SENT', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span> */}
{/* 
                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'general_permit_status'} dropArray={['SUBMITTED', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span> */}

                        {/* <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'engineering_permit_status'} dropArray={['SUBMITTED', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>

                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'electrical_permit_status'} dropArray={['SUBMITTED', 'APPROVED', 'REJECTED', 'NOT REQUIRED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span> */}
                        
                        {role == 'sales' && 
                        <button className="h-full px-5 text-sm bg-blue-700 hover:bg-blue-600 rounded-[3px] text-white" onClick={add_job}>Create Job</button>
                        }

                    </span>

                        

                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[3px]">
                    {(role == 'sales' || role == 'admin') ? 
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Job Id</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Lead Id</p>
                        <p className="text-sm font-normal w-[11.5%] px-2 ">Contract Amt</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Contract Date</p>
                        <p className="text-sm font-normal w-[13.5%] px-2 ">Assigned To</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Created At</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Last Updated</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Action</p>
                        <p className="text-sm font-normal w-[10%] px-2 "></p>
                    </span>:
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Job Id</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Lead Id</p>
                        <p className="text-sm font-normal w-[11.5%] px-2 ">Contract Amt</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Contract Date</p>
                        <p className="text-sm font-normal w-[13.5%] px-2 ">Assigned To</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Created At</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Last Updated</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Action</p>
                        <p className="text-sm font-normal w-[10%] px-2 "></p>
                    </span>}

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_job_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {job_box?.jobs.length ?
                                <>
                                { filtered_job_box?.jobs.map((data:any, ind:number)=>{

                                    
                                    const {job_ind, lead, contract_amount, contract_date, hoa_permit_status, electrical_permit_status, general_permit_status, engineering_permit_status, created_at, updated_at } = data
                                    return (
                                        <>
                                        {(role == 'sales' || role == 'admin') ? 
                                        <span key={ind} className="recent-activity-table-list group" >
                                            <p className="text-sm w-[7.5%] px-2 ">{job_ind} </p>
                                            <p className="text-sm w-[7.5%] px-2 ">{lead.lead_ind} </p>
                                            <p className="text-sm w-[11.5%] px-2 ">$ {Number(contract_amount).toLocaleString()} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {contract_date} </p>
                                            <p className="text-sm w-[13.5%] px-2 "> {lead.assigned_to.first_name} {lead.assigned_to.last_name} </p>
                                            <p className="text-sm w-[15%] px-2 "> {timestamp_to_readable_value(Number(created_at))} </p>
                                            <p className="text-sm w-[15%] px-2 "> {timestamp_to_readable_value(Number(updated_at))} </p>
                                        
                                            <p className="text-sm w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-amber-500 cursor-pointer" onClick={()=>{edit_job(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                            <p className="text-sm w-[10.0%] px-2 flex flex-row items-center justify-start gap-2 hover:text-red-400 cursor-pointer" onClick={()=>delete_job(data)} ><MdDeleteForever size={18} /> Delete</p>
                                        </span>
                                        :
                                        <span key={ind} className="recent-activity-table-list " onClick={()=> edit_job(data)} >
                                            <p className="text-sm w-[7.5%] px-2 ">{job_ind} </p>
                                            <p className="text-sm w-[7.5%] px-2 ">{lead.lead_ind} </p>
                                            <p className="text-sm w-[11.5%] px-2 ">$ {Number(contract_amount).toLocaleString()} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {contract_date} </p>
                                            <p className="text-sm w-[13.5%] px-2 "> {lead.assigned_to.first_name} {lead.assigned_to.last_name} </p>
                                            <p className="text-sm w-[15%] px-2 "> {timestamp_to_readable_value(Number(created_at))} </p>
                                            <p className="text-sm w-[15%] px-2 "> {timestamp_to_readable_value(Number(updated_at))} </p>
                                        
                                            <p className="text-sm w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-amber-500 cursor-pointer" onClick={()=>{edit_job(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                            <p className="text-sm w-[10.0%] px-2 flex flex-row items-center justify-start gap-2 hover:text-red-400 cursor-pointer" onClick={()=>delete_job(data)} ><MdDeleteForever size={18} /> Delete</p>
                                        
                                        </span>}
                                        </>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No jobs yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Data...</p>
                            </div>
                        
                        }
                    
                    </div>
                    
                    <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm">Showing 1-15 of {(job_box && job_box?.total_number_of_jobs) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <Job_Management_Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedJob={selectedJob} setModalFor={setModalFor} setSelectedJob={setSelectedJob} /> }
        </div>
    )
}

export default SalesJobPage