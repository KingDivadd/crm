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


interface Lead_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedProject: any;
    setSelectedProject: (selectedProject: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const JobListModal = ({ showModal, setShowModal, selectedProject, setSelectedProject, modalFor, setModalFor}: Lead_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [install, setInstall] = useState({
        footing_date: 0, footing_crew: '', footing_bill_sheet: '', demo_date: 0, demo_crew: '', demo_bill_sheet: '', 
        set_post_date: 0, set_post_crew: '', set_post_bill_sheet: '', install_date: 0, install_crew: '', install_bill_sheet: '', 
        electrical_date: 0, electrical_crew: '', electrical_bill_sheet: '', inspection_date: 0, inspection_status: 'n_a', project_sign_off: 'pending'
    })
    

    const [showCalenders, setShowCalenders] = useState({footing_date: false, set_post_date: false, demo_date: false, install_date: false, electrical_date: false, inspection_date: false,  })

    
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

    async function add_install(e:any) {
        e.preventDefault()
        if (false) {
            // nothing to check for
            
        }
        else{
            try {
                setLoading(true)

                console.log('install data ', install)

                const response = await post_auth_request(`app/add-project-install/${selectedProject.project_id}`, install)

                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")

                    console.log( 'install response ', response.data)
                    
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


    useEffect(() => {
        const {install} = selectedProject

        if(install.length){
            setModalFor('add')
        }
        
    }, [])


    type InstallDates = {
        footing_date: string;
        set_post_date: string;
        demo_date: string;
        install_date: string;
        electrical_date: string;
        inspection_date: string;
    }

    const handleDateChange = (field: keyof InstallDates, newDate: string) => {
        
        // setClicked_permit_date((prevState) => ({
        //     ...prevState,
        //     [field]: newDate,  
        // }));
        
        setShowCalenders({...showCalenders, [field]: false })

        setInstall({...install, [field]: Number(convert_to_unix(newDate) * 1000 )})
    };

    const handleFileUpload = (fileUrl:string, type: string) => {
        console.log('selected file ', type, " : ", fileUrl)
        setInstall({...install, [type]: fileUrl})
        
    };

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
                                    <div className="w-full flex flex-row items-center justify-between border-b border-slate-200 pb-[10px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">Project Id <strong>{selectedProject.project_ind}</strong> </p>

                                        
                                        <div className="span flex items-center justify-end gap-[20px] ">
                                            
                                            <span className="w-full flex items-center justify-end gap-[15px] z-[20]">
                                                <p className="text-[15px]">Project Sign Off</p>
                                                <span className="h-[40px] min-w-[150px] z-[15]">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'project_sign_off'} dropArray={['Pending', "In Progress", "Completed", "Closed" ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                        </div>
                                        
                                    </div>

                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] ">
                                            <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                                <p className="text-[15px] w-[50%] font-medium ">Basic Information</p>

                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Job Id</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.job_ind}</p>
                                                </span>
                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Job Number</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.job_number}</p>
                                                </span>
                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Customer Name</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.lead.customer_first_name} {selectedProject.job.lead.customer_last_name}</p>
                                                </span>
                                            </div>

                                            <div className="w-full flex flex-col items-start justify-between gap-[15px] ">
                                                <p className="text-[15px] font-medium">Inspection Information</p>

                                                <span className="w-full flex  items-center justify-start gap-[10px] z-[25] ">

                                                    <h4 className="text-[15px] w-[250px] whitespace-nowrap ">Inspection Date</h4>
                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, inspection_date: !showCalenders.inspection_date }) }}>

                                                            { install.inspection_date != 0  ? readable_day(Number(install.inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'inspection_date'} setClickedDate={handleDateChange}  title='inspection_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex items-center justify-between gap-[10px] z-[20]">
                                                    <p className="text-[15px] w-[250px] whitespace-nowrap ">Inspection Status</p>
                                                    <span className="h-[40px]  w-full z-[10]">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'inspection_status'} dropArray={['Pass','Fail', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[63.5vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] border-b border-gray-400 ">

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
                                                        <FileUploader id={'set_post'} title={"Set Post Bill Sheet"} type={'footing_bill_sheet'} url={install.set_post_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

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
                                                        <FileUploader id={'demo_date'} title={"Demo Bill Sheet"} type={'footing_bill_sheet'} url={install.demo_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>
                                            

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[63.5vh] overflow-y-auto ">
                                            
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
                                        
                                    </form>

                                    <div className="w-full flex items-center justify-end border-t border-gray-300 gap-[20px] ">
                                        <p className="text-white w-1/3">.</p>
                                        <p className="text-white w-1/3">.</p>

                                        <button className=" w-1/3 h-[40px] mt-[5px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-[15px]"  disabled={loading} onClick={add_install} >
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
                                    <div className="w-full flex flex-row items-center justify-between border-b border-slate-200 pb-[10px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">Project Id <strong>{selectedProject.project_ind}</strong> </p>

                                        
                                        <div className="span flex items-center justify-end gap-[20px] ">
                                            
                                            <span className="w-full flex items-center justify-end gap-[15px] z-[20]">
                                                <p className="text-[15px]">Project Sign Off</p>
                                                <span className="h-[40px] min-w-[150px] z-[15]">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'project_sign_off'} dropArray={['Pending', "In Progress", "Completed", "Closed" ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>
                                        </div>
                                        
                                    </div>

                                    <form  action="" className="w-full  flex items-start justify-between gap-[20px]">
                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] ">
                                            <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                                <p className="text-[15px] w-[50%] font-medium ">Basic Information</p>

                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Job Id</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.job_ind}</p>
                                                </span>
                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Job Number</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.job_number}</p>
                                                </span>
                                                <span className="w-full flex items-start gap-[10px]">
                                                    <p className="text-[15px] w-[50%] ">Customer Name</p>
                                                    <p className="text-[15px] w-[50%] font-medium ">{selectedProject.job.lead.customer_first_name} {selectedProject.job.lead.customer_last_name}</p>
                                                </span>
                                            </div>

                                            <div className="w-full flex flex-col items-start justify-between gap-[15px] ">
                                                <p className="text-[15px] font-medium">Inspection Information</p>

                                                <span className="w-full flex  items-center justify-start gap-[10px] z-[25] ">

                                                    <h4 className="text-[15px] w-[250px] whitespace-nowrap ">Inspection Date</h4>
                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, inspection_date: !showCalenders.inspection_date }) }}>

                                                            { install.inspection_date != 0  ? readable_day(Number(install.inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <InstallDatePicker clickedDate={'inspection_date'} setClickedDate={handleDateChange}  title='inspection_date'  />
                                                        </div>}
                                                    </div>

                                                </span>

                                                <span className="w-full flex items-center justify-between gap-[10px] z-[20]">
                                                    <p className="text-[15px] w-[250px] whitespace-nowrap ">Inspection Status</p>
                                                    <span className="h-[40px]  w-full z-[10]">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'inspection_status'} dropArray={['Pass','Fail', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[63.5vh] overflow-y-auto ">

                                            <div className="w-full flex flex-col items-start justify-start gap-[20px] border-b border-gray-400 ">

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
                                                        <FileUploader id={'set_post'} title={"Set Post Bill Sheet"} type={'footing_bill_sheet'} url={install.set_post_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>

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
                                                        <FileUploader id={'demo_date'} title={"Demo Bill Sheet"} type={'footing_bill_sheet'} url={install.demo_bill_sheet || "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg"} onFileUpload={handleFileUpload} />
                                                    </span>
                                                </div>

                                            </div>
                                            

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[20px] h-[63.5vh] overflow-y-auto ">
                                            
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
                                        
                                    </form>

                                    <div className="w-full flex items-center justify-end border-t border-gray-300 gap-[20px] ">
                                        <p className="text-white w-1/3">.</p>
                                        <p className="text-white w-1/3">.</p>

                                        <button className=" w-1/3 h-[40px] mt-[5px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-[15px]"  disabled={loading}  >
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