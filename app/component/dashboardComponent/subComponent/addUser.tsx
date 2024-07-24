'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown, { DropDownBlank } from '../../dropDown';
import { AddUsersProps } from '@/types';
import Alert from '../../alert';
import { userResponsibilities } from '@/constants';
import { IoMdArrowBack } from "react-icons/io";
import { post_api_auth_request } from '@/app/api/admin_api';

const AddUsers = ({addUsers, setAddUsers, selectedUser, setSelectedUser}:AddUsersProps) => {

    const [auth, setAuth] = useState({last_name: '', first_name: '', email: '', phone_number: '', user_role: '', password: '', active_status: true })
    const [inputError, setInputError] = useState({last_nameError: false, first_nameError: false, emailError: false, phone_numberError: false, user_roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        userRole: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        userRole: 'User Role', status: 'Status'

    })

    useEffect(() => {
        if(selectedUser != null){
            const {last_name, first_name, email, phone_number, user_role, status, password} = selectedUser
            setAuth({...auth, last_name: last_name, first_name: first_name, email: email, user_role: user_role, phone_number:phone_number, active_status:status, password: password})
            setDropElements({...dropElements, userRole: user_role })
            console.log('status : ',status)
        }
    }, [])



    useEffect(() => {
        if (auth.last_name){setInputError({...inputError, last_nameError: auth.last_name === ''})}
        if (auth.first_name){setInputError({...inputError, first_nameError: auth.first_name === ''})}
        if (auth.email){setInputError({...inputError, emailError: auth.email === ''})}
        if (auth.phone_number){setInputError({...inputError, phone_numberError: auth.phone_number === ''})}
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

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function add_new_user(e:any){
        if(!auth.last_name || !auth.first_name || !auth.email || !auth.password || !auth.phone_number){
            setInputError({...inputError, last_nameError: auth.last_name === "", first_nameError: auth.first_name === "", emailError: auth.email === '', passwordError: auth.password === '', phone_numberError: auth.phone_number === ''})
            showAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);

            const response = await post_api_auth_request(`user/create-user`, {})            

            if (response.status == 200 || response.status == 201){
                
                console.log(response.data);
                
                showAlert(response.data.msg, "success")
                setAddUsers(false)
            }else{
                console.log(response);
                
                showAlert(response.response.data.err, "error")
            }
            
            // Simulate a login request with a timeout
        }
    }

    async function updateUser(e:any){
        if(!auth.last_name || !auth.first_name || !auth.email || !auth.password || !auth.phone_number){
            setInputError({...inputError, last_nameError: auth.last_name === "", first_nameError: auth.first_name === "", emailError: auth.email === '', passwordError: auth.password === '', phone_numberError: auth.phone_number === ''})
            showAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setAddUsers(false)
                    showAlert('success', 'User Added successfully')
                    setAuth({last_name: '', first_name: '', email: '', phone_number: '', user_role: '', password: '', active_status: false })
            }, 3000);
        }
    }

    return (
        <div className="w-full relative h-full p-[10px] pb-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[20px] ">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setAddUsers(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />All Users</p>
                        <p className="text-md text-black">127</p>
                        <span className="w-[150px] flex items-center justify-start gap-3">
                            <p className="text-md text-black">Status:</p>
                            {auth.active_status === true ? <p className="text-md text-lime-600">Active</p> : <p className="text-md text-red-600">Inactive</p>}

                        </span>
                    </span>
                    <span className="flex flex-row items-center justify-start gap-4">
                        
                        {auth.active_status != false ? 
                        <p className="text-md text-blue-500" onClick={()=>{setAuth({...auth, active_status: true})}}>Activate User</p>
                            :
                        <p className="text-md text-red-500" onClick={()=>{setAuth({...auth, active_status: false})}}>Inactivate User</p>
                        }

                        <p className="text-lg font-semibold">{selectedUser? "Modifying user data": "New User"}</p>
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
                                <input type="text" name='last_name' className={inputError.last_nameError ? 'normal-input-error' : 'normal-input'} value={auth.last_name} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">First Name</h4>
                                <input type="text" name='first_name' className={inputError.first_nameError ? 'normal-input-error' : 'normal-input'} value={auth.first_name} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Email</h4>
                                <input type="email" name='email' className={inputError.emailError ? 'normal-input-error' : 'normal-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Phone</h4>
                                <input type="phone_number" name='phone_number' className={inputError.phone_numberError ? 'normal-input-error' : 'normal-input'} value={auth.phone_number} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <input type="text" name='password' className={inputError.passwordError ? 'normal-input-error' : 'normal-input'} value={auth.password} onChange={handleChange} />
                            </span>
                        </form>
                    </div>
                    {/* user user_role side */}
                    <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">User Role</p>
                        <div className="w-full flex flex-col items-start justify-start gap-4">
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Select Role</h4>
                                <span className="w-full">
                                    <DropDownBlank handleSelectDropdown={handleSelectDropdown} title={'userRole'} dropArray={['Admin', 'Sales', 'Operation', 'Designer', 'Customer', 'Technician', 'Finance']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                </span>
                                <h4 className="text-md font-semibold mt-[8px]">Description</h4>
                                {/* now list the basic features of these user_roles */}

                                {dropElements.userRole.toLowerCase() === 'admin' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.admin.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'sales' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.sales.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'customer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.customer.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'operation' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.operation.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'designer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.designer.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'technician' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.technician.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                                {dropElements.userRole.toLowerCase() === 'finance' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                    {userResponsibilities.finance.map((data, ind)=>{
                                        return (
                                            <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                <p className="text-md">{ind + 1}.</p>
                                                <p className="text-md font-light">{data}</p>
                                            </span>
                                        )
                                    })}
                                </span>}
                            </span>
                            
                        </div>
                    </div>                    
                </div>

                <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {selectedUser != null ? <button className="mt-[10px] w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={updateUser} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Save Changes'}
                    </button>
                    :
                    <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={add_new_user} disabled={loading}>
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

export default AddUsers
