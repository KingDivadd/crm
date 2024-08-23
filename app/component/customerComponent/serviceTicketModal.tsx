'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, { ImageUploaderTwo } from '../imageUploader'
import { get_auth_request, post_auth_request } from '@/app/api/admin_api';
import { IoCheckmarkOutline } from 'react-icons/io5';


export interface ServiceTicketProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
}

interface User_Project_Props {
    msg?:string;
    projects?:any;
}

const ServiceTicketModal = ({showModal, setShowModal, selectedItem, setSelectedItem, setModalFor, modalFor  }:ServiceTicketProps) => {
    const [new_ticket, setNew_ticket] = useState({description: '', image_url: '', project_id: '' })
    const [project, setProject] = useState({issue: ''})
    const [updateBtn, setUpdateBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [user_project, setUser_project] = useState<User_Project_Props | null>(null)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        project:false,
    });
    const [dropElements, setDropElements] = useState({
        project:'Select Project',
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
    
    function handleChange(e:any){
        const name = e.target.name
        const value =  e.target.value
        setNew_ticket({...new_ticket, [name]:value})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
        if (modalFor !== 'add') {
         const {description, image_url, project_id} = selectedItem
         setNew_ticket({...new_ticket, description, image_url, project_id})
         console.log('selected item ', selectedItem);
         
        }
        get_user_projects()
    }, [])
    

    async function get_user_projects() {

        
        const response = await get_auth_request(`auth/user-projects`)
        
        if (response.status == 200 || response.status == 201){
            
            setUser_project(response.data)

            console.log('fetched data', response.data);

        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function create_ticket(){
        if (!new_ticket.description || !new_ticket.project_id){
            showAlert("Please fill all fields", "error")
            console.log(new_ticket);
            
        }else{
            setLoading(true); 

            try {
    
                const response = await post_auth_request(`auth/create-ticket`, new_ticket)
                
                if (response.status == 200 || response.status == 201){
                    
                    setUser_project(response.data)
                    
                    console.log('fetched data', response.data);
                    
                    showAlert('Ticket Created Successfully', "success")
                    setLoading(false); // Set loading to false when the request completes
                }else{
                    
                    console.log(response);
                    
                    showAlert(response.response.data.err, "error")
                    setLoading(false); // Set loading to false when the request completes
                }
            } catch (err) {
                showAlert("Error occured while creating ticekt", "error")
                setLoading(false)    
            }
            
    
        }
    }
    async function update_ticket(){
        if (!new_ticket.description || !new_ticket.project_id){
            showAlert("Please fill all fields", "error")
            console.log(new_ticket);
            
        }else{
            setLoading(true); 

            try {
    
                const response = await post_auth_request(`auth/create-ticket`, new_ticket)
                
                if (response.status == 200 || response.status == 201){
                    
                    setUser_project(response.data)
                    
                    console.log('fetched data', response.data);
                    
                    showAlert('Ticket Created Successfully', "success")
                    setLoading(false); // Set loading to false when the request completes
                }else{
                    
                    console.log(response);
                    
                    showAlert(response.response.data.err, "error")
                    setLoading(false); // Set loading to false when the request completes
                }
            } catch (err) {
                showAlert("Error occured while creating ticekt", "error")
                setLoading(false)    
            }
            
    
        }
    }



    function handleCloseModal() {
        setShowModal(false)
        setSelectedItem(null)
    }
    
    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen pt-[60px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[65%] mx-auto shadow-xl flex items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            {modalFor == "add" && <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] pt-[5px] gap-[20px] ">
                                <span className="h-[50px] w-full flex items-center border-b border-gray-300">
                                    <p className="text-lg font-semibold">New Service Ticket</p>
                                </span>
                                
                                <div className="w-full flex items-start justify-between gap-[10px] ">
                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[15px] ">
                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                            <h4 className="text-md font-light">Issue Description</h4>
                                            <input type="text" name='description' className='normal-input' value={new_ticket.description} onChange={handleChange} />
                                        </span>

                                        <div className="w-full flex flex-col items-start gap-[10px]">
                                            <input type="text" name='filter' className='normal-input' placeholder='Search for project by project id' value={project.issue} onChange={handleChange} />
                                            <div className="w-full h-[275px] bg-gray-100 rounded-[3px] overflow-y-auto p-[5px]">
                                                <div className="">
                                                    {user_project?.projects.map((data:any, ind:number)=>{
                                                        const {project_ind, project_id } = data
                                                        return(
                                                            <span key={ind} className="w-full h-[40px] text-sm font-medium flex items-center justify-between px-[10px] rounded-[2.5px] hover:bg-slate-200 cursor-pointer" onClick={()=>{setNew_ticket({...new_ticket, project_id: project_id})} }>{ind + 1}. {project_ind} {new_ticket.project_id === project_id && <IoCheckmarkOutline size={19} />} </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div className="w-1/2 flex flex-col items-start justify-between gap-[15px] h-full">
                                    
                                        <span className="w-full flex flex-col items-start justify-start gap-2">
                                            <ImageUploaderTwo id={'user-image'} title={"User Image"} url={'https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg'} image={''} />
                                        </span>

                                        <span className="w-full flex items-center justify-end">
                                            <button className=" w-[150px] h-[40px] text-white bg-blue-700 rounded-[5px] hover:bg-blue-600 flex items-center justify-center" onClick={create_ticket} disabled={loading}>
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                ) : 'Create Ticket'}
                                                
                                            </button>
                                        </span>
                                    </div>

                                </div>


                            </div>}

                            {modalFor == "edit"
                            
                            && 
                            
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] pt-[5px] gap-[20px] ">
                                <span className="h-[50px] w-full flex items-center border-b border-gray-300">
                                    <p className="text-lg font-semibold">Edit Ticket: <strong>{selectedItem.service_ticket_ind}</strong></p>
                                </span>
                                
                                <div className="w-full flex items-start justify-between gap-[10px] ">
                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[15px] ">
                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                            <h4 className="text-md font-light">Issue Description</h4>
                                            <input type="text" name='description' className='normal-input' value={new_ticket.description} onChange={handleChange} />
                                        </span>

                                        <div className="w-full flex flex-col items-start gap-[10px]">
                                            <input type="text" name='filter' className='normal-input' placeholder='Search for project by project id' value={project.issue} onChange={handleChange} />
                                            <div className="w-full h-[275px] bg-gray-100 rounded-[3px] overflow-y-auto p-[5px]">
                                                <div className="">
                                                    {user_project?.projects.map((data:any, ind:number)=>{
                                                        const {project_ind, project_id } = data
                                                        return(
                                                            <span key={ind} className="w-full h-[40px] text-sm font-medium flex items-center justify-between px-[10px] rounded-[2.5px] hover:bg-slate-200 cursor-pointer" onClick={()=>{setNew_ticket({...new_ticket, project_id: project_id})} }>{ind + 1}. {project_ind} {new_ticket.project_id === project_id && <IoCheckmarkOutline size={19} />} </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div className="w-1/2 flex flex-col items-start justify-between gap-[15px] h-full">
                                    
                                        <span className="w-full flex flex-col items-start justify-start gap-2">
                                            <ImageUploaderTwo id={'user-image'} title={"User Image"} url={'https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg'} image={''} />
                                        </span>

                                        <span className="w-full flex items-center justify-end">
                                            <button className=" w-[150px] h-[40px] text-white bg-amber-700 rounded-[5px] hover:bg-amber-600 flex items-center justify-center" onClick={update_ticket} disabled={loading}>
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                ) : 'Update Ticket'}
                                                
                                            </button>
                                        </span>
                                    </div>

                                </div>


                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ServiceTicketModal

