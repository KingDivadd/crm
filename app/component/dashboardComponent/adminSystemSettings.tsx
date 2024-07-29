'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretUp } from 'react-icons/fa6'
import { DropDownBlankTransparent } from '../dropDown'
import { paymentRoute, timeZone } from '@/constants'
import Alert from '../alert'
import Image from "next/image";
import ImageUploader from '../imageUploader'
import { get_api_auth_request, patch_api_auth_request } from '@/app/api/admin_api'
import { IoIosClose } from 'react-icons/io'


const AdminSystemSettings = () => {
    const [editCompanyInfo, setEditCompanyInfo] = useState(true)
    const [editUserProfile, setEditUserProfile] = useState(true)
    const [userProfile, setUserProfile] = useState({first_name: '', last_name: '', user_name: '', phone_number: '', avatar: 'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192427/ugxr954jsbyd1utozwzy.jpg', password: ''})
    const [companyInfo, setCompanyInfo] = useState({name: '', address: '', email: '', phone: '', company_phone: [], number_of_admin: 0, logo: 'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192409/qbit5t3yzq06kptro4xp.jpg'})
    const [paypalInfo, setPaypalInfo] = useState({clientId: '', secretKey: '', mode: '' })
    const [stripeInfo, setStripeInfo] = useState({publishableKey: '', secretKey: '', webhookSecret: '' })
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [image, setImage] = useState('')
    const [new_update, setNew_update] = useState(false)
    const [companyImage, setCompanyImage] = useState('')

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

    useEffect(() => {
      
        get_settings_info()

    }, [new_update])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_settings_info() {      

        const response = await get_api_auth_request('settings/settings-info')

        if (response.status == 200 || response.status == 201){
          
          console.log(response.data);

          const {company_address, company_email, company_logo, company_name, company_phone, number_of_admin, organization_size} = response.data.company

          const {avatar, first_name, last_name, phone_number, other_names } = response.data.user

          setCompanyInfo({...companyInfo, address: company_address, company_phone: company_phone, name: company_name, logo: company_logo, number_of_admin: number_of_admin, email: company_email  })

          setUserProfile({...userProfile, avatar: avatar, first_name: first_name, last_name: last_name, phone_number: phone_number, user_name: other_names})
                    
          showAlert(response.data.msg, "success")
        }else{
          if (response){
              showAlert(response.response.data.err, "error")
          }
        }
        
      
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
        setLoading(true); 
        console.log(' user info ', userProfile, '\n', 'company info ', companyInfo);  // log what was updated here

        try {
            const payload = {last_name: userProfile.last_name, first_name: userProfile.first_name, other_names: userProfile.user_name,
                    avatar: userProfile.avatar, phone_number: userProfile.phone_number, password: userProfile.password,
                company_name: companyInfo.name, company_address: companyInfo.address, company_email: companyInfo.email, 
                number_of_admin: companyInfo.number_of_admin, company_logo: companyInfo.logo, company_phone: companyInfo.company_phone }
        
            const response = await patch_api_auth_request('settings/update-settings-info', payload)
    
            if (response.status == 200 || response.status == 201){

                setNew_update(!new_update)
    
                showAlert(response.data.msg, "success")
                setLoading(false)

            }else{
                showAlert(response.response.data.err, "error")
                setLoading(false)
            }
        } catch (err:any) {
            console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); 
            }  
        
    }
    

    function addNumbers(){
        if (companyInfo.phone) {
            
            setCompanyInfo((prevAuthSetup:any) => {
                if (!prevAuthSetup.company_phone.includes(prevAuthSetup.phone)) {
                    return {
                        ...prevAuthSetup,
                        company_phone: [...prevAuthSetup.company_phone, prevAuthSetup.phone],
                        phone: '', 
                    };
                }
                return prevAuthSetup;
            });
        }
    }

    function removeNumber(ind: number) {
    
        const new_numbers = [...companyInfo.company_phone];
        new_numbers.splice(ind, 1);
    
        setCompanyInfo({ ...companyInfo, company_phone: new_numbers });
    }

    useEffect(()=>{


        setUserProfile({...userProfile, avatar: image})

    }, [image])



    return (
        <div className="w-full p-[10px] ">
            <div className="w-full relative flex flex-row items-start justify-start gap-3  ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
                </span>
                {/* the left side */}
                <div className="w-1/2 h-[100%] flex flex-col gap-3 items-start justify-start ">
                    {/* General Settings */}
                    <div className="w-full flex flex-col items-start justify-start gap-5  settings-cont ">
                        <p className="text-lg font-semibold">General Settings</p>
                        {/* company information */}
                        <div className="w-full flex flex-col justify-start items-start gap-3  ">
                            <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  onClick={()=>{setEditCompanyInfo(!editCompanyInfo)}} >
                                <p className="text-lg">Company information</p>
                                <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editCompanyInfo ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span>
                            </span>
                            {editCompanyInfo && 
                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <ImageUploader id={'company-logo'} title={"Company Logo"} url={companyInfo.logo} image={image} />
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
                                <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Company Phone Number</h4>
                                
                                <span className="w-full flex items-center justify-start gap-[10px] ">
                                    <span className="h-full w-[90%] ">
                                        <input onChange={handleCompanyInfo} value={companyInfo.phone} name='phone' type="text" className="normal-input bg-transparent" />
                                    </span>

                                    <button type="button" onClick={addNumbers} className= 'w-[10%] h-[40px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white ' >
                                        Add
                                    </button>

                                </span>
                                
                                <span className="w-full flex items-center justify-start gap-2 overflowx-auto">
                                    {companyInfo.company_phone.map((data, ind)=>{
                                        return(
                                            <span key={ind} className="flex items-center justify-center gap-3 border border-gray-400 rounded-[10px] py-2 px-[10px]">
                                                <p className="text-[15px] font-normal">{data}</p>
                                                <span className='w-[20px] h-full flex items-center justify-center hover:bg-red-500 rounded-[15px] cursor-pointer hover:text-white ' onClick={()=> removeNumber(ind)} ><IoIosClose className='w-full h-full' /> </span>
                                            </span>

                                        )
                                    })}

                                </span>
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
                                    <input onChange={handleCompanyInfo} value={companyInfo.number_of_admin} name='number_of_admin' type="text" className="normal-input bg-transparent" />
                                </span>
                                
                            </div>
                        </div>
                        

                    </div>
                </div>
                {/* the right side */}
                <div className="w-1/2 h-[100%] flex flex-col gap-3 items-start justify-start  ">
                    <div className="w-full flex flex-col items-start justify-start gap-5 settings-cont ">
                    <p className="text-lg font-semibold text-white ">.</p>
                        <div className="w-full flex flex-col justify-start items-start gap-3">


                            
                            {/* <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  >
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
                                
                                
                            </div> */}

                            <div className="w-full flex flex-col justify-start items-start gap-3">
                                <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  onClick={()=>{setEditUserProfile(!editUserProfile)}} >
                                    <p className="text-lg">User information</p>
                                    <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editUserProfile ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span>
                                </span>
                                {editUserProfile && 
                                <div className="w-full flex flex-col justify-start items-start gap-3">
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <ImageUploader id={'user-image'} title={"User Image"} url={userProfile.avatar} image={image} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">First Name</h4>
                                        <input type="text" name='first_name' className="normal-input bg-transparent" value={userProfile.first_name} onChange={handleUserProfile} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Last Name</h4>
                                        <input type="text" name='last_name' className="normal-input bg-transparent" value={userProfile.last_name} onChange={handleUserProfile} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">User_name (Optional)</h4>
                                        <input type="text" name='user_name' className="normal-input bg-transparent" value={userProfile.user_name} onChange={handleUserProfile} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Phone</h4>
                                        <input type="text" name='phone_number' className="normal-input bg-transparent" value={userProfile.phone_number} onChange={handleUserProfile} />
                                    </span>
                                    <span className="w-full flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-md font-light">Password</h4>
                                        <input type="text" name='password' className="normal-input bg-transparent" value={userProfile.password} onChange={handleUserProfile} />
                                    </span>
                                    
                                    
                                </div>}
                            </div>

                            
                        </div>
                    </div>

                </div>
                <span className="flex justify-end absoute absolute bottom-[10px] right-0">
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