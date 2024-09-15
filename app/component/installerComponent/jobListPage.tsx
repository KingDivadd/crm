'use client'
import React, {useState, useEffect} from 'react'
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { get_auth_request } from '@/app/api/admin_api';
import JobListModal from './jobListModal';
import { readable_day } from '../helper';

interface installs_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_installs?: number; // Now optional and can be undefined
    installs: any;
}  

const JobListPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedInstall, setSelectedInstall] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [install_box, setinstall_box] = useState<installs_Props | null>(null);
    const [filtered_install_box, setFiltered_install_box] = useState<installs_Props | null>(null);
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
        get_all_installs(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_installs(pg_number:number) {
        
        const response = await get_auth_request(`app/all-paginated-installs/${pg_number}`)

        if (response.status == 200 || response.status == 201){
            
            setinstall_box(response.data)      
            
            setFiltered_install_box(response.data)

            console.log('all installs ', response.data)

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = install_box?.total_number_of_pages

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
        get_all_installs(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = install_box?.total_number_of_pages || 1;
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
    
        if (install_box && install_box.installs) {
            if (value.trim() !== '') {
                const filtered_installs = install_box.installs.filter((data: any) => {
                    const install_ind = data.install_ind?.toLowerCase() || '';
                    const project_ind = data.project?.project_ind.toLowerCase() || '';
                    
                    return (
                        install_ind.includes(value) ||
                        project_ind.includes(value) 
                    );
                });
                
    
                setFiltered_install_box({...filtered_install_box, installs:filtered_installs});
            } else {
                setFiltered_install_box(install_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (install_box && item.toLocaleLowerCase() == 'all') {
            console.log('Disposition : all ',install_box);
            
            // If no filter is provided, reset to the original list
            setFiltered_install_box(install_box);
        
        } 
        else if (item && install_box) {
            console.log(item);
            
            const new_installs = install_box.installs.filter((data: any) => {
                const disposition = data.disposition?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    disposition === item.toLowerCase()
                );
            });
    
            setFiltered_install_box({ ...install_box, installs: new_installs });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_install_box(install_box);
        }
    }

    function add_install(){
        setShowModal(true)
        setSelectedInstall(null)
        setModalFor('add')
    }
    
    function edit_install(item:any){
        setShowModal(true)
        setSelectedInstall(item)
        setModalFor('edit')
    }


    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md font-medium text-black">All Project Installs</p>
                        <p className="text-md text-black">{(install_box && install_box.installs.length) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='search by profile id and install id' id="" className='normal-input bg-gray-100 text-[15px] ' />
                            </span>

                            <button className="px-5 h-[40px] bg-blue-600 hover:bg-blue-700 rounded-[3px] text-white " onClick={add_install} >
                                Add Install
                            </button>

                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-[15px] font-normal w-[7.5%] px-2 ">Project Id</p>
                        <p className="text-[15px] font-normal w-[7.5%] px-2 ">Install Id</p>
                        <p className="text-[15px] font-normal w-[10%] px-2 ">Install Date</p>
                        <p className="text-[15px] font-normal w-[10%] px-2 ">Footing Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Set Post Date</p>
                        <p className="text-[15px] font-normal w-[10%] px-2 ">Demo Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Electrical Date</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 ">Last Updated</p>
                        <p className="text-[15px] font-normal px-2 w-[10%] ">Created On</p>
                        <p className="text-[15px] font-normal w-[7.5%] px-2 ">Action</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_install_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {install_box?.installs.length ?
                                <>
                                { filtered_install_box?.installs.map((data:any, ind:number)=>{

                                    const {install_ind, project, install_date, footing_date, set_post_date, demo_date, electrical_date, updated_at, created_at  } = data

                                    return (
                                        <div key={ind} className='recent-activity-table-list group' >
                                            <p className="text-[15px] w-[7.5%] px-2 ">{project.project_ind} </p>
                                            <p className="text-[15px] w-[7.5%] px-2 ">{install_ind} </p>
                                            
                                            <p className="text-[15px] w-[10%] px-2 "> 
                                                {(install_date && install_date !== 0) ? readable_day(Number(install_date)) : "n/a" } </p>
                                            <p className="text-[15px] w-[10%] px-2 "> 
                                                {(footing_date && footing_date !== 0 ) ? readable_day(Number(footing_date)) : "n/a"} 
                                            </p>
                                            <p className="text-[15px] w-[12.5%] px-2 ">
                                                {(set_post_date && set_post_date !== 0 ) ? readable_day(Number(set_post_date)) : "n/a" }
                                            </p>
                                            <p className="text-[15px] w-[10%] px-2 ">
                                                {(demo_date && demo_date!== 0 ) ? readable_day(Number(demo_date)) : "n/a" }
                                            </p>
                                            <p className="text-[15px] w-[12.5%] px-2 ">
                                                {(electrical_date && electrical_date !== 0 ) ? readable_day(Number(electrical_date)) : "n/a" }
                                            </p>
                                            <p className="text-[15px] w-[12.5%] px-2 ">
                                                {readable_day(Number(created_at))}
                                            </p>
                                            <p className="text-[15px]  px-2 w-[10%] ">
                                                {readable_day(Number(updated_at))}
                                            </p>

                                            <p className="text-[15px] w-[7.5%] flex flex-row items-center justify-start gap-2  hover:underline hover:text-amber-600 cursor-pointer" onClick={()=>{edit_install(data)}} ><MdEdit size={16} /> edit</p>
                                            
                                        </div>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> Install yet to be created </p>
                                </div>}

                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-normal">Loading Project Installs...</p>
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
                            <p className="text-sm">Showing 1-15 of {(install_box && install_box?.total_number_of_installs) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal 
            && 
            <JobListModal showModal={showModal} setShowModal={setShowModal} setModalFor={setModalFor} modalFor={modalFor} selectedInstall={selectedInstall} setSelectedInstall={setSelectedInstall} /> }
        </div>
    )
}

export default JobListPage