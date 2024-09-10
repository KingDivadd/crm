'use client'
import React, { useState, useEffect } from 'react'
import Alert from '../alert'
import { DropDownBlank } from '../dropDown'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, patch_auth_request, post_auth_request } from '@/app/api/admin_api'
import { userResponsibilities } from '@/constants';
import { useRouter } from 'next/navigation';

interface User_Management_Props {
    selectedUser:any;
    setSelectedUser:(selectedUser:any) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
}

const UserManagementModal = ({ showModal, setShowModal, selectedUser, setSelectedUser, modalFor, setModalFor}: User_Management_Props) => {
    const router = useRouter()
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
        setDropElements({...dropElements, [dropdown]: 'select'});
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
    
            try {
                const response = await post_auth_request(`app/create-user`, new_auth);
    
                if (response.status === 200 || response.status === 201) {
                    showAlert(response.data.msg, "success");
                    setShowModal(false)
                } else {
                    if (response.response.status == 402) {
                        setTimeout(() => {
                            router.push('auth/login')
                        }, 3000)
                    }
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
    
            try {
                const response = await patch_auth_request(`app/update-user-data/${selectedUser.user_id}`, new_auth);

                if (response.status === 200 || response.status === 201) {
                    showAlert(response.data.msg, "success");
                    setTimeout(() => {
                        setShowModal(!showModal)
                    }, 2000);
                } else {
                    if (response.response.status == 402) {
                        setTimeout(() => {
                            router.push('auth/login')
                        }, 3000)
                    }
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

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function delete_user() {
        setLoading(true)
        const response = await delete_auth_request(`app/delete-user/${selectedUser.user_id}`)

        if (response.status == 200 || response.status == 201){
            
            
            showAlert(response.data.msg, "success")
            
            setShowModal(false)
            
            setLoading(false)
          }else{
            if (response.response.status == 402) {
                setTimeout(() => {
                    router.push('auth/login')
                }, 3000)
            }
            showAlert(response.response.data.err, "error")
            
            setLoading(false)
        }
        
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] 2-[20] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen flex items-center justify-center rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[3px]  rounded-[3px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[20px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-md font-mediumfont-medium   ">{auth.last_name} {auth.first_name} </p>
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-md font-mediumfont-normal text-center  ">Are you sure you want to delete 
                                            <strong> {auth.last_name} {auth.first_name}</strong> </p>
                                            
                                        <p className="text-[15.5px]   flex items-center justify-center gap-2 "> <CiWarning size={23} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white rounded-[3px] bg-blue-700 hover:bg-red-600 flex items-center justify-center" onClick={delete_user} disabled={loading}>
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Delete'}

                                            </button>

                                    </div>

                                    <span className="w-full flex items-center justify-center">
                                    </span>

                                </div>}

                                {
                                    modalFor == 'add' &&    
                                    <div className="w-full flex flex-col items-start justify-start relative  ">
                                        <span className="w-1/2 flex items-center justify-end absolute top-0 right-0 2-[20] ">
                                            {alert.message && <Alert message={alert.message} type={alert.type} />}
                                        </span>
                                        <span className="w-full flex flex-row items-start justify-between border-b border-gray-300 h-[40px]">
                                            <p className="text-sm font-medium    ">Add User </p>

                                            <span className="flex items-center justify-end gap-[3px] ">
                                                {auth.user_role && <h4 className="text-[16.5px] flex items-center gap-[3px]">Selected Role: <p className='font-medium'>{auth.user_role}</p></h4>}
                                            </span>
                                        </span>

                                        <div className="w-full mt-[25px] flex flex-row items-start justify-between bg-white  rounded-[3px] gap-[10px] ">
                                            {/* left side for inputs */}
                                            <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                                                <p className="text-[17px] font-medium">User Information</p>
                                                <form action="" className="w-full flex flex-col items-start justify-start gap-4">
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Last Name</h4>
                                                        <input type="text" name='last_name' className={inputError.last_nameError ? 'normal-input-error' : 'normal-input'} value={auth.last_name} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">First Name</h4>
                                                        <input type="text" name='first_name' className={inputError.first_nameError ? 'normal-input-error' : 'normal-input'} value={auth.first_name} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Email</h4>
                                                        <input type="email" name='email' disabled={selectedUser !== null} className={inputError.emailError ? 'normal-input-error' : 'normal-input'} value={auth.email} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Phone</h4>
                                                        <input type="phone_number" name='phone_number' className={inputError.phone_numberError ? 'normal-input-error' : 'normal-input'} value={auth.phone_number} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Password</h4>
                                                        <input type="text" name='new_password' className={inputError.passwordError ? 'normal-input-error' : 'normal-input'} value={new_password} onChange={(e)=>{setNew_password(e.target.value); setAuth({...auth, password: e.target.value}) }} />
                                                    </span>
                                                </form>
                                            </div>
                                            {/* user user_role side */}
                                            <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                                                <p className="text-[17px] font-medium">User Role</p>
                                                <div className="w-full flex flex-col items-start justify-start gap-4">
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Select Role</h4>
                                                        <span className="w-full">
                                                            <DropDownBlank handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Admin', 'Sales', 'Customer', 'Installer', 'Engineering', 'Permit', 'Electrical', 'Accounting']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                        </span>
                                                        <h4 className="text-[15.5px] font-medium mt-[8px]">Description</h4>
                                                        {/* now list the basic features of these user_roles */}
                        
                                                        <div className="w-full flex flex-col items-start justify-start max-h-[327.5px] overflow-y-auto ">
                        
                                                            {dropElements.user_role.toLowerCase() === 'admin' &&  
                                                            <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.admin.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'sales' &&  
                                                            <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.sales.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'customer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.customer.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'operation' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.operation.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'designer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.designer.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'technician' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.technician.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'finance' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.finance.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                        
                                                        </div>
                        
                        
                                                    </span>
                                                    
                                                </div>
                                            </div>                    
                                        </div>

                                        <div className="w-full mt-[10px] flex items-center justify-end">
                                            <button className=" min-w-[150px] px-5 h-[45px] text-white bg-blue-700 rounded-[3px] hover:bg-blue-600 flex items-center justify-center text-[15.5px]" onClick={add_new_user} disabled={loading}>
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

                                {
                                    modalFor == 'edit' &&    
                                    <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                        <span className="w-full flex flex-row items-start justify-between border-b border-gray-300 h-[40px]">
                                            <p className="text-sm font-medium  ">{selectedUser.user_ind}: {selectedUser.first_name} {selectedUser.last_name} </p>

                                            <span className="flex items-center justify-end gap-[3px] ">
                                                {auth.user_role && <h4 className="text-[16.5px] flex items-center gap-[10px] ">Selected Role: <p className='font-medium'>{auth.user_role}</p></h4>}
                                            </span>
                                        </span>
                                        <div className="w-full flex flex-row items-start justify-between bg-white  rounded-[3px] gap-[10px] ">
                                            {/* left side for inputs */}
                                            <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                                                <p className="text-[17px] font-medium">User Information</p>
                                                <form action="" className="w-full flex flex-col items-start justify-start gap-4">
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Last Name</h4>
                                                        <input type="text" name='last_name' className={inputError.last_nameError ? 'normal-input-error' : 'normal-input'} value={auth.last_name} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">First Name</h4>
                                                        <input type="text" name='first_name' className={inputError.first_nameError ? 'normal-input-error' : 'normal-input'} value={auth.first_name} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Email</h4>
                                                        <input type="email" name='email' disabled={selectedUser !== null} className={inputError.emailError ? 'normal-input-error' : 'normal-input'} value={auth.email} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Phone</h4>
                                                        <input type="phone_number" name='phone_number' className={inputError.phone_numberError ? 'normal-input-error' : 'normal-input'} value={auth.phone_number} onChange={handleChange} />
                                                    </span>
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Password</h4>
                                                        <input type="text" name='new_password' className={inputError.passwordError ? 'normal-input-error' : 'normal-input'} value={new_password} onChange={(e)=>{setNew_password(e.target.value); setAuth({...auth, password: e.target.value}) }} />
                                                    </span>
                                                </form>
                                            </div>
                                            {/* user user_role side */}
                                            <div className="w-1/2 flex flex-col items-start justify-start gap-4">
                                                <p className="text-[17px] font-medium">User Role</p>
                                                <div className="w-full flex flex-col items-start justify-start gap-4">
                                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                                        <h4 className="text-[15.5px] font-light">Select Role</h4>
                                                        <span className="w-full">
                                                            <DropDownBlank handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Admin', 'Sales', 'Customer', 'Installer', 'Engineering', 'Permit', 'Electrical', 'Accounting']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                                        </span>
                                                        <h4 className="text-[15.5px] font-medium mt-[8px]">Description</h4>
                                                        {/* now list the basic features of these user_roles */}
                        
                                                        <div className="w-full flex flex-col items-start justify-start max-h-[300px] overflow-y-auto ">
                        
                                                            {dropElements.user_role.toLowerCase() === 'admin' &&  
                                                            <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.admin.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'sales' &&  
                                                            <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.sales.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'customer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.customer.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'operation' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.operation.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'designer' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.designer.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'technician' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.technician.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                                                            {dropElements.user_role.toLowerCase() === 'finance' &&  <span className="w-full max-h- flex flex-col items-start justify-start gap-3 ">
                                                                {userResponsibilities.finance.map((data, ind)=>{
                                                                    return (
                                                                        <span key={ind} className="w-full flex flex-row items-center justify-start gap-3">
                                                                            <p className="text-[15.5px]">{ind + 1}.</p>
                                                                            <p className="text-[15.5px] font-light">{data}</p>
                                                                        </span>
                                                                    )
                                                                })}
                                                            </span>}
                        
                                                        </div>
                        
                        
                                                    </span>
                                                    
                                                </div>
                                            </div>                    
                                        </div>

                                        <div className="w-full flex items-center justify-end">
                                            <button className=" min-w-[150px] px-5 h-[40px] text-white bg-amber-700 rounded-[3px] hover:bg-amber-600 flex items-center justify-center text-[15.5px]" onClick={update_user} disabled={loading}>
                                                {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                ) : 'save changes'}
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

export default UserManagementModal