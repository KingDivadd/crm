'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown, { DropDownBlank, DropDownBlankTransparent } from '../../component/dropDown';
import { AddUsersProps, OpsLeadProps } from '../../../types';
import Alert from '../alert';
import { IoMdArrowBack } from "react-icons/io";
import { userResponsibilities } from '../../../constants';
import MyDatePicker from '../datePicker';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import DeleteLeadMoal from './deleteLeadModal'
import { WiMoonAltNew } from 'react-icons/wi';

const OpsViewLead = ({addLead, selectedLead, show, setShow, setSelectedLead}:OpsLeadProps) => {

    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [lead, setLead] = useState({customerName: '', address: '', phone: '', email: '', designer: '', gateCode: '', appointmentDate: '', status: '', disposition: '', linkedWithGoogleCalender: false})

    const [auth, setAuth] = useState({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
    const [inputError, setInputError] = useState({lastNameError: false, firstNameError: false, emailError: false, phoneError: false, roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [clickedDate, setClickedDate] = useState('')
    const [showCalender, setShowCalender] = useState(false)

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        priority: false, status: false, designer: false, disposition: false
    });
    const [dropElements, setDropElements] = useState({
        priority: 'Priority', status: 'Status', designer: 'Select Designer', disposition: 'SELECT'
    })

    useEffect(() => {
        setLead({...lead, appointmentDate: clickedDate})
        setShowCalender(false)
    }, [clickedDate])


    useEffect(() => {
        if (auth.lastName){setInputError({...inputError, lastNameError: auth.lastName === ''})}
        if (auth.firstName){setInputError({...inputError, firstNameError: auth.firstName === ''})}
        if (auth.email){setInputError({...inputError, emailError: auth.email === ''})}
        if (auth.phone){setInputError({...inputError, phoneError: auth.phone === ''})}
        if (auth.password){setInputError({...inputError, passwordError: auth.password === ''})}
    }, [auth])

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
        const value = e.target.value
        setLead({...lead, [name]:value})
    }

    function triggerAlert(type:string, message: string){
        setAlert({type: type, message: message})
        setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 3000);
    }

    async function handleSubmit(e:any){
        if(false){
            setInputError({...inputError, lastNameError: auth.lastName === "", firstNameError: auth.firstName === "", emailError: auth.email === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setShow(false)
                    triggerAlert('success', 'Task Added successfully')
            }, 3000);
        }
    }

    async function updateTask(e:any){
        if(false){
            setInputError({...inputError, lastNameError: auth.lastName === "", firstNameError: auth.firstName === "", emailError: auth.email === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setShow(false)
                    triggerAlert('success', 'Task updated successfully')
                    setAuth({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
            }, 3000);
        }
    }

    async function deleteTask(){
        
        setShowModal(true)
    }

    return (
        <div className="w-full relative h-full p-[10px] pb-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[15px] pt-[10px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setShow(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />All Leads</p>
                        <p className="text-md text-black">155</p>
                        
                    </span>
                    <span className="h-full flex flex-row items-center justify-end gap-4">
                        {!addLead ? <span className="w-auto h-auto flex flex-row items-center justify-end gap-3">
                            <p className="text-lg ">Lead ID:</p>
                            <p className="text-lg font-semibold">Ld1001</p>
                        </span> : <p className="text-lg font-semibold">Adding New Task</p> }                        
                    </span>
                </span>


                <div className="w-full flex flex-row items-start justify-between bg-white px-[10px] py-[10px] rounded-[5px] border border-blue-600 gap-[10px] ">
                    {/* left side for inputs */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Customer Name</h4>
                            <input type="text" name='customerName' className='normal-input' value={lead.customerName} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Customer Address</h4>
                            <input type="text" name='address' className='normal-input' value={lead.address} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Phone Number</h4>
                            <input type="text" name='phone' className='normal-input' value={lead.phone} onChange={handleChange} />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Designer</h4>
                            <span className="h-[40px] w-full">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'designer'} dropArray={['Designer 1', 'Designer 2', 'Designer 3']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Gate Code</h4>
                            <input type="text" name='gateCode' className='normal-input' value={lead.gateCode} onChange={handleChange} />
                        </span>
                        
                        

                        {/* -----------------------END OF COLUMN------------------------------- */}
                        
                        
                    </div>
                    {/* -------------------------BEGINNING OF THE RIGHT COLUMB------------------- */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Apointment Date</h4>
                            <div className="w-full flex flex-col items-end justify-end relative z-20 ">
                                <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={()=>{setShowCalender(!showCalender)}}>
                                    {lead.appointmentDate ? lead.appointmentDate :  "Select Date"}
                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                        {showCalender ?  <FaCaretUp  /> : <FaCaretDown  />}
                                    </span>
                                </button>
                                {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-auto mx-auto pt-[1px] flex flex-row items-start justify-center w-full ">
                                    <MyDatePicker clickedDate={clickedDate} setClickedDate={setClickedDate} />
                                </div>}
                            </div>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2 z-10">
                            <h4 className="text-md font-light">Lead Status</h4>
                            <span className="w-full h-[40px] ">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Scheduled', 'In Progress', 'Completed']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>
                        
                        {!addLead && <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Lead Disposition</h4>
                            <span className="w-full h-[40px] ">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['Sold', 'Not Sold']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>}

                        <span className="w-full flex flex-row items-start justify-between gap-2 mt-3 cursor-pointer" onClick={()=>{setLead({...lead, linkedWithGoogleCalender: !lead.linkedWithGoogleCalender})}}>
                            <h4 className="text-md font-light">Linked with Google Calender</h4>
                            <span   className={lead.linkedWithGoogleCalender ? "@apply w-auto h-[20px] flex flex-row items-center justify-center border border-blue-600 rounded-[10px] p-[3px] px-[.2px] bg-blue-600 cursor-pointer":"@apply w-auto h-[20px] flex flex-row items-center justify-center border border-gray-300 rounded-[10px] p-[3px] px-[.2px]  bg-gray-300 cursor-pointer"}>
                                                <WiMoonAltNew size={20} className={lead.linkedWithGoogleCalender ? 'text-blue-600': 'text-white'} />
                                                <WiMoonAltNew size={20} className={lead.linkedWithGoogleCalender ? 'text-white': 'text-gray-300'} />

                                            </span>
                        </span>

                    </div>
                            
                </div>

                <div className="w-full flex flex-row justify-between">
                    {addLead ? <p></p> 
                    : 
                    <button className=" w-[170px] h-[40px] text-white bg-red-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center" onClick={deleteTask} disabled={delLoading}>
                        {delLoading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Delete Task'}
                    </button> }

                    <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {!addLead  ? <button className=" w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={updateTask} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Save Changes'}
                    </button>
                    :
                    <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Add Task'}
                    </button>}
                    </span>
                </div>

            </div>
            {showModal && <DeleteLeadMoal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default OpsViewLead


