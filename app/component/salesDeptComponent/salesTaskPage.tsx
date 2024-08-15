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

interface Tasks_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_tasks_pages?: number; // Now optional and can be undefined
    total_number_of_tasks?: number; // Now optional and can be undefined
    tasks: any;
}  

const SalesTaskPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [task_box, settask_box] = useState<Tasks_Props | null>(null);
    const [filtered_task_box, setFiltered_task_box] = useState<Tasks_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', status: '', hoa_status: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false, hoa_status: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status', hoa_status: 'Hoa Status'

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
        get_all_tasks()
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_tasks() {

        console.log('started fetching');
        
        const response = await get_auth_request(`auth/all-tasks/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            settask_box(response.data)      
            
            setFiltered_task_box(response.data)

            console.log('here : ', response.data);
            

        }else{
            console.log(response);
            
            if (response.response){
                showAlert(response.response.data.err, "error")
            }
        }
    }

    async function filter_tasks(item:any) {

        console.log('started fetching');
        
        const response = await get_auth_request(`/filter-tasks/${item}/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            settask_box(response.data)      
            
            setFiltered_task_box(response.data)

            console.log(response.data);
            
            showAlert(response.data.msg, "success")

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = task_box?.total_number_of_tasks_pages

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

        console.log('new page number ', new_page_number);

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = task_box?.total_number_of_tasks_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-500 text-white' : ''
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
                page_number === i ? 'bg-blue-500 text-white' : ''
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
    
        if (task_box && task_box.tasks) {
            if (value.trim() !== '') {
                const new_tasks = task_box.tasks.filter((data: any) => {
                    const contract_amount = data.contract_amount || '';
                    const lead_name = data.lead?.customer_name?.toLowerCase() || '';

                    
                    return (
                        String(contract_amount).includes(value) || 
                        lead_name.includes(value) 
                    );
                });
                    
                setFiltered_task_box({...filtered_task_box, tasks: new_tasks});
            } else {
                setFiltered_task_box(task_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (task_box && item.toLocaleLowerCase() == 'all') {
            console.log('Disposition : all ',task_box);
            
            // If no filter is provided, reset to the original list
            setFiltered_task_box(task_box);
        
        } 
        else if (item && task_box) {

            const new_tasks = task_box.tasks.filter((data: any) => {
                const status = data.status?.toLowerCase() || '';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    status === item.toLowerCase()
                );
            });
    
            setFiltered_task_box({ ...task_box, tasks: new_tasks });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_task_box(task_box);
        }
    }

    // function edit_task(task:any){
    //     setShowModal(true)
    //     setSelectedJob(task)
    //     setModalFor('edit')
    // }

    function delete_task(task:any){
        setShowModal(true)
        setSelectedJob(task)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-2">
                        <p className="text-md font-semibold text-black">All Tasks</p>
                        <p className="text-sm text-black">{(task_box && task_box?.total_number_of_tasks) || 0 }</p>
                    </span>

                    <span className=" flex flex-row items-center justif-start gap-[10px] h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by name or contract amount' id="" className='normal-input bg-gray-100 text-sm ' />
                        </span>
                        
                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['PENDING', 'IN PROGRESS', 'COMPLETED' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>
                    </span>

                        

                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-600 text-white">
                        <p className="text-[16px] font-normal w-[7.5%] px-2 ">Task ID</p>
                        <p className="text-[16px] font-normal w-[7.5%] px-2 ">Job ID</p>
                        <p className="text-[16px] font-normal w-[15%] px-2 ">Desription</p>
                        <p className="text-[16px] font-normal w-[12.5%] px-2 ">Status</p>
                        <p className="text-[16px] font-normal w-[15%] px-2 ">Assigned To</p>
                        <p className="text-[16px] font-normal w-[10%] px-2 ">Start Date</p>
                        <p className="text-[16px] font-normal w-[10%] px-2 ">End Date</p>
                        <p className="text-[16px] font-normal w-[15%] px-2 ">Completion Date</p>
                        <p className="text-[16px] font-normal w-[7.5%] px-2 ">Action</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_task_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {task_box?.tasks.length ?
                                <>
                                { filtered_task_box?.tasks.map((data:any, ind:number)=>{
                                    const {task_ind, job, description, assigned_to, created_by, start_date, due_date, completion_date, status,  } = data
                                    return (
                                        <span key={ind} className="recent-activity-table-list " >
                                            <p className="text-[15px] w-[7.5%] px-2 ">TS000{task_ind} </p>
                                            <p className="text-[15px] w-[7.5%] px-2 ">JB000{job.job_ind} </p>
                                            <p className="text-[15px] w-[15%] px-2 "> {description} </p>
                                            <p className="text-[15px] w-[12.5%] px-2 "> {status} </p>
                                            <p className="text-[15px] w-[15%] px-2 "> {assigned_to.last_name} {assigned_to.first_name} </p>
                                            <p className="text-[15px] w-[10%] px-2 "> {start_date} </p>
                                            <p className="text-[15px] w-[10%] px-2 "> {due_date} </p>
                                            <p className="text-[15px] w-[15%] px-2 "> {completion_date} </p>
                                            <p className="text-[15px] w-[7.5%] px-2 flex flex-row items-center justify-start gap-2  hover:text-lime-600 cursor-pointer"  ><MdEdit size={16} /> Edit</p>

                                        </span>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No tasks yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Data...</p>
                            </div>
                        
                        }
                    
                    </div>
                    
                    <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm">Showing 1-15 of {(task_box && task_box?.total_number_of_tasks) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <Job_Management_Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedJob={selectedJob} setModalFor={setModalFor} setSelectedJob={setSelectedJob} /> }
        </div>
    )
}

export default SalesTaskPage