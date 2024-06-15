'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown, { DropDownBlank, DropDownBlankTransparent } from '../../component/dropDown';
import { AddUsersProps, SalesTaskProps } from '../../../types';
import Alert from '../alert';
import { IoMdArrowBack } from "react-icons/io";
import { userResponsibilities } from '../../../constants';

const ViewTask = ({addTask, selectedTask, setAddTask, setSelectedTask}:SalesTaskProps) => {

    const [task, setTask] = useState({taskTitle: '', taskDescription: '', taskDueDate: '', priority: '', assigendTo: '', status: '' })

    const [auth, setAuth] = useState({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
    const [inputError, setInputError] = useState({lastNameError: false, firstNameError: false, emailError: false, phoneError: false, roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        priority: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        priority: 'Priority', status: 'Status'

    })

    useEffect(() => {
        if(selectedTask != null){
            
        }
    }, [])



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
        setAuth({...auth, [name]:value})
    }

    function triggerAlert(type:string, message: string){
        setAlert({type: type, message: message})
        setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 3000);
    }

    async function handleSubmit(e:any){
        if(!auth.lastName || !auth.firstName || !auth.email || !auth.password || !auth.phone){
            setInputError({...inputError, lastNameError: auth.lastName === "", firstNameError: auth.firstName === "", emailError: auth.email === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setAddTask(false)
                    triggerAlert('success', 'User Added successfully')
                    const [auth, setAuth] = useState({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
            }, 3000);
        }
    }

    async function updateUser(e:any){
        if(!auth.lastName || !auth.firstName || !auth.email || !auth.password || !auth.phone){
            setInputError({...inputError, lastNameError: auth.lastName === "", firstNameError: auth.firstName === "", emailError: auth.email === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setAddTask(false)
                    triggerAlert('success', 'User Added successfully')
                    setAuth({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
            }, 3000);
        }
    }

    return (
        <div className="w-full relative h-full p-[10px] pb-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[25px] pt-[10px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setAddTask(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />All Tasks</p>
                        <p className="text-md text-black">155</p>
                        
                    </span>
                    <span className="h-full flex flex-row items-center justify-end gap-4">
                        {selectedTask === null ? <p className="text-lg font-semibold">Modifying Selected Task</p> : <p className="text-lg font-semibold">Adding New Task</p> }                        
                    </span>
                </span>


                <div className="w-full flex flex-row items-start justify-between bg-white px-[10px] py-[10px] rounded-[5px] border border-blue-600 gap-[10px] ">
                    {/* left side for inputs */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Task Title</h4>
                            <input type="text" name='taskTitle' className='normal-input' value={task.taskTitle} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Task Description</h4>
                            <input type="text" name='taskDescription' className='normal-input' value={task.taskDescription} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Due Date</h4>
                            <input type="text" name='taskDueDate' className='normal-input' value={task.taskDueDate} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Task Priority</h4>
                            <span className="h-[40px] w-full">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'priority'} dropArray={['High', 'Low']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Assigned To</h4>
                            <input type="text" name='assigendTo' className='normal-input' value={task.assigendTo} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Task Status</h4>
                            <span className="w-full h-[40px] ">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Pending', 'In Progress', 'Completed']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>
                    </div>
                    {/* user role side */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">Additional Details</p>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Comments:</h4>
                                
                            </span>
                            
                    </div>            
                </div>

                <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {selectedTask != null ? <button className=" w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={updateUser} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Save Changes'}
                    </button>
                    :
                    <button className="mt-[10px] w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Add User'}
                    </button>}
                </span>
            </div>
        </div>
    )
}

export default ViewTask


