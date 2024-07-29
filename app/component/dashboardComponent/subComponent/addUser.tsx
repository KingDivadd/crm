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
import { patch_api_auth_request, post_api_auth_request } from '@/app/api/admin_api';

const AddUsers = ({addUsers, setAddUsers, selectedUser, setSelectedUser, number_of_users}:AddUsersProps) => {

    const [auth, setAuth] = useState({last_name: '', first_name: '', email: '', phone_number: '', user_role: '', password: '', active_status: true })
    const [inputError, setInputError] = useState({last_nameError: false, first_nameError: false, emailError: false, phone_numberError: false, user_roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [new_password, setNew_password] = useState('')

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        user_role: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        user_role: 'User Role', status: 'Status'

    })
    

    useEffect(() => {
        if(selectedUser != null){
            const {last_name, first_name, email, phone_number, user_role, status, password} = selectedUser
            setAuth({...auth, last_name: last_name, first_name: first_name, email: email, user_role: user_role, phone_number:phone_number, active_status:status, password: password})
            setDropElements({...dropElements, user_role: user_role })
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
        setAuth({...auth, [title]: dropdown.toLowerCase()})        
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


    async function add_new_user(e:any) {
        e.preventDefault(); // Prevent the default form submission if this is part of a form
    
        if (!auth.last_name || !auth.first_name || !auth.email || !auth.password || !auth.phone_number) {
            setInputError({
                ...inputError,
                last_nameError: auth.last_name === "",
                first_nameError: auth.first_name === "",
                emailError: auth.email === '',
                passwordError: auth.password === '',
                phone_numberError: auth.phone_number === ''
            });
            showAlert('Please fill all required fields.', 'warning');
        } else if (dropElements.user_role === 'User Role') {
            showAlert('Please select User\'s Role', 'warning');
        } else {
            setLoading(true); // Set loading to true when the request starts
            const { active_status, ...new_auth } = auth;
            console.log(new_auth);
    
            try {
                const response = await post_api_auth_request(`user/create-user`, new_auth);
    
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data);
                    showAlert(response.data.msg, "success");
                    setAddUsers(false);
                } else {
                    console.log(response);
                    showAlert(response.response.data.err, "error");
                }
            } catch (error:any) {
                console.error('Network or unexpected error:', error);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
        }
    }
    

    async function update_user(e: any) {
        e.preventDefault(); // Prevent the default form submission if this is part of a form
    
        if (!auth.last_name || !auth.first_name || !auth.phone_number) {
            setInputError({
                ...inputError,
                last_nameError: auth.last_name === "",
                first_nameError: auth.first_name === "",
                emailError: auth.email === '',
                passwordError: auth.password === '',
                phone_numberError: auth.phone_number === ''
            });
            showAlert('Please fill all required fields.', 'warning');
        } else if (dropElements.user_role == 'User Role') {
            showAlert('Please select User\'s Role', 'warning');
        } else {
            setLoading(true); // Set loading to true when the request starts
    
            // If new_password exists, update the auth state with it
            if (new_password) {
                setAuth({ ...auth, password: new_password });
            }
    
            const { active_status, email, ...new_auth } = auth;
            console.log(new_auth);
    
            try {
                const response = await patch_api_auth_request(`user/admin-update-user-data/${selectedUser.user_id}`, new_auth);
    
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data);
                    showAlert(response.data.msg, "success");
                    setTimeout(() => {
                        setAddUsers(false);
                    }, 2000);
                } else {
                    console.log(response);
                    showAlert(response.response.data.err, "error");
                }
            } catch (error) {
                console.error('Network or unexpected error:', error);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
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
                        <p className="text-md text-black">{number_of_users}</p>
                        {/* <span className="w-[150px] flex items-center justify-start gap-3">
                            <p className="text-md text-black">Status:</p>
                            {auth.active_status == true ? <p className="text-md text-lime-600">Active</p> : <p className="text-md text-red-600">Inactive</p>}

                        </span> */}
                    </span>
                    <span className="flex flex-row items-center justify-start gap-4">
                        

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
                                <input type="email" name='email' disabled={selectedUser !== null} className={inputError.emailError ? 'normal-input-error' : 'normal-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Phone</h4>
                                <input type="phone_number" name='phone_number' className={inputError.phone_numberError ? 'normal-input-error' : 'normal-input'} value={auth.phone_number} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <input type="text" name='new_password' className={inputError.passwordError ? 'normal-input-error' : 'normal-input'} value={new_password} onChange={(e)=>{setNew_password(e.target.value); setAuth({...auth, password: e.target.value}) }} />
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
                                    <DropDownBlank handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Admin', 'Sales', 'Operation', 'Designer', 'Customer', 'Technician', 'Finance']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                </span>
                                <h4 className="text-md font-semibold mt-[8px]">Description</h4>
                                {/* now list the basic features of these user_roles */}

                                <div className="w-full flex flex-col items-start justify-start max-h-[300px] overflow-y-auto ">

                                    {dropElements.user_role.toLowerCase() === 'admin' &&  
                                    <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.admin.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'sales' &&  
                                    <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.sales.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'customer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.customer.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'operation' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.operation.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'designer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.designer.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'technician' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.technician.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}
                                    {dropElements.user_role.toLowerCase() === 'finance' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                        {userResponsibilities.finance.map((data, ind)=>{
                                            return (
                                                <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                    <p className="text-md">{ind + 1}.</p>
                                                    <p className="text-md font-light">{data}</p>
                                                </span>
                                            )
                                        })}
                                    </span>}

                                </div>


                            </span>
                            
                        </div>
                    </div>                    
                </div>

                <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {selectedUser != null ? <button className="mt-[10px] w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={update_user} disabled={loading}>
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
