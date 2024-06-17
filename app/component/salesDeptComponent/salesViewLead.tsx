'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown, { DropDownBlank } from '../../component/dropDown';
import { AddUsersProps } from '../../../types';
import Alert from '../alert';
import { IoMdArrowBack } from "react-icons/io";
import { userResponsibilities } from '../../../constants';

const ViewLead = ({addUsers, setAddUsers, selectedUser, setSelectedUser}:AddUsersProps) => {

    const [auth, setAuth] = useState({lastName: '', firstName: '', email: '', phone: '', role: '', password: '', activateUser: 'inactive' })
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
        if(selectedUser != null){
            const {lastName, firstName, email, phone, role, status, password} = selectedUser
            setAuth({...auth, lastName: lastName, firstName: firstName, email: email, role: role, phone:phone, activateUser:status, password: password})
            setDropElements({...dropElements, userRole: role })
            console.log('status : ',status)
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
                    setAddUsers(false)
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
                    setAddUsers(false)
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
                        
                        <p className="text-lg text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setAddUsers(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />All Leads</p>
                        <p className="text-md text-black">135</p>
                        
                    </span>
                </span>


                <div className="w-full flex flex-row items-start justify-between bg-white px-[10px] py-[10px] rounded-[5px] border border-blue-600 gap-[10px] ">
                    {/* left side for inputs */}
                    <div className="w-[40%] flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">Basic Details</p>
                        <form action="" className="w-full flex flex-col items-start justify-start gap-4">
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Customer Name:</h4>
                                <h4 className="text-md ">John Doe</h4>
                                
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Phone Number:</h4>
                                <h4 className="text-md">09026030392</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Address:</h4>
                                <h4 className="text-md ">Stateline Street, Akure, Ondo State</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Appoiintment Date:</h4>
                                <h4 className="text-md ">June 14, 2024 10:45 AM</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Designer:</h4>
                                <h4 className="text-md ">Abraham Davinci</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Disposition:</h4>
                                <h4 className="text-md ">Sold</h4>
                            </span>
                            {/* The job number, contract amount, contract date are all dependant on the disposition */}
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Job Number:</h4>
                                <h4 className="text-md ">JOB1001</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Contract Amount:</h4>
                                <h4 className="text-md ">$24,500</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Contract Date:</h4>
                                <h4 className="text-md ">June 10, 2024 11:05 AM</h4>
                            </span>
                            <p className="text-md font-semibold">Approvals</p>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">HOA Approval:</h4>
                                <h4 className="text-md ">Pending</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Engineering Approval:</h4>
                                <h4 className="text-md ">Approved on June 11, 2024</h4>
                            </span>
                        </form>
                    </div>
                    {/* user role side */}
                    <div className="w-[60%] flex flex-col items-start justify-start gap-4">
                        <p className="text-[17px] font-semibold">Additional Details</p>
                        <form action="" className="w-full flex flex-col items-start justify-start gap-4">
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Sales Stage:</h4>
                                <h4 className="text-md ">Negotiation</h4>
                                
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Sales Owner:</h4>
                                <h4 className="text-md">Sarah Johnson</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Sales Note:</h4>
                                <h4 className="text-md ">Customer is interested in additional upgrades, negotiations ongoing.</h4>
                            </span>
                            <p className="text-md font-semibold">Project Specific details</p>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Project Type:</h4>
                                <h4 className="text-md ">Patio Cover Installation</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Project Scope:</h4>
                                <h4 className="text-md ">Install a freestanding lattice patio cover in the backyard.</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Desired Timeline:</h4>
                                <h4 className="text-md ">Completion by end of July 2024.</h4>
                            </span>
                            <p className="text-md font-semibold">Attachments and Documents</p>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Contract Document:</h4>
                                <h4 className="text-md text-blue-600 hover:underline cursor-pointer ">Link to contract document</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Contract Proposal:</h4>
                                <h4 className="text-md text-blue-600 hover:underline cursor-pointer ">Link to contrct proposal</h4>
                            </span>
                            <span className="w-full flex flex-row items-start justify-start gap-3">
                                <h4 className="text-md font-light">Customer Preference:</h4>
                                <h4 className="text-md ">A specific shade of gray for the patio cover.</h4>
                            </span>
                            
                        </form>
                    </div>            
                </div>

                {/* <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {selectedUser != null ? <button className="mt-[10px] w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={updateUser} disabled={loading}>
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
                </span> */}
            </div>
        </div>
    )
}

export default ViewLead


