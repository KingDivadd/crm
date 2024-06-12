'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretUp } from 'react-icons/fa6'
import { DropDownBlankTransparent } from '../dropDown'
import { paymentRoute, timeZone } from '@/constants'
import Alert from '../alert'
import Image from "next/image";
import ImageUploader from '../imageUploader'


const AdminSystemSettings = () => {
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
            <div className="w-full relative flex flex-row items-start justify-start gap-3  ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
                </span>
                {/* the left side */}
                <div className="overflow-y-auto admin-left-setting-cont">
                    {/* General Settings */}
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold">General Settings</p>
                        {/* company information */}
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  onClick={()=>{setEditCompanyInfo(!editCompanyInfo)}} >
                                <p className="text-lg">Company information</p>
                                <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editCompanyInfo ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span>
                            </span>
                            {editCompanyInfo && 
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <ImageUploader id={'company-logo'} title={"Company Logo"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192409/qbit5t3yzq06kptro4xp.jpg'} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Company Name</h4>
                                    <input type="text" name='name' className="normal-input bg-transparent" value={companyInfo.name} onChange={handleCompanyInfo} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Company Address</h4>
                                    <input type="text" name='address' className="normal-input bg-transparent" value={companyInfo.address} onChange={handleCompanyInfo} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Company Email</h4>
                                    <input type="email" name='email' className="normal-input bg-transparent" value={companyInfo.email} onChange={handleCompanyInfo} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Company Phone</h4>
                                    <input type="text" name='phone' className="normal-input bg-transparent" value={companyInfo.phone} onChange={handleCompanyInfo} />
                                </span>
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Select Time Zone</h4>
                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'timeZone'} dropArray={timeZone} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                </span>
                                
                            </div>}
                        </div>
                        {/* User information if it is the admin */}
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  onClick={()=>{setEditUserProfile(!editUserProfile)}} >
                                <p className="text-lg">User information</p>
                                <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editUserProfile ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span>
                            </span>
                            {editUserProfile && 
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <ImageUploader id={'user-image'} title={"User Image"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192427/ugxr954jsbyd1utozwzy.jpg'} />
                                </span>
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
                                
                                
                            </div>}
                        </div>

                    </div>
                </div>
                {/* the right side */}
                <div className="w-1/2 h-[100%] flex flex-col gap-3 items-start justify-start ">
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold"></p>
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  >
                                <p className="text-lg">Payment Integration Setting</p>
                            </span>
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-md font-light">Select Payment Route</h4>
                                    <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'paymentRoute'} dropArray={['PayPal', 'Stripe']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  />
                                </span>
                                {dropElements.paymentRoute === "PayPal" && <div className="w-full flex flex-col justify-start items-start gap-3">
                                    <p className="text-md font-semibold pt-[15px] pb-[5px] ">PayPal Integration</p>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">PayPal Client ID</h4>
                                        <input type="text" name='clientId' className="normal-input bg-transparent" value={paypalInfo.clientId} onChange={handlePayPalIntegration} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">PayPal Secret Key</h4>
                                        <input type="text" name='secretKey' className="normal-input bg-transparent" value={paypalInfo.secretKey} onChange={handlePayPalIntegration} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">PayPal Mode</h4>
                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'paypalMode'} dropArray={['Live', 'Sandbox']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                    </span>
                                    
                                </div>}

                                {dropElements.paymentRoute === "Stripe" && <div className="w-full flex flex-col justify-start items-start gap-3">
                                    <p className="text-md font-semibold pt-[15px] pb-[5px] ">Stripe Integration</p>

                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Stripe Publishable Key</h4>
                                        <input type="text" name='publishableKey' className="normal-input bg-transparent" value={stripeInfo.publishableKey} onChange={handlePayPalIntegration} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Stripe Secret Key</h4>
                                        <input type="text" name='secretKey' className="normal-input bg-transparent" value={stripeInfo.secretKey} onChange={handlePayPalIntegration} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Webhook Secret</h4>
                                        <input type="text" name='webhookSecret' className="normal-input bg-transparent" value={stripeInfo.webhookSecret} onChange={handlePayPalIntegration} />
                                    </span>
                                    
                                    
                                </div>}
                                
                                
                            </div>
                            {/* NO of admins */}
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full h-[35px] flex justify-start items-center " >
                                    <p className="text-lg">Set Number of Admin</p>
                                </span>
                                <p className="text-md">Select the number of admin allowed for the app.</p>
                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Current number of Admin</h4>
                                        <input type="number" name='name' className="normal-input bg-transparent" value={adminNumber} onChange={(e:any)=> setAdminNumber(e.target.value)} />
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <span className="w-full flex justify-end absoute absolute bottom-[10px] right-0">
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

export default AdminSystemSettings