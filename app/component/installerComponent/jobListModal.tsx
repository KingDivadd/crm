'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FileUploader, FlexibleImageUploader } from '../imageUploader'
import MyDatePicker, { InstallDatePicker } from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix, readable_day} from "../helper"
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';
import { IoCheckmark } from 'react-icons/io5';


interface Lead_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedInstall: any;
    setSelectedInstall: (selectedInstall: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const JobListModal = ({ showModal, setShowModal, selectedInstall, setSelectedInstall, modalFor, setModalFor}: Lead_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)

    const [install, setInstall] = useState({
        footing_date: 0, footing_crew: '', footing_bill_sheet: '', 
        demo_date: 0, demo_crew: '', demo_bill_sheet: '', 
        set_post_date: 0, set_post_crew: '', set_post_bill_sheet: '', 
        install_date: 0, install_crew: '', install_bill_sheet: '', 
        electrical_date: 0, electrical_crew: '', electrical_bill_sheet: '', 
        project_sign_off: 'pending'
    })
    const [next_stage, setNext_stage] = useState('one')
    
    const [showCalenders, setShowCalenders] = useState({footing_date: false, set_post_date: false, demo_date: false, install_date: false, electrical_date: false, inspection_date: false,  })

    const [filtered_project, setFiltered_project] = useState<{projects?:any} | null>(null)
    const [all_project, setAll_project] = useState<{projects?:any; } | null>(null)

    const [selected_project, setSelected_project] = useState<{project_id?:string; job_id?:string; job_number?:string; customer_name?:string} | null>(null)

    
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        inspection_status: false, project_sign_off: false
    });
    const [dropElements, setDropElements] = useState({
        inspection_status: 'Inspection Status', project_sign_off: " Project Sign Off"
    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Select'});

    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setInstall({...install, [title]: dropdown.toLowerCase().replace(/ /g, '_') })
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setInstall({...install, [name]: value})
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    

    useEffect(() => {

        if (modalFor == 'edit'){

            const {
                install, 
            } = selectedInstall

            const {footing_date, footing_crew, footing_bill_sheet, demo_date, demo_crew, demo_bill_sheet, 
                set_post_date, set_post_crew, set_post_bill_sheet, install_date, install_crew, install_bill_sheet, 
                electrical_date, electrical_crew, electrical_bill_sheet, inspection_date, inspection_status, project_sign_off
                } = selectedInstall
    
            setTimeout(() => {
                setInstall({ 
                    footing_date, footing_crew, footing_bill_sheet, demo_date, demo_crew, demo_bill_sheet, 
                    set_post_date, set_post_crew, set_post_bill_sheet, install_date, install_crew, install_bill_sheet, 
                    electrical_date, electrical_crew, electrical_bill_sheet, project_sign_off
                })
                
            }, 100);

        }

        
    }, [])

    useEffect(() => {
        get_all_projects()
        if( modalFor == 'edit'){
            const {project_id, job} = selectedInstall.project
            const {job_id, job_ind, lead, job_number} = job
            const {customer_first_name, customer_last_name} = lead

            setSelected_project({...selected_project, job_number,
                project_id, job_id: job_ind, customer_name: `${customer_first_name} ${customer_last_name}`
            })
            }
    }, [])

    async function get_all_projects() {
        try {
            const response = await get_auth_request(`app/all-projects`)

            if (response.status == 200 || response.status == 201){
                
                setAll_project(response.data)

                setFiltered_project(response.data)
                
                setLoading(false)

                }else{       
                                
                showAlert(response.response.data.err, "error")
                
                setLoading(false)
            }
        } catch (err:any) {
            showAlert('Error fetching all projects', 'error')
        }
    }

    function filter_user(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value
            
        const filtered_items = all_project?.projects.filter((data: { project_ind: string, last_name: string }) =>
            data.project_ind.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );

        setFiltered_project({...filtered_project, projects: filtered_items})
        
        // setFiltered_staff(value === '' ? all_staff?.staffs : filtered_items);
    }

    async function add_install(e:any) {
        e.preventDefault()
        if (!selected_project?.project_id) {
            showAlert('Please select a project ', 'error')
            
        }
        else{
            try {
                setLoading(true)


                const response = await post_auth_request(`app/add-project-install/${selected_project?.project_id}`, install)

                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")

                    
                    setShowModal(false)
                    
                    setLoading(false)

                    }else{       
                                    
                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                
                showAlert('Unable to create job, refresh page', 'error')
                setLoading(false)
            }
        }
    }

    async function edit_install(e:any) {
        e.preventDefault()
        if (false) {
            // nothing to check for
        }
        else{
            try {
                setLoading(true)


                const response = await post_auth_request(`app/edit-project-install/${selectedInstall.install_id}`, install)

                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")

                    
                    setShowModal(false)
                    
                    setLoading(false)

                    }else{       
                                    
                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                showAlert('Unable to create job, refresh page', 'error')
                setLoading(false)
            }
        }
    }



    type InstallDates = {
        footing_date: string;
        set_post_date: string;
        demo_date: string;
        install_date: string;
        electrical_date: string;
        inspection_date: string;
    }

    const handleDateChange = (field: keyof InstallDates, newDate: string) => {

        setShowCalenders({...showCalenders, [field]: false })

        setInstall({...install, [field]: Number(convert_to_unix(newDate) * 1000 )})
    };

    const handleFileUpload = (fileUrl:string, type: string) => {
        setInstall({...install, [type]: fileUrl})
    };

    const selected_proj = (data:any)=>{
        const {project_id, job} = data
        const {job_id, job_ind, lead, job_number} = job
        const {customer_first_name, customer_last_name} = lead

        setSelected_project({...selected_project, job_number,
            project_id, job_id: job_ind, customer_name: `${customer_first_name} ${customer_last_name}`
        })
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={"w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all"} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">


                                {modalFor == 'add' &&
                                <div className="w-[80vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] py-[10px] ">
                                    <div className="w-full flex items-center justify-between border-b border-slate-200 pb-[10px] ">
                                        <div className="w-auto flex  items-center justify-start gap-[25px] ">
                                            <p className="text-[15px]  font-medium ">New Project Install</p>
                                        </div>

                                        
                                        {/* <div className="span flex items-center justify-end gap-[20px] ">
                                            
                                            <span className="w-full flex items-center justify-end gap-[15px] z-[20]">
                                                <p className="text-[15px]">Project Sign Off</p>
                                                <span className="h-[40px] min-w-[150px] z-[15]">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'project_sign_off'} dropArray={['Pending', "In Progress", "Completed", "Closed" ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                        </div> */}
                                        
                                    </div>

                                    {next_stage === 'one' && 
                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-auto flex flex-col  items-start justify-start gap-[15px] ">

                                                {selected_project?.job_id && <span className="w-auto flex items-start gap-[10px] ">
                                                    <p className="text-[15px] ">Job Id</p>
                                                    <p className="text-[15px]  font-medium ">{selected_project?.job_id}</p>
                                                </span>}
                                                {selected_project?.job_number && <span className="w-auto flex items-start gap-[10px]">
                                                    <p className="text-[15px] ">Job Number</p>
                                                    <p className="text-[15px] font-medium ">{selected_project?.job_number}</p>
                                                </span>}
                                                {selected_project?.customer_name && <span className="w-auto flex items-start gap-[10px]">
                                                    <p className="text-[15px] ">Customer Name</p>
                                                    <p className="text-[15px] font-medium ">{selected_project?.customer_name}</p>
                                                </span>}
                                            </div>
                                            
                                            {/* ---------------- */}
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 font-medium">Select Project</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="email" name='assigned_to' placeholder='Enter lead name or project Id to filter' onChange={filter_user} className='normal-input text-[15px]' />
                                                </span>
                                                
                                                {filtered_project?.projects !== null ?
                                                
                                                <div className="w-full h-[350px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-100 rounded-[3px] ">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        {filtered_project?.projects.length ? 
                                                        <>
                                                        {filtered_project?.projects.map((data:any, ind:number)=>{
                                                            const {project_ind, project_id, user_id, user_role, job } = data
                                                            const {lead} = job
                                                            const {customer_first_name, customer_last_name} = lead
                                                            return(
                                                                <span key={ind} className="w-full h-[35px] flex items-center justify-between hover:bg-slate-300 px-[10px] gap-[10px] rounded-[3px] " onClick={()=>selected_proj(data)}>

                                                                    <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer font-medium" >

                                                                        <p className="text-start text-[15px] text-slate-900 " >{ind + 1}. </p>

                                                                        <p className=" text-start text-[15px] text-slate-900 " > {customer_first_name} {customer_last_name} </p>

                                                                        <p className="text-start text-[15px] text-slate-900 " >{project_ind} </p>

                                                                    </span>
                                                                        
                                                                    <p key={ind} className=" text-start text-[15px] text-slate-900 text-end " > {user_role} </p>
                                                                    
                                                                    <span className="w-[40px] h-full flex justify-end items-center"> {selected_project?.project_id == project_id && <IoCheckmark size={18} />} </span>


                                                                </span>
                                                            )
                                                        })}
                                                        </>
                                                        :
                                                        <div className="w-full h-[350px] flex flex-col justify-center items-center">
                                                            <p className="text-[15px] ">No Project Entered yet</p>
                                                        </div>
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <div className="w-full h-[310px] flex items-center justify-center text-[15px]">
                                                    Loading Sales Personnels...
                                                </div>
                                                }

                                                {/* <button className=" w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px] "  disabled={loading}  >
                                                    {loading ? (
                                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                    ) : 'Create Lead'}

                                                </button> */}
                                            </span>

                                            {/* ---------------- */}

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Footing Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Footing Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, footing_date: !showCalenders.footing_date }) }}>

                                                            { install.footing_date != 0  ? readable_day(Number(install.footing_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.footing_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.footing_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'footing_date'} setClickedDate={handleDateChange}  title='footing_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Footing Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='footing_crew' value={install.footing_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'footing'} title={"Footing Bill Sheet"} type={'footing_bill_sheet'} url={install.footing_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] border-b border-gray-400 ">

                                                <p className="text-[15px] w-[50%] font-medium ">Set Post Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Set Post Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, set_post_date: !showCalenders.set_post_date }) }}>

                                                            { install.set_post_date != 0  ? readable_day(Number(install.set_post_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.set_post_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.set_post_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'set_post_date'} setClickedDate={handleDateChange}  title='set_post_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Set Post Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='set_post_crew' value={install.set_post_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'set_post'} title={"Set Post Bill Sheet"} type={'set_post_bill_sheet'} url={install.set_post_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                        
                                    </form>}


                                    {next_stage === 'two' && 
                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Demo Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Demo Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, demo_date: !showCalenders.demo_date }) }}>

                                                            { install.demo_date != 0  ? readable_day(Number(install.demo_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.demo_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>

                                                        {showCalenders.demo_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'demo_date'} setClickedDate={handleDateChange}  title='demo_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Demo Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='demo_crew' value={install.demo_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'demo'} title={"Demo Bill Sheet"} type={'demo_bill_sheet'} url={install.demo_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Install Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Install Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, install_date: !showCalenders.install_date }) }}>

                                                            { install.install_date != 0  ? readable_day(Number(install.install_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.install_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.install_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'install_date'} setClickedDate={handleDateChange}  title='install_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Install Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='install_crew' value={install.install_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'install'} title={"Install Bill Sheet"} type={'install_bill_sheet'} url={install.install_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] font-medium ">Electrical Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Electrical Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, electrical_date: !showCalenders.electrical_date }) }}>

                                                            { install.electrical_date != 0  ? readable_day(Number(install.electrical_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.electrical_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.electrical_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'electrical_date'} setClickedDate={handleDateChange}  title='electrical_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Electrical Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='electrical_crew' value={install.electrical_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'electrical'} title={"Electrical Bill Sheet"} type={'electrical_bill_sheet'} url={install.electrical_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                        
                                    </form>}

                                    <div className="w-full flex items-center justify-end border-t border-gray-300 gap-[20px] pt-[10px] ">
                                        <p className="text-white w-1/3">.</p>

                                        {next_stage == 'one' && <button className="w-1/3 h-[40px] flex items-center justify-center text-white bg-amber-600 rounded-[3px] hover:bg-amber-700" onClick={()=> setNext_stage('two')} >
                                        Next
                                        </button>}

                                        {next_stage == 'two' && <button className="w-1/3 h-[40px] flex items-center justify-center text-white bg-amber-600 rounded-[3px] hover:bg-amber-700" onClick={()=> setNext_stage('one')} >
                                        Back
                                        </button>}

                                        <button className=" w-1/3 h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px]"  disabled={loading} onClick={add_install} >
                                                {loading ? (
                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : 'Submit'}

                                        </button>

                                    </div>

                                </div>
                                }

                                {modalFor == 'edit' &&
                                <div className="w-[80vw] flex flex-col items-start justify-start gap-[25px] rounded-[4px] p-[15px] py-[10px] ">
                                    <div className="w-full flex items-center justify-between border-b border-slate-200 pb-[10px] ">
                                        <div className="w-auto flex  items-center justify-start gap-[25px] ">
                                            <span className="w-auto flex items-start gap-[10px] ">
                                                <p className="text-[15px] ">Install Id</p>
                                                <p className="text-[15px]  font-medium ">{selectedInstall.install_ind}</p>
                                            </span>
                                        </div>

                                        
                                        {/* <div className="span flex items-center justify-end gap-[20px] ">
                                            
                                            <span className="w-full flex items-center justify-end gap-[15px] z-[20]">
                                                <p className="text-[15px]">Project Sign Off</p>
                                                <span className="h-[40px] min-w-[150px] z-[15]">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'project_sign_off'} dropArray={['Pending', "In Progress", "Completed", "Closed" ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                        </div> */}
                                        
                                    </div>

                                    {next_stage === 'one' && 
                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-auto flex flex-col  items-start justify-start gap-[15px] ">

                                                {selected_project?.job_id && <span className="w-auto flex items-start gap-[10px] ">
                                                    <p className="text-[15px] ">Job Id</p>
                                                    <p className="text-[15px]  font-medium ">{selected_project?.job_id}</p>
                                                </span>}
                                                {selected_project?.job_number && <span className="w-auto flex items-start gap-[10px]">
                                                    <p className="text-[15px] ">Job Number</p>
                                                    <p className="text-[15px] font-medium ">{selected_project?.job_number}</p>
                                                </span>}
                                                {selected_project?.customer_name && <span className="w-auto flex items-start gap-[10px]">
                                                    <p className="text-[15px] ">Customer Name</p>
                                                    <p className="text-[15px] font-medium ">{selected_project?.customer_name}</p>
                                                </span>}
                                            </div>
                                            
                                            {/* ---------------- */}
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-900 font-medium">Select Project</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="email" name='assigned_to' placeholder='Enter lead name or project Id to filter' onChange={filter_user} className='normal-input text-[15px]' />
                                                </span>
                                                
                                                {filtered_project?.projects !== null ?
                                                
                                                <div className="w-full h-[350px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-100 rounded-[3px] ">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        {filtered_project?.projects.length ? 
                                                        <>
                                                        {filtered_project?.projects.map((data:any, ind:number)=>{
                                                            const {project_ind, project_id, user_id, user_role, job } = data
                                                            const {lead} = job
                                                            const {customer_first_name, customer_last_name} = lead
                                                            return(
                                                                <span key={ind} className="w-full h-[35px] flex items-center justify-between hover:bg-slate-300 px-[10px] gap-[10px] rounded-[3px] " onClick={()=>selected_proj(data)}>

                                                                    <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer font-medium" >

                                                                        <p className="text-start text-[15px] text-slate-900 " >{ind + 1}. </p>

                                                                        <p className=" text-start text-[15px] text-slate-900 " > {customer_first_name} {customer_last_name} </p>

                                                                        <p className="text-start text-[15px] text-slate-900 " >{project_ind} </p>

                                                                    </span>
                                                                        
                                                                    <p key={ind} className=" text-start text-[15px] text-slate-900 text-end " > {user_role} </p>
                                                                    
                                                                    <span className="w-[40px] h-full flex justify-end items-center"> {selected_project?.project_id == project_id && <IoCheckmark size={18} />} </span>


                                                                </span>
                                                            )
                                                        })}
                                                        </>
                                                        :
                                                        <div className="w-full h-[350px] flex flex-col justify-center items-center">
                                                            <p className="text-[15px] ">No Project Entered yet</p>
                                                        </div>
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <div className="w-full h-[310px] flex items-center justify-center text-[15px]">
                                                    Loading Sales Personnels...
                                                </div>
                                                }

                                                {/* <button className=" w-full h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px] "  disabled={loading}  >
                                                    {loading ? (
                                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                    ) : 'Create Lead'}

                                                </button> */}
                                            </span>

                                            {/* ---------------- */}

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Footing Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Footing Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, footing_date: !showCalenders.footing_date }) }}>

                                                            { install.footing_date != 0  ? readable_day(Number(install.footing_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.footing_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.footing_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'footing_date'} setClickedDate={handleDateChange}  title='footing_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Footing Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='footing_crew' value={install.footing_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'footing'} title={"Footing Bill Sheet"} type={'footing_bill_sheet'} url={install.footing_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] border-b border-gray-400 ">

                                                <p className="text-[15px] w-[50%] font-medium ">Set Post Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Set Post Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, set_post_date: !showCalenders.set_post_date }) }}>

                                                            { install.set_post_date != 0  ? readable_day(Number(install.set_post_date)) : "Select Date"}

                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.set_post_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>

                                                        </button>

                                                        {showCalenders.set_post_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'set_post_date'} setClickedDate={handleDateChange}  title='set_post_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Set Post Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='set_post_crew' value={install.set_post_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'set_post'} title={"Set Post Bill Sheet"} type={'set_post_bill_sheet'} url={install.set_post_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                        
                                    </form>}


                                    {next_stage === 'two' && 
                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Demo Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Demo Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, demo_date: !showCalenders.demo_date }) }}>

                                                            { install.demo_date != 0  ? readable_day(Number(install.demo_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.demo_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>

                                                        {showCalenders.demo_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'demo_date'} setClickedDate={handleDateChange}  title='demo_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Demo Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='demo_crew' value={install.demo_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'demo_date'} title={"Demo Bill Sheet"} type={'demo_bill_sheet'} url={install.demo_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Install Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Install Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, install_date: !showCalenders.install_date }) }}>

                                                            { install.install_date != 0  ? readable_day(Number(install.install_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.install_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.install_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'install_date'} setClickedDate={handleDateChange}  title='install_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Install Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='install_crew' value={install.install_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'install'} title={"Install Bill Sheet"} type={'install_bill_sheet'} url={install.install_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[65vh] overflow-y-auto ">
                                            
                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] ">

                                                <p className="text-[15px] w-[50%] font-medium ">Electrical Information</p>

                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10] ">

                                                    <h4 className="text-[15px] ">Electrical Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, electrical_date: !showCalenders.electrical_date }) }}>

                                                            { install.electrical_date != 0  ? readable_day(Number(install.electrical_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.electrical_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.electrical_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'electrical_date'} setClickedDate={handleDateChange}  title='electrical_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-[15px]">Electrical Crew</p>
                                                    <span className="h-[40px] w-full ">
                                                        <input type="text" name='electrical_crew' value={install.electrical_crew} onChange={handle_change} className='normal-input text-[15px]' />
                                                    </span>
                                                </span>

                                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                                    <span className="w-full flex flex-col items-center justify-start gap-2">
                                                        <FileUploader id={'electrical'} title={"Electrical Bill Sheet"} type={'electrical_bill_sheet'} url={install.electrical_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                        
                                    </form>}

                                    <div className="w-full flex items-center justify-end border-t border-gray-300 gap-[20px] pt-[10px] ">
                                        <p className="text-white w-1/3">.</p>

                                        {next_stage == 'one' && <button className="w-1/3 h-[40px] flex items-center justify-center text-white bg-amber-600 rounded-[3px] hover:bg-amber-700" onClick={()=> setNext_stage('two')} >
                                        Next
                                        </button>}

                                        {next_stage == 'two' && <button className="w-1/3 h-[40px] flex items-center justify-center text-white bg-amber-600 rounded-[3px] hover:bg-amber-700" onClick={()=> setNext_stage('one')} >
                                        Back
                                        </button>}

                                        <button className=" w-1/3 h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-b-700 flex items-center justify-center text-[15px]"  disabled={loading} onClick={edit_install} >
                                                {loading ? (
                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : 'Update'}

                                        </button>

                                    </div>

                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default JobListModal