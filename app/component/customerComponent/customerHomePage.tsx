'use client'
import React, {useState, useEffect} from 'react'
import ViewProjectInfo from './viewProjectInfo'
import { get_auth_request } from '@/app/api/admin_api';
import { timestamp_to_readable_value } from '../helper';

interface Dashboard_Props {
    total_project?:number;
    completed_project?:number;
    project_in_progress?:number;
    pending_project?:number;
    running_project?:any;
    notifications?:any;

}

const CustomerHomePage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [dash_components, setDash_components] = useState<Dashboard_Props | null>(null)
    const [alert, setAlert] = useState({message: '', type: ''})

    useEffect(()=>{
        get_dashboard_data()
    },[])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_dashboard_data() {

        try {
            const response = await get_auth_request(`sales/customer-dashboard`)
            
    
            if (response.status == 200 || response.status == 201){
                
                setDash_components(response.data)      
    
                console.log( 'customer data ',response.data);
                
            }else{
                console.log(response);
                
                showAlert(response.response.data.err, "error")
            }
            
        } catch (err:any) {
            
            showAlert('Something went wrong while fetching data', "error")
        }
        
    }

    function viewProjectDetiail(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }


    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[25px] ">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px] relative ">
                    <span className="absolute h-[145px] bg-blue-700 -top-[10px] -left-[10px] rounded-b-[3px] " style={{width: 'calc(100% + 20px)'}}></span>
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] w-1/4 group bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md">Total Project</p>
                            <p className="text-sm ">{dash_components?.total_project?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Completed Project</p>
                            <p className="text-sm ">{dash_components?.completed_project?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px]  w-1/4  bg-white shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Project In Progress</p>
                            <p className="text-sm ">{dash_components?.project_in_progress?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[3px] bg-white w-1/4  shadow-md z-[5]">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  px-[20px]  ">
                            <p className="text-md ">Pending Project</p>
                            <p className="text-sm ">{dash_components?.pending_project?.toLocaleString() || 0}</p>
                            <p className="text-sm font-light ">Last 30 days</p>
                        </div>
                    </span>
                    
                                    
                </div>

                {/* current projects */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md font-medium ">Current Projects</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[15%] px-2 ">Project Id</p>
                            <p className="text-sm font-normal w-[10%] px-2 ">Job Id</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Contract Amt</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Attached</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Structure Type</p>
                            <p className="text-sm font-normal w-[15%] px-2 "></p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Status</p>
                        </span>
                        
                        {dash_components != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start">
                            {dash_components?.running_project.length ? <>
                            {dash_components?.running_project.map((data:any, ind:any)=>{

                                const {project_ind, job, contract_amount, attached, structure_type, status} = data   
                                
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[15%] px-2 ">{project_ind}</p>
                                        <p className="text-sm w-[10%] px-2 ">{job.job_ind}</p>
                                        <p className="text-sm w-[15%] px-2 ">$ {Number(contract_amount).toLocaleString()}</p>
                                        <p className="text-sm w-[15%] px-2 ">{attached ? "True": "False"}</p>
                                        <p className="text-sm w-[15%] px-2 ">{structure_type.replace(/_/g,' ')}</p>
                                        <p className="text-sm w-[15%] px-2 ">{}</p>
                                        <p className="text-sm w-[15%] px-2 ">{status}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Lead yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.running_project.length}</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-md ">Recent Notification</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md">
                        <span className="w-full h-[45px] flex flex-row items-center justify-start rounded-t-[5px] bg-blue-700 text-white">
                            <p className="text-sm font-normal w-[15%] px-2 "> Id</p>
                            <p className="text-sm font-normal w-[22.5%] px-2 ">Subject</p>
                            <p className="text-sm font-normal w-[35%] px-2 ">Message</p>
                            <p className="text-sm font-normal w-[12.5%] px-2 ">Status</p>
                            <p className="text-sm font-normal w-[15%] px-2 ">Date/Time</p>
                        </span>
                        
                        {dash_components != null ? 
                        <div className="w-full h-[300px] flex flex-col justify-start items-start overflow-y-auto ">
                            {dash_components?.notifications.length ? <>
                            {dash_components?.notifications.map((data:any, ind:any)=>{

                                const {notification_ind, subject, message, status, updated_at} = data   
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[15%] px-2 ">{notification_ind}</p>
                                        <p className="text-sm w-[22.5%] px-2 ">{subject}</p>
                                        <p className="text-sm w-[35%] px-2 ">{message}</p>
                                        <p className={status == 'read' ? "text-sm w-[12.5%] px-2 text-lime-700 ": "text-sm w-[12.5%] px-2 text-red-600 "}>{status? "read" : "unread"}</p>
                                        <p className="text-sm w-[15%] px-2 ">{timestamp_to_readable_value(Number(updated_at))}</p>
                                    </span>
                                )
                            })}
                            </>
                            :
                            <div className="w-full h-[300px] flex flex-col justify-center items-center">
                                <p className="text-sm ">No Lead yet</p>
                            </div>
                            }

                        </div>
                        :
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        }
                        

                        <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-slate-300 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer ">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light bg-blue-700 text-white h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ">1</p>

                                </span>
                                <p className="text-sm cursor-pointer ">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm  ">Showing 1-15 of {dash_components?.notifications.length}</p>
                            </span>
                        </span>
                    </div>
                </div>


            </div>

            {showModal && <ViewProjectInfo showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default CustomerHomePage

