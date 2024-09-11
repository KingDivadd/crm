'use client'
import React, {useState, useEffect} from 'react'
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { get_auth_request } from '@/app/api/admin_api';
import JobListModal from './jobListModal';
import { readable_day } from '../helper';

interface Projects_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_projects?: number; // Now optional and can be undefined
    projects: any;
}  

const JobListPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [project_box, setProject_box] = useState<Projects_Props | null>(null);
    const [filtered_project_box, setFiltered_project_box] = useState<Projects_Props | null>(null);
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
            setRole('installer')
        }
        get_all_projects(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_projects(pg_number:number) {
        
        const response = await get_auth_request(`app/all-paginated-installable-projects/${pg_number}`)

        if (response.status == 200 || response.status == 201){
            
            setProject_box(response.data)      
            
            setFiltered_project_box(response.data)

            console.log('master ', response.data);


        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = project_box?.total_number_of_pages

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
        get_all_projects(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = project_box?.total_number_of_pages || 1;
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
    
        if (project_box && project_box.projects) {
            if (value.trim() !== '') {
                const filtered_projects = project_box.projects.filter((data: any) => {
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
                
    
                setFiltered_project_box({...filtered_project_box, projects:filtered_projects});
            } else {
                setFiltered_project_box(project_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (project_box && item.toLocaleLowerCase() == 'all') {
            console.log('Disposition : all ',project_box);
            
            // If no filter is provided, reset to the original list
            setFiltered_project_box(project_box);
        
        } 
        else if (item && project_box) {
            console.log(item);
            
            const new_projects = project_box.projects.filter((data: any) => {
                const disposition = data.disposition?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    disposition === item.toLowerCase()
                );
            });
    
            setFiltered_project_box({ ...project_box, projects: new_projects });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_project_box(project_box);
        }
    }
    
    function edit_project(item:any){
        setShowModal(true)
        setSelectedProject(item)
        setModalFor('add')
    }


    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All projects</p>
                        <p className="text-sm text-black">{(project_box && project_box?.total_number_of_projects) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 text-sm ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['All', 'Sold', 'Not Sold', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>

                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-[15px] font-normal w-[7.5%] px-2 ">Project Id</p>
                        <p className="text-[15px] font-normal w-[14%] px-2 ">Client Name</p>
                        <p className="text-[15px] font-normal w-[12%] px-2 ">Install Date</p>
                        <p className="text-[15px] font-normal w-[12%] px-2 ">Footing Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Set Post Date</p>
                        <p className="text-[15px] font-normal w-[12%] px-2 ">Demo Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Electrical Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Inspection Date</p>
                        <p className="text-[15px] font-normal px-2 w-[9.5%] ">Inspection</p>

                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_project_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {project_box?.projects.length ?
                                <>
                                { filtered_project_box?.projects.map((data:any, ind:number)=>{
                                    const {project_ind,job, lead, install } = data
                                    return (
                                        <div key={ind} className='recent-activity-table-list group' onClick={()=> edit_project(data)}>
                                            <p className="text-[15px] w-[7.5%] px-2 ">{project_ind} </p>
                                            <p className="text-[15px] w-[14%] px-2 ">{job.lead.customer_first_name} {job.lead.customer_last_name} </p>
                                            <p className="text-[15px] w-[12%] px-2 "> {install[0].install_date ? readable_day(Number(install[0].install_date)) : "N/A" } </p>
                                            <p className="text-[15px] w-[12%] px-2 "> {install[0].footing_date ? readable_day(Number(install[0].footing_date)) : "N/A"} </p>
                                            <p className="text-[15px] w-[12.5%] px-2 "> {install[0].set_post_date ? readable_day(Number(install[0].set_post_date)) : "N/A" } </p>
                                            <p className="text-[15px] w-[12%] px-2 "> {install[0].demo_date ? readable_day(Number(install[0].demo_date)) : "N/A" } </p>
                                            <p className="text-[15px] w-[12.5%] px-2 "> {install[0].electrical_date ? readable_day(Number(install[0].electrical_date)) : "N/A" } </p>
                                            <p className="text-[15px] w-[12.5%] px-2 "> {install[0].inspection_date ? readable_day(Number(install[0].inspection_date)) : "N/A" } </p>
                                            <p className="text-[15px]  px-2 w-[9.5%] "> {(install[0].inspection_status || install.inspection_status == 'n_a') ? install[0].inspection_status  : "N/A" } </p>
                                            
                                        </div>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No Project availale for Install yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Installable Projects...</p>
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
                            <p className="text-sm">Showing 1-15 of {(project_box && project_box?.total_number_of_projects) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal 
            && 
            <JobListModal showModal={showModal} setShowModal={setShowModal} setModalFor={setModalFor} modalFor={modalFor} selectedProject={selectedProject} setModalFor={setModalFor} setSelectedProject={setSelectedProject} /> }
        </div>
    )
}

export default JobListPage