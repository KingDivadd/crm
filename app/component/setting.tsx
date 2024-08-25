'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretUp } from 'react-icons/fa6'
import { DropDownBlankTransparent } from './dropDown'
import { paymentRoute, timeZone } from '../../constants/index'
import Alert from './alert'
import Image from "next/image";
import ImageUploader from './imageUploader'
import { get_auth_request, patch_auth_request } from '@/app/api/admin_api'

interface Settings_Props {
    user?:any;
}

const SystemSettings = () => {
    const [userProfile, setUserProfile] = useState({first_name: '', last_name: '', other_names: '', phone_number: '', avatar: '', password: '', email: ''})
    const [loading, setLoading] = useState(false)
    const [setting_page, setSetting_page] = useState<Settings_Props | null>(null)
    const [alert, setAlert] = useState({message: '', type: ''})

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
        get_dashboard_data()
    }, [])

    async function get_dashboard_data() {

        try {            
            const response = await get_auth_request(`auth/settings-info`)
            
    
            if (response.status == 200 || response.status == 201){
                
                setSetting_page(response.data)      

                const {first_name, last_name, other_names, phone_number, email } = response.data.user

                setUserProfile({...userProfile, first_name, last_name, phone_number, other_names, email })
    
                console.log( 'sales data 1',response.data);
                
            }else{
                console.log(response);
                
            }
            
        } catch (err:any) {
            
            showAlert('Something went wrong, logout and login again.', "error")
        }
        
    }

    async function updateSettings() {

        try {
            setLoading(true)     
                   
            const response = await patch_auth_request(`auth/update-settings-info`, userProfile)

            if (response.status == 200 || response.status == 201){
                
                showAlert('Settings updated susccessfully', 'success')
                setLoading(false)
                
            }else{
                console.log(response);
                
                setLoading(false)
                
            }
            
        } catch (err:any) {
            setLoading(false)
            
            showAlert('Something went wrong, logout and login again.', "error")
        }
        
    }

    function handleUserProfile(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setUserProfile({...userProfile, [name]:value})
    }
    

    function triggerAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    return (
        <div className="w-full p-[10px] h-full ">
            <div className="w-full h-full relative flex flex-row items-start justify-start gap-3  bg-white p-[10px] rounded-[4px] shadow-md ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
                </span>
                {/* the left side */}
                <div className="overflow-y-auto h-full admin-left-setting-cont">
                    {/* General Settings */}
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold">General Settings</p>
                    
                        {/* User information if it is the admin */}
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-start items-center cursor-pointer hover:text-blue-500"  >
                                <p className="text-lg">User information</p>
                                {/* <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editUserProfile ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span> */}
                            </span>
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <ImageUploader id={'user-image'} title={"User Image"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192427/ugxr954jsbyd1utozwzy.jpg'} image={''} />
                                </span>
                                
                                
                            </div>
                        </div>

                    </div>
                </div>
                {/* the right side */}
                <div className="w-1/2 h-[100%] flex flex-col gap-3 items-start justify-start ">
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold"></p>
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">First Name</h4>
                                    <input type="text" name='first_name' className="normal-input bg-transparent" value={userProfile.first_name} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Last Name</h4>
                                    <input type="text" name='last_name' className="normal-input bg-transparent" value={userProfile.last_name} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Other Name (Optional)</h4>
                                    <input type="text" name='other_names' className="normal-input bg-transparent" value={userProfile.other_names} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Email</h4>
                                    <input type="email" disabled name='email' className="normal-input bg-transparent" value={userProfile.email} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Phone </h4>
                                    <input type="text" name='phone_number' className="normal-input bg-transparent" value={userProfile.phone_number} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Password</h4>
                                    <input type="text" name='password' className="normal-input bg-transparent" value={userProfile.password} onChange={handleUserProfile} />
                                </span>
                            </div>                            
                        </div>
                    </div>

                </div>
                
                <span className="w-full flex justify-end absoute absolute bottom-[10px] right-[10px]">
                    <button className="mt-[10px] px-5 h-[40px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-500 flex items-center justify-center" onClick={updateSettings} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Save Changes'}
                        </button>
                </span>
                
            </div>
        </div>
    )
}

export default SystemSettings