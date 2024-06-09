'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown from '../../dropDown';
import { AddUsersProps } from '@/types';
import Alert from '../../alert';

const AddUsers = ({addUsers, setAddUsers}:AddUsersProps) => {
    const [auth, setAuth] = useState({lastName: '', firstName: '', email: '', phone: '', role: '', password: ''})
    const [inputError, setInputError] = useState({lastNameError: false, firstNameError: false, emailError: false, phoneError: false, roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        userRole: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        userRole: 'User Role', status: 'Status'

    })

    useEffect(() => {
        if (auth.firstName){setInputError({...inputError, firstNameError: false})}
        if (auth.email){setInputError({...inputError, emailError: false})}
        if (auth.phone){setInputError({...inputError, phoneError: false})}
        if (auth.password){setInputError({...inputError, passwordError: false})}
        if (auth.lastName){setInputError({...inputError, lastNameError: false})}
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
                    setAddUsers(false)
                    triggerAlert('success', 'User Added successfully')
            }, 3000);
        }
    }

    return (
        <div className="w-full relative h-full p-[10px] pb-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer " onClick={()=>{setAddUsers(false)}}  >All Users</p>
                        <p className="text-sm text-black">127</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        
                        <p className="text-lg font-semibold">New User</p>

                    </span>
                </span>

                {/* user table */}

                <div className="w-full flex flex-row items-start justify-between bg-white px-[10px] py-[10px] rounded-[5px] border border-blue-600 gap-[10px] ">
                    {/* left side for inputs */}
                    <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">User Information</p>
                        <form action="" className="w-full flex flex-col items-start justify-start gap-4">
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Last Name</h4>
                                <input type="text" name='lastName' className={inputError.lastNameError ? 'normal-input-error' : 'normal-input'} value={auth.lastName} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">First Name</h4>
                                <input type="text" name='firstName' className={inputError.firstNameError ? 'normal-input-error' : 'normal-input'} value={auth.firstName} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Email</h4>
                                <input type="email" name='email' className={inputError.emailError ? 'normal-input-error' : 'normal-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Phone</h4>
                                <input type="phone" name='phone' className={inputError.phoneError ? 'normal-input-error' : 'normal-input'} value={auth.phone} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <input type="password" name='password' className={inputError.passwordError ? 'normal-input-error' : 'normal-input'} value={auth.password} onChange={handleChange} />
                            </span>
                        </form>
                    </div>
                    {/* user role side */}
                    <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">User Role</p>
                        <div className="w-full flex flex-col items-start justify-start gap-4">
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Select Role</h4>
                                <span className="w-full">
                                    <DropDown handleSelectDropdown={handleSelectDropdown} title={'userRole'} dropArray={['Admin', 'Sales', 'Operation', 'Designer', 'Customer', 'Technician', 'Finance']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                </span>
                                <h4 className="text-md font-semibold mt-[8px]">Description</h4>
                                {/* now list the basic features of these roles */}
                                <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {['Adding and edit user roles', 'Overseeing day to day activities', 'three'].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>
                            </span>
                            
                        </div>
                    </div>                    
                </div>

                <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    <button className="mt-[10px] w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Add User'}
                        </button>
                </span>
            </div>
        </div>
    )
}

export default AddUsers