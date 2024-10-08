'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { get_auth_request } from '@/app/api/admin_api';
import { User_Management_Props } from '@/types';
import DeleteModal from './userManagementModal';
import UserManagementModal from './userManagementModal';
import { useRouter } from 'next/navigation';
import { readable_day } from '../helper';


const UserManagement = () => {
    const router = useRouter()

    const [modalFor, setModalFor] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [app_users, setApp_users] = useState<User_Management_Props | null>(null);
    const [filtered_users, setFiltered_users] = useState<User_Management_Props | null>(null); 

    const [filters, setFilters] = useState({filter_input: '', active_status: '', user_role: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        user_role: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        user_role: 'User Role', status: 'Status'

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

    async function handleFilter(e: any) {
        const value = e.target.value.toLowerCase();
        setFilters({ ...filters, filter_input: value });
    
        if (app_users && app_users.users) {
            if (value.trim() !== '') {
                const new_app_users = app_users.users.filter((data: any) => {
                    const user_ind = data.user_ind?.toLowerCase() || '';    
                    const firstName = data.first_name?.toLowerCase() || '';
                    const lastName = data.last_name?.toLowerCase() || '';
                    const otherNames = data.other_names?.toLowerCase() || '';
                    const email = data.email?.toLowerCase() || '';
                    const user_role = data.user_role?.toLowerCase() || '';
            
                    return (
                        user_ind.includes(value) ||
                        firstName.includes(value) ||
                        lastName.includes(value) ||
                        otherNames.includes(value) ||
                        user_role.includes(value) ||
                        email.includes(value)
                    );
                });
        
                setFiltered_users({ ...app_users, users: new_app_users });
            } else {
                setFiltered_users(app_users); // Reset to the original list
            }
            }
    }

    async function handle_new_filter(item: string) {
        if (app_users && item.toLocaleLowerCase() == 'all') {
            
            // If no filter is provided, reset to the original list
            setFiltered_users(app_users);
        
        } 
        else if (item && app_users) {
            
            const new_app_users = app_users.users.filter((data: any) => {
                const user_role = data.user_role?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    user_role === item.toLowerCase() ||
                    active_status === item.toLowerCase()
                );
            });
    
            setFiltered_users({ ...app_users, users: new_app_users });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_users(app_users);
        }
    }

    useEffect(() => {
        
        get_all_users(page_number)

    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_users(page_num:number) {        
        
        try {
            const response = await get_auth_request(`app/all-paginated-users/${page_num || 1}`)
            
            if (response.status == 200 || response.status == 201){
                
                setApp_users(response.data)      
                
                setFiltered_users(response.data)
                    
                showAlert(response.data.msg, "success")
            }else{
                if (response.response.status == 402) {
                    setTimeout(() => {
                        router.push('auth/login')
                    }, 3000)
                }
                showAlert(response.response.data.err, "error")
            }
        } catch (err:any) {
            showAlert("Something went wrong, kindly refresh page", "error")
        }
        
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = app_users?.total_number_of_pages

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

        get_all_users(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = app_users?.total_number_of_pages || 1;
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

    function add_user() {
        setSelectedUser(null)
        setShowModal(true)
        setModalFor('add')
    }
    

    function edit_user(data:any) {
        setSelectedUser(data)
        setShowModal(true)
        setModalFor('edit')
    }

    function delete_user(data:any) {
        setSelectedUser(data)
        setShowModal(true)
        setModalFor('delete')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[10px] ">
                {/* <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span> */}
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md font-semibold text-black">All Users</p>
                        <p className="text-sm text-black">{filtered_users && filtered_users.users.length}</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Active', 'Inactive', 'All']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='search by user id, name, email, role' id="" className='normal-input bg-gray-100 text-sm ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Admin', 'Sales', 'Installer', 'Engineering', 'Permit', 'Electrical', 'Designer', 'Accounting', 'Customer', 'All']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <button className="h-[40px] px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-[3px] flex items-center justify-center  text-sm" onClick={add_user}>Add New User</button>

                    </span>
                </span>

                {/* user table */}

                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[3px]">
                    <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[7.5%] px-[10px] text-white ">User Id</p>
                        <p className="text-sm font-normal w-[11%] px-[10px] text-white ">Last Name</p>
                        <p className="text-sm font-normal w-[11%] px-[10px] text-white ">First Name</p>
                        <p className="text-sm font-normal w-[25.5%] px-[10px] text-white ">Email</p>
                        <p className="text-sm font-normal w-[10%] px-[10px] text-white ">Role</p>
                        <p className="text-sm font-normal w-[13%] px-[10px] text-white ">Added By</p>
                        <p className="text-sm font-normal w-[10%] px-[10px] text-white ">Added On</p>
                        <p className="text-sm font-normal w-[13.5%] px-[10px] text-white ">Action</p>
                    </span>
                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_users !== null ?
                        
                            <div className='h-auto w-full flex flex-col justify-start '>
                            { filtered_users?.users.map((data:any, ind:number)=>{
                                const {last_name, first_name, email, user_role, active_status, user_ind, created_at, added_by} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[7.5%] px-[10px] "> {user_ind} </p>
                                        <p className="text-sm w-[11%] px-[10px] "> {last_name} </p>
                                        <p className="text-sm w-[11%] px-[10px] "> {first_name} </p>
                                        <p className="text-sm w-[25.5%] px-[10px] "> {email} </p>
                                        <p className="text-sm w-[10%] px-[10px] "> {user_role.replace(/_/g, ' ')} </p>

                                        <p className="text-sm w-[13%] px-[10px] flex items-center gap-[10px] "> { added_by ? added_by.first_name : "-"} {added_by ? added_by.last_name : "-"} </p>

                                        <p className="text-sm w-[10%] px-[10px] "> {readable_day(Number(created_at))} </p>

                                        <span className="w-[13.5%] flex items-center justify-between px-[10px] gap-[15px] ">

                                            <button className="rounded-[3px]  px-[15px] py-1 text-white bg-amber-500 text-[14px] cursor-pointer hover:bg-amber-600 flex items-center gap-1 " onClick={()=>{edit_user(data)}} >edit</button>

                                            <button className="rounded-[3px]  px-[15px] py-1 text-white bg-red-500 text-[14px] cursor-pointer hover:bg-red-600 flex items-center gap-1 " onClick={()=>{delete_user(data)}} > delete</button>
                                            
                                        </span>
                                    </span>
                                )
                            })}
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
                            <p className="text-sm">Showing 1-15 of {filtered_users && filtered_users.users.length || 0}</p>
                        </span>
                    </span>
                </div>
            </div>

            {showModal && <UserManagementModal modalFor={modalFor} setModalFor={setModalFor} showModal={showModal} setShowModal={setShowModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />}
        </div>
    )
}

export default UserManagement