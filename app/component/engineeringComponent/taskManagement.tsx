'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { get_auth_request } from '../../api/admin_api';
import TaskModal from './taskModal';
// import Task_Management_Modal from "./opsTasksModal"

interface Tasks_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_tasks?: number; // Now optional and can be undefined
    tasks: any;
}  

const TaskManagement = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
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
        get_all_tasks(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_tasks(pg_number: number) {

        console.log('started fetching');
        
        const response = await get_auth_request(`app/all-paginated-task/${pg_number}`)

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
        let max_page_number = task_box?.total_number_of_pages

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

        get_all_tasks(new_page_number)
    }

    const render_page_numbers = () => {
        const pages: JSX.Element[] = []; // Explicitly type the array as JSX.Element[]
        const max_page_number = task_box?.total_number_of_pages || 1;
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
    
        if (task_box && task_box.tasks) {
            if (value.trim() !== '') {
                const new_tasks = task_box.tasks.filter((data: any) => {
                    const task_ind = data.toLowerCase().task_ind || '';
                    const job_ind = data.job.toLowerCase().job_ind || '';
                    const required_action = data.toLowerCase().required_action || ''
                    
                    return (
                        
                        task_ind.includes(value) ||
                        job_ind.includes(value) || 
                        required_action.includes(value) 

                    );
                });
                    
                setFiltered_task_box({...filtered_task_box, tasks: new_tasks});
            } else {
                setFiltered_task_box(task_box); 
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

    function upload_drawing(task:any){
        setShowModal(true)
        setSelectedTask(task)
        setModalFor('upload')
    }

    function edit_task(task:any){
        setShowModal(true)
        setSelectedTask(task)
        setModalFor('edit')
    }

    function delete_task(task:any){
        setShowModal(true)
        setSelectedTask(task)
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
                        <p className="text-md font-semibold text-black">All Tasks</p>
                        <p className="text-sm text-black">{(filtered_task_box?.tasks && filtered_task_box.tasks.length) || 0 }</p>
                    </span>

                    <span className=" flex flex-row items-center justif-start gap-[10px] h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by task id, job id, note, start date ...' id="" className='normal-input bg-gray-100 text-sm ' />
                        </span>
                        
                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Pending', 'In Progress', 'Completed', 'All' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>

                    </span>

                        

                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Task ID</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Job ID</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Customer Name</p>
                        <p className="text-sm font-normal w-[17.5%] px-2 ">Permit Type(s)</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Status</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Required Action</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Document Upload</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Action</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_task_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {task_box?.tasks.length ?
                                <>
                                { filtered_task_box?.tasks.map((data:any, ind:number)=>{
                                    const {task_ind, job, description, assigned_to, created_by, start_date, due_date, completion_date, status,  } = data

                                    const {engineering_permit_status, hoa_permit_status, general_permit_status, lead} = job

                                    const {customer_last_name, customer_first_name} = lead

                                    const getPermitTypes = () => {
                                        const types = [];
                                    
                                        if (engineering_permit_status === 'required') types.push('Engineering');
                                        if (hoa_permit_status === 'required') types.push('Hoa');
                                        if (general_permit_status === 'required') types.push('General');
                                    
                                        return types.length > 0 ? types.join(', ') : 'None'; // Join types with commas, or show 'None' if no type is required.
                                    };

                                    return (
                                        <span key={ind} className="recent-activity-table-list " >
                                            <p className="text-sm w-[7.5%] px-2 ">{task_ind} </p>
                                            <p className="text-sm w-[7.5%] px-2 ">{job.job_ind} </p>
                                            <p className="text-sm w-[15%] px-2 "> {customer_first_name} {customer_last_name} </p>
                                            <p className="text-sm w-[17.5%] px-2 "> {getPermitTypes()} </p>
                                            <p className="text-sm w-[10%] px-2 "> {'pending'} </p>
                                            <p className="text-sm w-[15%] px-2 "> {'Prepare Drawings'} </p>
                                            <p className="text-sm w-[15%] px-2 "> {'No File Uploaded'} </p>
                                            <span className="w-[12.5%] flex px-2 items-center justify-between gap-[10px] ">
                                                <p className="text-sm cursor-pointer hover:text-blue-600 hover:underline " onClick={()=> upload_drawing(data)} > {'upload'} </p>
                                                {/* <p className="text-sm "> {'View'} </p>
                                                <p className="text-sm "> {'Update'} </p> */}
    
                                            </span>
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
                    
                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm">Showing 1-15 of {(filtered_task_box?.tasks && filtered_task_box.tasks.length) || 0 }</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <TaskModal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedTask={selectedTask} setModalFor={setModalFor} setSelectedTask={setSelectedTask} /> }
        </div>
    )
}

export default TaskManagement