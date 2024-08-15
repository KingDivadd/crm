'use client'
import React, {useState, useEffect, use} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import Alert from "../../component/alert"
import {  SignupImageUploader } from '@/app/component/imageUploader';
import { IoIosClose } from "react-icons/io";
import { get_auth_request, patch_auth_request, post_request } from '@/app/api/admin_api';




const Signup = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [auth, setAuth] = useState({firstName: '', lastName: '', email: '', phone: '', password: '' })
    const [otpData, setOtpData] = useState({email: '', otp: ''})
    const [auth_setup, setAuth_setup] = useState({company_name: '', company_address: '', company_phone_number: '', company_phone: [] ,organization_size: 0, number_of_admin: 2, company_logo: 'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192409/qbit5t3yzq06kptro4xp.jpg'})
    const [inputError, setInputError] = useState({firstNameError: false, lastNameError: false, emailError: false, phoneError: false, passwordError: false, companyNameError: false, companyAddressError: false, companyPhoneError: false, otpError: false})
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})
    const [page, setPage] = useState('signup')

    useEffect(() => {
      
        let auth_id = localStorage.getItem('x-id-key')
        if (auth_id){
            get_user_auth_status()
        }else{
            setPage('signup')
        }

    }, [])

    async function get_user_auth_status() {

        const response = await get_auth_request('auth/get-auth-status')

        if (response.status == 200 || response.status == 201){
            showAlert(response.data.msg, "success")

            const res = response.data.user

            console.log(res);
            

            if (res.company_id == null){
                setPage('signup')
            }else if (res.company_id !== null && res.is_verified == false ){
                setPage('generate-otp')
            }else if (res.company_id && res.is_verified){
                setPage(`generate-otp`)
            }
            
            return;
        }else{            
            setPage('signup')
            return;
        }
    }
    

    useEffect(() => {
        if (auth.firstName){setInputError({...inputError, firstNameError: false})}
        if (auth.lastName){setInputError({...inputError, lastNameError: false})}
        if (auth.email){setInputError({...inputError, emailError: false})}
        if (auth.phone){setInputError({...inputError, phoneError: false})}
        if (auth.password){setInputError({...inputError, passwordError: false})}
        if (auth_setup.company_name){setInputError({...inputError, companyNameError: false})}
        if (auth_setup.company_address){setInputError({...inputError, companyAddressError: false})}
        if (auth_setup.company_phone){setInputError({...inputError, companyPhoneError: false})}
        if (otpData.otp){setInputError({...inputError, otpError: false})}
    }, [auth, auth_setup])


    

    function handlePassword() {
        if (showPassword){setShowPassword(false)}
        else if (!showPassword){setShowPassword(true)}
    }

    function handleChange (e:any){
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]: value})
    }

    function handleOtpChange (e:any){
        const name = e.target.name
        const value = e.target.value
        setOtpData({...otpData, [name]: value})
    }

    function handleNewChange (e:any){
        const name = e.target.name
        const value = e.target.value
        setAuth_setup({...auth_setup, [name]: value})
    }



    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }
    
    async function generateOtp(e:any){
        
        e.preventDefault()
        if (!otpData.email){
            showAlert("Please fill all fields", "warning")
            setInputError({...inputError, emailError: otpData.email === ""})
        }else {
            setLoading(true);

            const response = await post_request('auth/generate-otp', {email: otpData.email})

            if (response.status == 201){
                showAlert(response.data.msg, "success")

                setOtpData({ email: '', otp: '' })

                setLoading(false)

                setPage('verify-account')
                
                return;
            }else{
                showAlert(response.response.data.err, "error")
                setLoading(false)
                return;
            }
          
        }

        }   
    
    async function verifyAccount(e:any){
        
        
        e.preventDefault()
        if (!otpData.otp){
            showAlert("Please fill all fields", "warning")
            setInputError({...inputError, otpError: otpData.otp === ''})
        }else {
            setLoading(true);

            const response = await post_request('auth/verify-otp', {otp: otpData.otp, email: sessionStorage.getItem('email')})

            if (response.status == 201 || response.status == 200){
                showAlert(response.data.msg, "success")

                setOtpData({ email: '', otp: '' })

                router.push('/auth/login')

                setLoading(false)
                
                return;
            }else{
                showAlert(response.response.data.err, "error")
                setLoading(false)
                return;
            }
          
        }

        }   
    
    async function createAccount(e:any){
        
        
        e.preventDefault()
        if (!auth.firstName || !auth.lastName || !auth.email || !auth.phone || !auth.password){
            showAlert("Please fill all fields", "warning")
            setInputError({...inputError, emailError: auth.email === "", firstNameError: auth.firstName === '', lastNameError: auth.lastName === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
        }else {
            setLoading(true); 
            const response = await post_request('auth/admin-signup', 
                {first_name: auth.firstName, last_name: auth.lastName, email: auth.email, phone_number: auth.phone, password: auth.password})

            if (response.status == 201){
                showAlert(response.data.msg, "success")

                
                localStorage.setItem('x-id-key' ,response.headers.get('x-id-key'));
                sessionStorage.setItem('email', auth.email )
                
                setLoading(false)
                setPage('add-company')
                setAuth({firstName: '', lastName: '', email: '', phone: '', password: '' })
                return;
            }else{
                showAlert(response.response.data.err, "error")
                setLoading(false)
                return;
            }
          
        }

        }   
    

    async function completeSignup(e:any){
        e.preventDefault()
        if (!auth_setup.company_name || !auth_setup.company_address || !auth_setup.company_phone.length ){
            showAlert("Please fill all fields", "warning")
            setInputError({...inputError, companyNameError: auth_setup.company_name == "", companyAddressError: auth_setup.company_address === '', companyPhoneError: auth_setup.company_phone.length === 0})
        }else {

            if (auth_setup.company_phone_number){

            }

            setLoading(true); 

            console.log(auth_setup);

            const payload = {company_name: auth_setup.company_name, company_address: auth_setup.company_address, company_phone: auth_setup.company_phone, 
                organization_size: Number(auth_setup.organization_size), number_of_admin: Number(auth_setup.number_of_admin), company_logo: auth_setup.company_logo
            }

            console.log('here');
            
            const response = await patch_auth_request('auth/complete-admin-setup', 
                payload
            )

            if (response.status == 200 || response.status == 201){
                showAlert(response.data.msg, "success")

                setAuth_setup({company_name: '', company_address: '', company_phone_number: '', company_phone: [] ,organization_size: 0, number_of_admin: 2, company_logo: 'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718192409/qbit5t3yzq06kptro4xp.jpg'})
                
                setLoading(false)

                setPage('verify-account')

                }else{
                    
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
            }
          
            setLoading(false)

        }
        setLoading(false)

    }   
    

    function addNumbers(){
        if (auth_setup.company_phone_number) {
            setAuth_setup((prevAuthSetup:any) => {
                if (!prevAuthSetup.company_phone.includes(prevAuthSetup.company_phone_number)) {
                    return {
                        ...prevAuthSetup,
                        company_phone: [...prevAuthSetup.company_phone, prevAuthSetup.company_phone_number],
                        company_phone_number: '', 
                    };
                }
                return prevAuthSetup;
            });
        }
    }

    function removeNumber(ind: number) {
    
        const new_numbers = [...auth_setup.company_phone];
        new_numbers.splice(ind, 1);
    
        setAuth_setup({ ...auth_setup, company_phone: new_numbers });
    }

    async function resent_otp() {
        
        const response = await get_auth_request('auth/regenerate-otp')

        if (response.status == 201){
            showAlert(response.data.msg, "success")

            return;
        }else{
            showAlert(response.response.data.err, "error")
            return;
        }

    }
    
    const handleImageUpload = (newUrl: string, type: 'logo') => {
        // if (type === 'avatar') {
        //   setUserProfile((prev) => ({ ...prev, avatar: newUrl }));
        // } else if (type === 'logo') {
        //   setCompanyInfo((prev) => ({ ...prev, logo: newUrl }));
        // }
      };

    return (
        <div className="relative w-full h-[100vh] p-[20px] flex items-center jusitify-center  ">
            <span className="w-1/2 flex items-center justify-end absolute top-[25px] right-[25px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            {page == 'signup' && 
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                <div className="relative w-[45%] h-full rounded-[20px] overflow-hidden">
                    <Image 
                        src="/auth2.png" 
                        alt="Authentication" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start " >
                    <div className="w-full h-full flex flex-col items-start justify-center gap-[10px] ">
                        <span className="mx-auto w-auto flex flex-col items-center justify-start gap-2">
                            <h2 className="text-3xl font-semibold text-black">Create Account</h2>
                            <p className="text-sm text-blue-400 cursor-pointer hover:text-amber-600 hover:underline" onClick={()=> {router.push('/auth/login')}} >Already have an account login</p>
                        </span>
                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[15px]'>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">First Name</h4>
                                <input onChange={handleChange} value={auth.firstName} name='firstName' type="text" className={inputError.firstNameError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Last Name</h4>
                                <input onChange={handleChange} value={auth.lastName} name='lastName' type="text" className={inputError.lastNameError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Email</h4>
                                <input onChange={handleChange} value={auth.email} name='email' type="text" className={inputError.emailError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Phone</h4>
                                <input onChange={handleChange} value={auth.phone} name='phone' type="text" className={inputError.phoneError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <span className="w-full relative bg-red-100 ">
                                    <input  type={showPassword ? "text" : "password"} name='password' className={inputError.passwordError ? 'password-input-error':'password-input'} value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-blue-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>

                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={createAccount} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>}

            {page == 'add-company' && 
            <div className="w-full h-full flex flex-col items-center justify-between bg-white border border-blue-600 rounded-[5px] gap-[15px] p-[40px] ">
                <div className="w-full flex flex-row items-start justify-start   ">
                    <span className=" w-auto flex flex-col items-center justify-start gap-2 h-[45px] ">
                        <h2 className="text-2xl font-normal text-blue-500">Company Information</h2>
                    </span>
                </div>
                
                <div className="w-full flex flex-row items-center justify-between h-full gap-[20px] " >
                    <div className="relative w-[45%] h-full  overflow-hidden">
                           
                        <form action="" className='w-full mx-auto flex flex-col gap-[15px]'>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2 " >
                                <h4 className="text-md ">Company Name</h4>
                                <input onChange={handleNewChange} value={auth_setup.company_name} name='company_name' type="text" className={inputError.companyNameError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Company Address</h4>
                                <input onChange={handleNewChange} value={auth_setup.company_address} name='company_address' type="text" className={inputError.companyAddressError ? 'signup-input-error':'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Company Phone Number</h4>
                                <span className="w-full flex items-center justify-start gap-[10px] ">
                                    <span className="h-full w-[90%] ">
                                        <input onChange={handleNewChange} value={auth_setup.company_phone_number} name='company_phone_number' type="text" className={inputError.companyPhoneError ? 'signup-input-error':'signup-input'} />
                                    </span>

                                    <button type="button" onClick={addNumbers} className= 'w-[10%] h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white ' >
                                        Add
                                    </button>

                                </span>
                                
                                <span className="w-full flex items-center justify-start gap-2 overflowx-auto">
                                    {auth_setup.company_phone.map((data, ind)=>{
                                        return(
                                            <span key={ind} className="flex items-center justify-center gap-3 border border-gray-400 rounded-[10px] py-2 px-[10px]">
                                                <p className="text-[15px] font-normal">{data}</p>
                                                <span className='w-[20px] h-full flex items-center justify-center hover:bg-red-500 rounded-[15px] cursor-pointer hover:text-white ' onClick={()=> removeNumber(ind)} ><IoIosClose className='w-full h-full' /> </span>
                                            </span>

                                        )
                                    })}

                                </span>
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Organization size</h4>
                                <input onChange={handleNewChange} value={auth_setup.organization_size} name='organization_size' type="number" className={'signup-input'} />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Number of Admin</h4>
                                <input onChange={handleNewChange} value={auth_setup.number_of_admin} name='number_of_admin' type="number" className={'signup-input'} />
                            </span>


                        </form>
                    </div>

                    <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start  " >
                        <span className="w-full flex flex-col items-start justify-start gap-2 h-[95%]  ">
                            {/* <SignupImageUploader id={'company-logo'} title={"Company Logo"} url={auth_setup.company_logo} onUpload={handleImageUpload} /> */}
                        </span>
                        
                    </div>
                </div>
                <div className="w-full flex flex-row items-center justify-end   ">
                    
                    <button className=" w-[175px] h-[45px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={completeSignup} disabled={loading}>
                                {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Complete Setup'}
                    </button>

                </div>
            </div>
            }

            {page == 'generate-otp' && 
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                <div className="relative w-[45%] h-full rounded-[20px] overflow-hidden">
                    <Image 
                        src="/auth2.png" 
                        alt="Authentication" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start  " >
                    <div className="w-full h-full flex flex-col items-start justify-center gap-[30px]  ">
                        <span className="mx-auto w-[70%] flex flex-col items-center justify-start gap-2">
                            <h2 className="text-3xl font-semibold text-black">Generate OTP</h2>
                            <p className="text-[15px] text-blue-600 text-center ">Enter your email below to generate an otp to validate your account </p>
                        </span>
                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[15px]'>
                            
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Email</h4>
                                <input onChange={handleOtpChange} value={otpData.email} name='email' type="text" className={inputError.emailError ? 'signup-input-error':'signup-input'} />
                            </span>
                            
                            
                            <p className="text-[15px] text-blue-600 cursor-pointer text-center hover:underline " onClick={resent_otp}>Didn't receive otp? Resend. </p>

                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={generateOtp} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Generate Otp'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>}

            {page == 'verify-account' && 
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                <div className="relative w-[45%] h-full rounded-[20px] overflow-hidden">
                    <Image 
                        src="/auth2.png" 
                        alt="Authentication" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start  " >
                    <div className="w-full h-full flex flex-col items-start justify-center gap-[25px]  ">
                        <span className="mx-auto w-[70%] flex flex-col items-center justify-start gap-2">
                            <h2 className="text-3xl font-semibold text-black">Verify Otp</h2>
                            <p className="text-[15px] text-blue-600 text-center ">A six digit uniqe code has been sent to your email, kindly check and provide in the field below </p>
                        </span>
                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[15px]'>
                            
                            
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">OTP</h4>
                                <input onChange={handleOtpChange} value={otpData.otp} name='otp' type="string" className={inputError.phoneError ? 'signup-input-error':'signup-input'} />
                            </span>
                            
                            <p className="text-[15px] text-blue-600 cursor-pointer text-center hover:underline " onClick={resent_otp}>Didn't receive otp? Resend. </p>

                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={verifyAccount} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Verify Otp'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Signup