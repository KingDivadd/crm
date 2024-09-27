'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import Project_Management_Modal from './projectManagementModal';
import { readable_day } from '../helper';

interface Projects_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_projects_pages?: number; // Now optional and can be undefined
    total_number_of_projects?: number; // Now optional and can be undefined
    projects: any;
}  

const CustomerProjectPage = () => {
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
        status: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Project Status'

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
            setRole('project')
        }
        get_all_projects(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_projects(page_num:number) {
        
        const response = await get_auth_request(`app/all-paginated-project/${page_num || 1}`)

        if (response.status == 200 || response.status == 201){
            
            setProject_box(response.data)      
            
            setFiltered_project_box(response.data)

            console.log('response ', response.data)

        }else{
        
        showAlert(response.response.data.err, "error")
        }
    }


    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = project_box?.total_number_of_projects_pages

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
        const max_page_number = project_box?.total_number_of_projects_pages || 1;
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
        const value = e.target.value.toLowerCase().trim();
        setFilters({ ...filters, filter_input: value });
    
        // Only apply filtering logic if there is a value to filter by
        if (project_box && project_box.projects) {
            if (value !== '') {
                const filtered_projects = project_box.projects.filter((data: any) => {
                    const project_ind = data.project_ind?.toLowerCase() || '';
                    const contract_amount = Number(data.contract_amount).toLocaleString() || '';
                    const contract_amount_without_comma = String(data.contract_amount) || '';
                    const structure_type = data.structure_type?.toLowerCase().replace(/ /g, '_') || '';
    
                    return (
                        project_ind.includes(value) ||
                        contract_amount.includes(value) ||
                        contract_amount_without_comma.includes(value) ||
                        structure_type.includes(value)
                    );
                });
    
                // Set the filtered projects to the state if any match the condition
                setFiltered_project_box({
                    ...filtered_project_box,
                    projects: filtered_projects
                });
            } else {
                // Reset to original projects list if input is cleared
                setFiltered_project_box({
                    ...filtered_project_box,
                    projects: project_box.projects
                });
            }
        }
        
        // Log the result to verify
    }
    
    

    async function handle_new_filter(item: string) {
        if (project_box && item.toLocaleLowerCase() == 'all') {            
            // If no filter is provided, reset to the original list
            setFiltered_project_box(project_box);
        
        } 
        else if (item && project_box) {            
            const new_projects = project_box.projects.filter((data: any) => {
                const status = data.status?.toLowerCase() 

                // Check if the filter item matches either the user_role or active_status
                return (
                    status === item.toLowerCase()
                );
            });
    
            setFiltered_project_box({ ...project_box, projects: new_projects });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_project_box(project_box);
        }
    }
    
    function add_project(){
        setShowModal(true)
        setSelectedProject(null)
        setModalFor('add')
    }

    function view_project(project:any){
        setShowModal(true)
        setSelectedProject(project)
        setModalFor('edit')
    }

    function delete_project(project:any){
        setShowModal(true)
        setSelectedProject(project)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px] ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Projects</p>
                        <p className="text-sm text-black">{(project_box && project_box?.total_number_of_projects) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[350px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by project id, contract amount ' id="" className='normal-input bg-gray-100 text-sm ' />
                            </span>
                            

                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    
                    {<span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[10%] px-2 ">Project Id</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Cover Color</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Cover Size</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">End Cap Style</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Trim Color</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Structure Type</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 ">Last Updated</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Document Upload</p>

                        <p className="text-sm font-normal w-[7.5%] px-2 ">Action</p>
                    </span>}
                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_project_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {project_box?.projects.length ?
                                <>
                                { filtered_project_box?.projects.map((data:any, ind:number)=>{
                                    const {project_ind, job, cover_color, cover_size, end_cap_style, trim_color, attached, structure_type, updated_at, engineering_drawing_upload  } = data
                                    return (
                                        <div key={ind}>
                                        
                                        <span className="recent-activity-table-list " >
                                            <p className="text-sm w-[10%] px-2 "> {project_ind} </p>
                                            <p className="text-sm w-[10%] px-2 "> {cover_color || '--'} </p>
                                            <p className="text-sm w-[10%] px-2 "> {cover_size || '--'} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {end_cap_style || '--'} </p>
                                            <p className="text-sm w-[10%] px-2 "> {trim_color || '--'} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {structure_type.toUpperCase()} </p>
                                            <p className="text-sm w-[12.5%] px-2 "> {readable_day(Number(updated_at))} </p>
                                            <p className={engineering_drawing_upload.length ? "text-sm w-[15%] px-2 text-lime-600 " : "text-sm w-[15%] px-2 text-amber-600"}> 
                                                {engineering_drawing_upload.length ? 'File Uploaded' : 'No File Uploaded'} 
                                            </p>
                                            
                                            <span className="w-[7.5%] px-2  ">
                                                <button className="rounded-[3px] px-[20px] py-1 text-white bg-lime-600 text-[14px] cursor-pointer hover:bg-lime-700 flex items-center justify-center gap-1 " onClick={()=>{view_project(data)}} >view</button>
                                            </span>
                                        </span>
                                        
                                        </div>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No projects yet </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Projects...</p>
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
                            <p className="text-sm">Showing 1-15 of {(project_box && project_box?.total_number_of_projects) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <Project_Management_Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedProject={selectedProject} setModalFor={setModalFor} setSelectedProject={setSelectedProject} /> }
        </div>
    )
}

export default CustomerProjectPage