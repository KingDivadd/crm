'use client'
import React,{useState, useEffect, Dispatch, SetStateAction} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import {DeleteTaskProps} from "../../../types/index"
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader from '../imageUploader'
import MyDatePicker from '../datePicker'

const BillSheetModal = ({showModal, setShowModal, selectedItem, setSelectedItem, show, setShow  }:DeleteTaskProps) => {
    const [billSheet, setBillSheet] = useState({jobNumber: '', task: '', crew: '', date: '', amount: ''})
    const [updateBtn, setUpdateBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [clickedDate, setClickedDate] = useState('')
    const [showCalender, setShowCalender] = useState(false)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status:false,
    });
    const [dropElements, setDropElements] = useState({
        status:'Select Project',
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

    useEffect(() => {
        setBillSheet({...billSheet, date: clickedDate})
        setShowCalender(false)
    }, [clickedDate])
    
    function handleChange(e:any){
        const name = e.target.name
        const value =  e.target.value
        setBillSheet({...billSheet, [name]:value})
    }

    function triggerAlert(message:string, type: string) {
        setAlert({message:message, type: type})
        setTimeout(() => {
            setAlert({message: '', type:''})
            setShowModal(false)
            setShow(false)
        }, 2000);
    }
    function handleSubmit(){
        if (false){

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    triggerAlert('Ticket Created Successfully', "success")
            }, 2000);
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
                <div className="w-full h-screen pt-[40px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className="h-auto w-[650px] mx-auto shadow-xl flex items-start ">
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[300px] flex flex-col justify-start items-center p-[20px] ">
                                <div className="w-full flex flex-col items-start justify-start gap-[20px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">New Bill Sheet</p>
                                    </span>

                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light ">Job Number</h4>
                                        <input type="text" name='jobNumber' className="normal-input bg-transparent" value={billSheet.jobNumber} onChange={handleChange} />
                                    </span>

                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light ">Task</h4>
                                        <input type="text" name='task' className="normal-input bg-transparent" value={billSheet.task} onChange={handleChange} />
                                    </span>

                                    <span className="w-full flex flex-col items-start justify-start gap-2">

                                        <h4 className="text-md font-light ">Date</h4>
                                        <div className="w-full flex flex-col items-end justify-end relative z-10 ">
                                            <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={()=>{setShowCalender(!showCalender)}}>
                                                {billSheet.date ? billSheet.date :  "Select Date"}
                                                <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                                    {showCalender ?  <FaCaretUp  /> : <FaCaretDown  />}
                                                </span>
                                            </button>
                                            {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                                <MyDatePicker clickedDate={clickedDate} setClickedDate={setClickedDate} />
                                            </div>}
                                        </div>
                                        
                                    </span>
                                    
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md  font-light ">Crew</h4>
                                        <input type="text" name='crew' className="normal-input bg-transparent" value={billSheet.crew} onChange={handleChange} />
                                    </span>


                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md  font-light ">amount</h4>
                                        <input type="text" name='amount' className="normal-input bg-transparent" value={billSheet.amount} onChange={handleChange} />
                                    </span>

                                    
                                    

                                    <span className="w-full flex items-center justify-end">
                                        <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            ) : 'Upload'}
                                            
                                        </button>
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BillSheetModal