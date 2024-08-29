'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { userArray } from '@/constants';
import { get_auth_request } from '@/app/api/admin_api';
import Pipeline_Modal from './pipelineModal';
import { useRouter } from 'next/navigation';
import { timestamp_to_readable_value } from '../helper';

interface Pipeline_Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pipeline_pages?: number; // Now optional and can be undefined
    total_number_of_pipeline?: number; // Now optional and can be undefined
    pipeline: any;
    total_lead?:number; total_lead_sold?:number; total_contract_amount?:number; total_lead_in_progress?:number;
}



const SalesPipelinePage = () => {
    const router = useRouter()
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedPipeline, setSelectedPipeline] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [pipeline_box, setpipeline_box] = useState<Pipeline_Props | null>(null);
    const [filtered_pipeline_box, setFiltered_pipeline_box] = useState<Pipeline_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', status: '', stage: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false, stage: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status', stage: 'Stage'

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
        get_pipeline_dashboard(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_pipeline_dashboard(page_num:number) {

        
        const response = await get_auth_request(`auth/pipeline-dashbpard/${page_num}`)

        if (response.status == 200 || response.status == 201){
            
            setpipeline_box(response.data)      
            
            setFiltered_pipeline_box(response.data)
            
        }else{            
            if (response.response){
                if (response.response.status == 402) {
                    setTimeout(() => {
                        router.push('/auth/login')
                    }, 3000);
                }
                showAlert(response.response.data.err, "error")
            }
        }
    }

    async function filter_pipeline(item:any) {
        
        const response = await get_auth_request(`/filter-pipeline/${item}/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setpipeline_box(response.data)      
            
            setFiltered_pipeline_box(response.data)
            
            showAlert(response.data.msg, "success")

        }else{        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = pipeline_box?.total_number_of_pipeline_pages

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

        get_pipeline_dashboard(new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = pipeline_box?.total_number_of_pipeline_pages || 1;
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
    
        if (pipeline_box && pipeline_box.pipeline) {
            if (value.trim() !== '') {
                const new_pipeline = pipeline_box.pipeline.filter((data: any) => {
                    const pipeline_id = data.pipeline_ind.toLowerCase() || '';
                    const assigned_to = data.lead.assigned_to.first_name.toLowerCase() || data.lead.assigned_to.first_name.toLowerCase() || '';
                    const contract_amount = data.contract_amount || '';
                    const lead_name = data.lead?.customer_first_name?.toLowerCase() || data.lead?.customer_first_name?.toLowerCase() || '';

                    
                    return (
                        String(contract_amount).includes(value) || 
                        lead_name.includes(value)  ||
                        assigned_to.includes(value) || pipeline_id.includes(value)
                    );
                });
                
                    
                setFiltered_pipeline_box({...filtered_pipeline_box, pipeline: new_pipeline});
            } else {
                setFiltered_pipeline_box(pipeline_box); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (pipeline_box && item.toLocaleLowerCase() == 'all') {            
            // If no filter is provided, reset to the original list
            setFiltered_pipeline_box(pipeline_box);
        
        } 
        else if (item && pipeline_box) {            
            const new_pipeline = pipeline_box.pipeline.filter((data: any) => {
                const status = data.status?.toLowerCase() || '';
                const disposition = data.disposition?.toLowerCase() || '';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    status === item.toLowerCase() ||
                    disposition === item.toLocaleLowerCase()
                );
            });
    
            setFiltered_pipeline_box({ ...pipeline_box, pipeline: new_pipeline });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_pipeline_box(pipeline_box);
        }
    }
    

    function view_pipeline(pipeline:any){
        setShowModal(true)
        setSelectedPipeline(pipeline)
        setModalFor('view')
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] overflow-y-auto">
            <div className="relative w-full flex flex-col items-start justify-start gap-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>



                <span className="w-full h-[40px] flex flex-row items-center justify-between ">
                    <span className="h-full flex flex-row items-center justify-start gap-2">
                        <p className="text-md font-semibold text-black">All Pipelines</p>
                        <p className="text-sm text-black">{(pipeline_box && pipeline_box?.total_number_of_pipeline) || 0 }</p>
                    </span>

                    <span className=" flex flex-row items-center justif-start gap-[10px] h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="filter-input" onChange={handleFilter} placeholder='Search by lead name or contract amount or assigned to' id="" className='normal-input bg-gray-100 text-sm ' />
                        </span>

                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Initial Contact', 'Negotiation', 'Sold', 'Lost', 'All' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>

                        <span className="h-[40px] min-w-[175px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'stage'} dropArray={['Sold', 'Not Sold', 'All' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>


                    </span>
                </span>

                
                <div className="w-full min-h-[150px] flex flex-col bg-white shadow-lg rounded-[3px]">
                    <span className="w-full h-[40px] flex flex-row items-center justify-start rounded-t-[3px] bg-blue-700 text-white">
                        <p className="text-sm font-normal w-[9.5%] px-2 ">Pipeline Id..</p>
                        <p className="text-sm font-normal w-[7.5%] px-2 ">Lead Id</p>
                        <p className="text-sm font-normal w-[13%] px-2 ">Customer Name</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Appointment Date</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Assigned To</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Status</p>
                        <p className="text-sm font-normal w-[15%] px-2 ">Contract Amount</p>
                        <p className="text-sm font-normal w-[10%] px-2 ">Stage</p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_pipeline_box !== null ?
                        
                            <div className='h-full w-full flex flex-col justify-start '>

                                {pipeline_box?.pipeline.length ?
                                <>
                                { filtered_pipeline_box?.pipeline.map((data:any, ind:number)=>{
                                    const {lead, stage, disposition, status, contract_amount,pipeline_ind } = data
                                    
                                    return (
                                        <span key={ind} className="recent-activity-table-list " onClick={()=> view_pipeline(data)} >
                                            <p className="text-sm w-[9.5%] px-2 ">{pipeline_ind} </p>
                                            {lead ? <p className="text-sm w-[7.5%] px-2 ">{lead.lead_ind} </p> :<p className="text-sm w-[7.5%] px-2">nil</p>  }
                                            {lead ? <p className="text-sm w-[13%] px-2 "> {lead.customer_first_name} {lead.customer_last_name} </p> :<p className="text-sm w-[15%] px-2">nil</p>  }
                                            {lead ? <p className="text-sm w-[15%] px-2 "> {timestamp_to_readable_value(Number(lead.appointment_date))} </p>: <p className="text-sm w-[15%] px-2">nil</p>  }
                                            {lead ? <p className="text-sm w-[15%] px-2 "> {lead.assigned_to.first_name} {lead.assigned_to.last_name} </p>: <p className="text-sm w-[15%] px-2">nil</p>  }
                                            <p className="text-sm w-[15%] px-2 "> {status.replace(/_/g, ' ')} </p>
                                            {contract_amount != null ? <p className="text-sm w-[15%] px-2 ">$ {Number(contract_amount).toLocaleString()} </p> : <p className="text-sm w-[15%] px-2 "> 0 </p>  }
                                            <p className={disposition == 'SOLD' ? "text-sm w-[10%] px-2 text-blue-700": "text-sm w-[10%] px-2 text-red-600"} >{disposition.replace(/_/g, ' ')}</p>
                                        
                                        </span>
                                    )
                                })}
                                </>
                                :
                                <div className="w-full h-[100%] flex items-center justify-center">
                                    <p className="text-normal"> No sales pipeline data yet </p>
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
                            <p className="text-sm">Showing 1-15 of {(pipeline_box && pipeline_box?.total_number_of_pipeline) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>
            {showModal && <Pipeline_Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} selectedPipeline={selectedPipeline} setModalFor={setModalFor} setSelectedPipeline={setSelectedPipeline} /> }
        </div>
    )
}

export default SalesPipelinePage