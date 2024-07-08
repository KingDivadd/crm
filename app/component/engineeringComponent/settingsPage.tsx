'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretUp } from 'react-icons/fa6'
import { DropDownBlankTransparent } from '../dropDown'
import { paymentRoute, timeZone } from '../../../constants/index'
import Alert from '../alert'
import Image from "next/image";
import ImageUploader from '../imageUploader'


const SettingsPage = () => {
    const [editCompanyInfo, setEditCompanyInfo] = useState(true)
    const [editUserProfile, setEditUserProfile] = useState(true)
    const [userProfile, setUserProfile] = useState({firstName: '', lastName: '', userName: '', phone: '', avatar: '', password: ''})
    const [companyInfo, setCompanyInfo] = useState({name: '', address: '', email: '', phone: '', logo: ''})
    const [paypalInfo, setPaypalInfo] = useState({clientId: '', secretKey: '', mode: '' })
    const [stripeInfo, setStripeInfo] = useState({publishableKey: '', secretKey: '', webhookSecret: '' })
    const [adminNumber, setAdminNumber] = useState(2)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        timeZone: false, paymentRoute: false, paypalMode: false
    });
    const [dropElements, setDropElements] = useState({
        timeZone: 'Time Zone', paymentRoute: 'Stripe', paypalMode: 'Sandbox'

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

    function handleCompanyInfo(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setCompanyInfo({...companyInfo, [name]:value})
    }

    function handleUserProfile(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setUserProfile({...userProfile, [name]:value})
    }
    
    function handlePayPalIntegration(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setPaypalInfo({...paypalInfo, [name]:value})
    }

    function handleStripeIntegration(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setStripeInfo({...stripeInfo, [name]:value})
    }

    function triggerAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function updateSettings(){
        if(false){

        }else {
            setLoading(true); 
            console.log();  // log what was updated here

            setTimeout(() => {
            setLoading(false);
                triggerAlert("Setting updated successfully", "success")
            // Handle successful login here
            }, 3000);
        }
    }

    return (
        <div className="w-full p-[10px] ">
            <div className="w-full relative flex flex-row items-start justify-start gap-3 pt-[20px] ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
                </span>
                {/* the left side */}
                <div className="overflow-y-auto admin-left-setting-cont">
                    {/* General Settings */}
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold">General Settings</p>
                    
                        {/* User information if it is the admin */}
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-start items-center cursor-pointer hover:text-blue-500"  >
                                <p className="text-lg">User information</p>
                                {/* <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editUserProfile ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span> */}
                            </span>
                            {editUserProfile && 
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <ImageUploader id={'user-image'} title={"User Image"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192427/ugxr954jsbyd1utozwzy.jpg'} />
                                </span>
                            </div>}
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
                                    <input type="text" name='firstName' className="normal-input bg-transparent" value={userProfile.firstName} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Last Name</h4>
                                    <input type="text" name='lastName' className="normal-input bg-transparent" value={userProfile.lastName} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Username (Optional)</h4>
                                    <input type="text" name='userName' className="normal-input bg-transparent" value={userProfile.userName} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Phone</h4>
                                    <input type="text" name='phone' className="normal-input bg-transparent" value={userProfile.phone} onChange={handleUserProfile} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Password</h4>
                                    <input type="text" name='password' className="normal-input bg-transparent" value={userProfile.password} onChange={handleUserProfile} />
                                </span>
                            </div>                            
                        </div>
                    </div>

                </div>
                <span className="w-full flex justify-end absoute absolute bottom-[30px] right-0">
                    <button className="mt-[10px] w-[170px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={updateSettings} disabled={loading}>
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

export default SettingsPage