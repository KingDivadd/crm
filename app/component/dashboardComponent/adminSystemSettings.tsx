'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretUp } from 'react-icons/fa6'
import { DropDownBlankTransparent } from '../dropDown'
import { paymentRoute, timeZone } from '@/constants'

const AdminSystemSettings = () => {
    const [editCompanyInfo, setEditCompanyInfo] = useState(true)
    const [companyInfo, setCompanyInfo] = useState({name: '', address: '', email: '', phone: '', logo: ''})
    const [paypalInfo, setPaypalInfo] = useState({clientId: '', secretKey: '', mode: '' })
    const [stripeInfo, setStripeInfo] = useState({publishableKey: '', secretKey: '', webhookSecret: '' })
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

    return (
        <div className="w-full p-[10px] ">
            <div className="w-full flex flex-row items-start justify-start gap-3 ">
                {/* the left side */}
                <div className="overflow-y-auto admin-left-setting-cont">
                    {/* General Settings */}
                    <div className="w-full flex flex-col items-start justify-start gap-5">
                        <p className="text-lg font-semibold">General Settings</p>
                        <div className="w-full flex flex-col justify-start items-start gap-3">
                            <span className="w-full h-[35px] flex justify-between items-center cursor-pointer hover:text-blue-500"  onClick={()=>{setEditCompanyInfo(!editCompanyInfo)}} >
                                <p className="text-lg">Company information</p>
                                <span className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center "> {editCompanyInfo ? <FaCaretUp size={20} /> : <FaCaretDown size={20}  />} </span>
                            </span>
                            {editCompanyInfo && 
                            <div className="w-full flex flex-col justify-start items-start gap-3">
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
                    </div>
                </div>
                {/* the right side */}
                <div className="w-1/2 h-full flex flex-col gap-3 items-start justify-start">
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
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AdminSystemSettings