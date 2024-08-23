'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import ServiceTicketModal from './serviceTicketModal';
import { timestamp_to_readable_value } from '../helper';

interface tickets_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_tickets_pages?: number; // Now optional and can be undefined
    total_number_of_tickets?: number; // Now optional and can be undefined
    tickets: any;
}  



const ServiceTicketPage = () => {
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [ticket_box, setTicket_box] = useState<tickets_Props | null>(null);
    const [filtered_ticket_box, setFiltered_ticket_box] = useState<tickets_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', status: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status'

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
        get_all_tickets()
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function get_all_tickets() {

        console.log('started fetching');
        
        const response = await get_auth_request(`auth/all-ticket/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setTicket_box(response.data)      
            
            setFiltered_ticket_box(response.data)

            console.log('master ', response.data);
            

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function filter_tickets(item:any) {

        console.log('started fetching');
        
        const response = await get_auth_request(`/filter-tickets/${item}/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setTicket_box(response.data)      
            
            setFiltered_ticket_box(response.data)

            console.log(response.data);
            
            showAlert(response.data.msg, "success")

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = ticket_box?.total_number_of_tickets_pages

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
        const max_page_number = ticket_box?.total_number_of_tickets_pages || 1;
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
    
        if (ticket_box && ticket_box.tickets) {
            if (value.trim() !== '') {
                const filtered_tickets = ticket_box.tickets.filter((data: any) => {
                    const ticket_ind = data.ticket_ind?.toLowerCase() || '';
                    const description = data.description?.toLowerCase() || '';
                    const status = data.status?.toLowerCase() || '';
                    
                    return (
                        ticket_ind.includes(value) ||
                        description.includes(value) ||
                        status.includes(value)  
                    );
                });
                
    
                setFiltered_ticket_box({...filtered_ticket_box, tickets:filter_tickets});
            } else {
                setFiltered_ticket_box(ticket_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (ticket_box && item.toLocaleLowerCase() == 'all') {
            
            // If no filter is provided, reset to the original list
            setFiltered_ticket_box(ticket_box);
        
        } 
        else if (item && ticket_box) {
            console.log(item);
            
            const new_tickets = ticket_box.tickets.filter((data: any) => {
                const status = data.status?.toLowerCase() || '';
    
                return (
                    status === item.toLowerCase()
                );
            });
    
            setFiltered_ticket_box({ ...ticket_box, tickets: new_tickets });
        } else {
            setFiltered_ticket_box(ticket_box);
        }
    }
    
    function add_ticket(){
        setShowModal(true)
        setSelectedItem(null)
        setModalFor('add')
    }

    function edit_ticket(ticket:any){
        setShowModal(true)
        setSelectedItem(ticket)
        setModalFor('edit')
    }

    function delete_ticket(ticket:any){
        setShowModal(true)
        setSelectedItem(ticket)
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
                        <p className="text-lg font-semibold text-black">All Tickets</p>
                        <p className="text-sm text-black">{(ticket_box && ticket_box?.total_number_of_tickets) || 0 }</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 text-sm ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Open', 'In Progress', 'Close', 'All' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                             <button type="button" className="h-full px-4 flex items-center text-white bg-blue-700 hover:bg-blue-700 rounded-[4px] text-sm" onClick={add_ticket}>Create Ticket</button>
                        </span>
                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[5px]">
                    
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[15%] px-2 ">Ticket Id</p>
                        <p className="text-sm font-normal w-[30%] px-2 ">Description</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Status</p>
                        <p className="text-sm font-normal w-[20%] px-2 ">Created At</p>
                        <p className="text-sm font-normal w-[20%] px-2 ">Last Updated At</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_ticket_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {ticket_box?.tickets.length ?
                                <>
                                { filtered_ticket_box?.tickets.map((data:any, ind:number)=>{
                                    const {service_ticket_ind, description, status, created_at, updated_at} = data
                                    return (
                                       
                                        <span key={ind} className="recent-activity-table-list " onClick={()=> edit_ticket(data)} >
                                            <p className="text-sm w-[15%] px-2 "> {service_ticket_ind} </p>
                                            <p className="text-sm w-[30%] px-2 "> {description} </p>
                                            <p className="text-sm w-[15%] px-2 "> {status} </p>
                                            <p className="text-sm w-[20%] px-2 "> {timestamp_to_readable_value(Number(created_at))} </p>
                                            <p className="text-sm w-[20%] px-2 "> {timestamp_to_readable_value(Number(updated_at))} </p>

                                        </span>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No tickets yet </p>
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
                            <p className="text-sm">Showing 1-15 of {(ticket_box && ticket_box?.total_number_of_tickets) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <ServiceTicketModal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem}  setSelectedItem={setSelectedItem} /> }
        </div>
    )
}

export default ServiceTicketPage