'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { DropDownBlankTransparent } from '../dropDown'
import MyDatePicker, { DatePicker, Installation_date_picker } from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from "../../api/admin_api";
import {get_todays_date, convert_to_unix, readable_day, timestamp_to_readable_value, default_install_img} from "../helper"
import Image from "next/image"
import { IoCheckmark } from 'react-icons/io5'


interface Inspection_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedInspection: any;
    setSelectedInspection: (selectedInspection: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const InspectionModal = ({ showModal, setShowModal, selectedInspection, setSelectedInspection, modalFor}: Inspection_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_installs, setAll_installs] = useState< {installs?:any} | null>(null)
    const [filtered_installs, setFiltered_installs] = useState< {installs?:any} | null>(null)
    const [selected_installs, setSelected_installs] = useState<{install_id?:string; install?:any } | null>(null)
    
    const [inspection, setInspection] = useState({
        footing_inspection_status: '', footing_inspection_comments: '', footing_inspection_date: 0,
        set_post_inspection_status: '', set_post_inspection_comments: '', set_post_inspection_date: 0,
        demo_inspection_status: '', demo_inspection_comments: '', demo_inspection_date: 0,
        electrical_inspection_status: '', electrical_inspection_comments: '', electrical_inspection_date: 0,
        install_inspection_status: '', install_inspection_comments: '', install_inspection_date: 0,
        final_inspection_status: '', final_inspection_comments: '', final_inspection_date: 0,
    })

    const [showCalenders, setShowCalenders] = useState({
        footing_inspection_date: false, set_post_inspection_date: false, 
        demo_inspection_date: false, install_inspection_date: false, 
        electrical_inspection_date: false, final_inspection_date: false
    })

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        install_type: false, 
        footing_inspection_status: false,
        set_post_inspection_status: false,
        demo_inspection_status: false,
        install_inspection_status: false,
        electrical_inspection_status: false,
        final_inspection_status: false,
    });

    const [dropElements, setDropElements] = useState({
        install_type: "Select Insallation for Inspection",
        footing_inspection_status: 'Footing Inspection Status', 
        set_post_inspection_status: 'Set Post Inspection Status', 
        demo_inspection_status: 'Demo Inspection Status', 
        install_inspection_status: 'Install Inspection Status', 
        electrical_inspection_status: 'Electrical Inspection Status', 
        final_inspection_status: 'Final Inspection Status', 
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
        console.log(title, dropdown)
        setInspection({...inspection, [title]: dropdown })
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

        setInspection({...inspection, [name]:value})
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function filter_install(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value
            
        const filtered_items = all_installs?.installs.filter((data: { install_ind: string }) =>
            data.install_ind.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_installs(value === '' ? all_installs : filtered_items);
    }
    
    useEffect(() => {
        if (modalFor == 'add'){
            get_all_installs()
        }else if (modalFor == 'edit'){
            get_all_installs()
            const {inspection_type, pass, date, inspection_comments, } = selectedInspection
            
        }
    }, [])

    async function get_all_installs() {

        try {

            const response = await get_auth_request(`app/all-installs`)
            
            if (response.status == 200 || response.status == 201){

                setAll_installs(response.data)

                setFiltered_installs(response.data)

                console.log(response.data)
                            
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_inspection(e:any) {
        e.preventDefault()
        console.log('create inspection ', inspection)

        if (!selected_installs?.install_id ) {
            showAlert('Please select an install', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(`app/add-inspection/${selected_installs.install_id}`, inspection)
                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setShowModal(false)
                    
                    setLoading(false)

                    console.log('', "success")

                    }else{       
                                    
                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                showAlert('Error occured ', 'error')
                setLoading(false)
            }
        }
    }

    async function update_inspection(e:any) {
        e.preventDefault()
        console.log('update inspection ', inspection)

        // if (false) {
        //     showAlert('Please fill required fields', 'error')
        // }else{
        //     try {
        //         setLoading(true)
                
        //         const response = await patch_auth_request(`lead/edit-lead/${selectedInspection.lead_id}`, 
        //             { inspection_type: auth.inspection_type, pass: auth.pass , date: auth.date, inspection_comments: auth.inspection_comments, })
        //         if (response.status == 200 || response.status == 201){
                                
        //             showAlert(response.data.msg, "success")
                    
        //             setShowModal(false)
                    
        //             setLoading(false)

        //             }else{       

        //             showAlert(response.response.data.err, "error")
                    
        //             setLoading(false)
        //         }
        //     } catch (err) {
        //         showAlert('Error occured ', 'error')
        //         setLoading(false)
        //     }
        // }
    }

    async function delete_lead(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            
            const response = await delete_auth_request(`lead/delete-lead/${selectedInspection.lead_id}`)
            if (response.status == 200 || response.status == 201){
                            
                showAlert(response.data.msg, "success")
                
                setShowModal(false)
                
                setLoading(false)

                }else{       

                showAlert(response.response.data.err, "error")

                setLoading(false)

            }
        } catch (err) {
            showAlert('Error occured ', 'error')
            setLoading(false)
        }
    
    }

    type InspectionDates = {
        footing_inspection_date: string;
        set_post_inspection_date: string;
        demo_inspection_date: string;
        install_inspection_date: string;
        electrical_inspection_date: string;
        final_inspection_date: string;
    };
    

    const handleDateChange = (field: keyof InspectionDates, newDate: string) => {
        
        setShowCalenders({...showCalenders, [field]: false })

        setInspection({...inspection, [field]: Number(convert_to_unix(newDate)) * 1000 })

    };

    function selected_proj(data:any) {
        setSelected_installs({...selected_installs, install_id: data.install_id, install: data})
        console.log('data ',data)
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
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}

                                {modalFor == 'add' && 
                                <div className="w-[75vw] flex flex-col items-start justify-start gap-[15px] rounded-[4px] px-[15px] py-[7.5px] ">
                                    <span className="w-full flex flex-row items-center justify-between border-b border-slate-200 pb-[10px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">New Inspection </p>

                                    </span>
                                    <div className="w-full flex items-center justify-between gap-[20px] ">

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[25px] h-[65vh] overflow-y-auto ">
                                        
                                            <span className="w-full flex flex-col items-self justify-self gap-[15px] ">
                                                <p className="text-[15px]">Select Install</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="email" name='assigned_to' placeholder='Enter install id to filter' onChange={filter_install} className='normal-input text-[15px]' />
                                                </span>
                                                
                                                {filtered_installs?.installs !== null ?
                                                
                                                    <div className="w-full flex flex-col items-start justify-start overflow-y-auto rounded-[3px] ">
                                                        <div className="w-full h-[390px] flex flex-col bg-slate-100 items-start justify-start">
                                                            {filtered_installs?.installs.length ? 
                                                            <>
                                                            {filtered_installs?.installs.map((data:any, ind:number)=>{
                                                                const {install_ind, install_id } = data
                                                                return(
                                                                    <span key={ind} className="w-full h-[35px] flex items-center justify-between hover:bg-slate-300 px-[10px] gap-[10px] rounded-[3px] " onClick={()=>selected_proj(data)}>

                                                                        <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer font-medium" >

                                                                            <p className="text-start text-[15px] text-slate-900 " >{ind + 1}. </p>

                                                                            <p className=" text-start text-[15px] text-slate-900 " > {} </p>

                                                                            <p className="text-start text-[15px] text-slate-900 " >{install_ind} </p>

                                                                        </span>

                                                                        
                                                                        <span className="w-[40px] h-full flex justify-end items-center"> {selected_installs?.install_id == install_id && <IoCheckmark size={18} />} </span>


                                                                    </span>
                                                                )
                                                            })}
                                                            </>
                                                            :
                                                            <div className="w-full h-[390px] bg-slate-100 flex flex-col justify-center items-center">
                                                                <p className="text-[15px] ">No install done yet</p>
                                                            </div>
                                                            }

                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="w-full h-[370px] flex items-center justify-center text-[15px]">
                                                        Loading Sales Personnels...
                                                    </div>
                                                }

                                            </span>

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start gap-[25px] h-[65vh] overflow-y-auto ">
                                        
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] z-[20] ">
                                                <p className="text-[15px]">Installation to Inspect</p>
                                                <span className="h-[40px] w-full">
                                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'install_type'} dropArray={['footing', 'set post', 'demo', 'install', 'electrical', 'final' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                </span>
                                            </span>

                                            {dropElements.install_type == 'footing' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Footing Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, footing_inspection_date: !showCalenders.footing_inspection_date }) }}>

                                                            { inspection.footing_inspection_date != 0 ? readable_day(Number(inspection.footing_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.footing_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.footing_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'footing_inspection_date'} setClickedDate={handleDateChange}  title='footing_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Footing Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'footing_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Footing Inspection Comments </p>
                                                    <textarea name="footing_inspection_comments" value={inspection.footing_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}

                                            {dropElements.install_type.replace(/ /g,'_') == 'set_post' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Set Post Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, set_post_inspection_date: !showCalenders.set_post_inspection_date }) }}>

                                                            { inspection.set_post_inspection_date != 0 ? readable_day(Number(inspection.set_post_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.set_post_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.set_post_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'set_post_inspection_date'} setClickedDate={handleDateChange}  title='set_post_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Set Post Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'set_post_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Set Post Inspection Comments </p>
                                                    <textarea name="set_post_inspection_comments" value={inspection.set_post_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}
                                            
                                            {dropElements.install_type == 'demo' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Demo Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, demo_inspection_date: !showCalenders.demo_inspection_date }) }}>

                                                            { inspection.demo_inspection_date != 0 ? readable_day(Number(inspection.demo_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.demo_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.demo_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'demo_inspection_date'} setClickedDate={handleDateChange}  title='demo_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Demo Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'demo_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Demo Inspection Comments </p>
                                                    <textarea name="demo_inspection_comments" value={inspection.demo_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}
                                            
                                            {dropElements.install_type == 'install' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Install Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, install_inspection_date: !showCalenders.install_inspection_date }) }}>

                                                            { inspection.install_inspection_date != 0 ? readable_day(Number(inspection.install_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.install_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.install_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'install_inspection_date'} setClickedDate={handleDateChange}  title='install_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Install Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'install_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Demo Inspection Comments </p>
                                                    <textarea name="install_inspection_comments" value={inspection.install_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}
                                            
                                            {dropElements.install_type == 'electrical' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Electrical Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, electrical_inspection_date: !showCalenders.electrical_inspection_date }) }}>

                                                            { inspection.electrical_inspection_date != 0 ? readable_day(Number(inspection.electrical_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.electrical_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.electrical_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'electrical_inspection_date'} setClickedDate={handleDateChange}  title='electrical_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Electrical Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'electrical_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Demo Inspection Comments </p>
                                                    <textarea name="electrical_inspection_comments" value={inspection.electrical_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}
                                            
                                            {dropElements.install_type == 'final' && <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                                <span className="w-full flex flex-col items-start justify-start gap-[10px] z-[10]">

                                                    <h4 className="text-[15px] ">Final Inspection Date</h4>

                                                    <div className="w-full flex flex-col items-end justify-end relative ">
                                                        <button className="rounded-[3px] h-[40px] w-full bg-transparent border border-gray-400 flex flex-row items-center justify-between px-[10px] text-[15px]" onClick={(e:any) => {e.preventDefault(); setShowCalenders({...showCalenders, final_inspection_date: !showCalenders.final_inspection_date }) }}>

                                                            { inspection.final_inspection_date != 0 ? readable_day(Number(inspection.final_inspection_date)) : "Select Date"}
                                                            <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                                {showCalenders.final_inspection_date ? <FaCaretUp /> : <FaCaretDown />}
                                                            </span>
                                                        </button>
                                                        {showCalenders.final_inspection_date && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                            <Installation_date_picker clickedDate={'final_inspection_date'} setClickedDate={handleDateChange}  title='final_inspection_date' />
                                                        </div>}
                                                    </div>

                                                </span>
                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900">Final Inspection Status</p>
                                                    <span className="h-[40px] w-full">
                                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'final_inspection_status'} dropArray={['Pass', 'Fail' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                    </span>
                                                </span>

                                                <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                    <p className="text-sm text-slate-900 flex items-center gap-2">Final Inspection Comments </p>
                                                    <textarea name="final_inspection_comments" value={inspection.final_inspection_comments} rows={6.95} className='resize-none w-full outline-none border-2 border-slate-300 focus:border-blue-600 rounded-[3px] p-[10px] text-[15px] ' onChange={handle_change} ></textarea>

                                                </span>
                                            </div>}

                                        </div>

                                        <div className="w-1/3 flex flex-col items-start justify-start  h-[65vh] overflow-y-auto ">

                                            {!['footing', 'set_post', 'electrical', 'install', 'final', 'demo'].includes(dropElements.install_type.replace(/ /g, '_'))  &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Footing Date</p>
                                                    <p className="text-[15px] font-medium ">--</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Footing Crew</p>
                                                    <p className="text-[15px] font-medium ">{"--"}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}

                                            {dropElements.install_type == 'footing' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Footing Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.footing_date !== 0 )? readable_day(Number(selected_installs?.install.footing_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Footing Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.footing_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.footing_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}

                                            {dropElements.install_type == 'set_post' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Set Post Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.set_post_date !== 0 )? readable_day(Number(selected_installs?.install.set_post_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Set Post Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.set_post_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.set_post_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}

                                            {dropElements.install_type == 'demo' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Demo Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.demo_date !== 0 )? readable_day(Number(selected_installs?.install.demo_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Demo Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.demo_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.demo_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}
                                            
                                            {dropElements.install_type == 'install' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Install Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.install_date !== 0 )? readable_day(Number(selected_installs?.install.install_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Install Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.install_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.install_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}
                                            
                                            {dropElements.install_type == 'electrical' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Electrical Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.electrical_date !== 0 )? readable_day(Number(selected_installs?.install.electrical_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Electrical Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.electrical_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.electrical_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>}

                                            
                                            {/* {dropElements.install_type == 'final' &&
                                            <div className="flex flex-col items-start justify-between gap-[15px] w-full ">

                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Final Date</p>
                                                    <p className="text-[15px] font-medium ">{(!selected_installs?.install || selected_installs?.install.final_date !== 0 )? readable_day(Number(selected_installs?.install.final_date)) : '--' }</p>
                                                </span>
                                            
                                                <span className="w-full flex items-center justify-start gap-[15px]">
                                                    <p className="text-[15px] ">Final Crew</p>
                                                    <p className="text-[15px] font-medium ">{selected_installs?.install.final_crew}</p>
                                                </span>

                                                <div className="relative w-full h-[410px] rounded-[3px] overflow-hidden p-[7.5px] ">
                                                    <Image
                                                        src={ selected_installs?.install.final_bill_sheet || default_install_img }
                                                        alt="avatar"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>

                                            </div>} */}

                                        </div>

                                    </div>

                                    <div className="w-full flex items-center justify-end gap-[25px] pt-[10px] border-t border-gray-300 ">
                                        <p className="text-white">.</p>
                                        <p className="text-white">.</p>
                                        <button className=" w-1/3 h-[45px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm "  disabled={loading} onClick={create_inspection} >
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'submit'}

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

export default InspectionModal
