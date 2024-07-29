'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import ViewLead from './salesViewLead';
import { userArray } from '@/constants';
import { get_api_auth_request } from '@/app/api/admin_api';
import { Leads_Props } from '@/types';

const SalesLeadPage = () => {
    const [addUsers, setAddUsers] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        userRole: false, disposition: false
    });
    const [dropElements, setDropElements] = useState({
        userRole: 'User Role', disposition: 'Disposition'

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
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function viewLead(data:any) {
        setSelectedUser(data)
        setAddUsers(true)
    }

    useEffect(() => {
       get_all_leads()
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_leads() {

        console.log('started fetching');
        
        const response = await get_api_auth_request(`auth/all-leads/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setLead_box(response.data)      
            
            setFiltered_lead_box(response.data)

            console.log(response.data);
            
            showAlert(response.data.msg, "success")

          }else{
            console.log(response);
            
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

        console.log('new page number ', new_page_number);

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
    


    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            {addUsers ? <ViewLead addUsers={addUsers} setAddUsers={setAddUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> 
            :
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Leads</p>
                        <p className="text-sm text-black">{(lead_box && lead_box?.total_number_of_leads) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="userName" placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 ' />
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['Sold', 'Not Sold']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        

                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300 ">
                            <p className="text-sm font-normal w-[13%] pr-2 pl-2 ">Last Name</p>
                            <p className="text-sm font-normal w-[13%] pr-2 pl-2 ">First Name</p>
                            <p className="text-sm font-normal w-[29%] pr-2 pl-2 ">Email</p>
                            <p className="text-sm font-normal w-[12.5%] pr-2 pl-2 ">Role</p>
                            <p className="text-sm font-normal w-[12.5%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-normal w-[10%] pr-2 pl-2 ">Action</p>
                            <p className="text-sm font-normal w-[10%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                            
                            {filtered_lead_box !== null ?
                            
                                <div className='h-full w-full flex flex-col justify-start '>

                                    {lead_box?.leads.length ?
                                     <>
                                    { filtered_lead_box?.leads.map((data:any, ind:number)=>{
                                        const {last_name, first_name, email, user_role, active_status} = data
                                        return (
                                            <span key={ind} className="recent-activity-table-list " >
                                                <p className="text-sm w-[13%] pr-2 pl-2 "> {last_name} </p>
                                                <p className="text-sm w-[13%] pr-2 pl-2 "> {first_name} </p>
                                                <p className="text-sm w-[29%] pr-2 pl-2 "> {email} </p>
                                                <p className="text-sm w-[12.50%] pr-2 pl-2 "> {user_role} </p>
                                            </span>
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
                                    <p className="text-md font-normal">Loading Data...</p>
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
                                <p className="text-sm">Showing 1-15 of {(lead_box && lead_box?.total_number_of_leads) || 0}</p>
                            </span>
                        </span>
                </div>

            </div>}
        </div>
    )
}

export default SalesLeadPage