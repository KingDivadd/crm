'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import Alert from "../../component/alert"



const Signup = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [auth, setAuth] = useState({firstName: '', lastName: '', email: '', phone: '', password: '' })
    const [inputError, setInputError] = useState({firstNameError: false, lastNameError: false, emailError: false, phoneError: false, passwordError: false})
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})

    useEffect(() => {
        if (auth.firstName){setInputError({...inputError, firstNameError: false})}
        if (auth.lastName){setInputError({...inputError, lastNameError: false})}
        if (auth.email){setInputError({...inputError, emailError: false})}
        if (auth.phone){setInputError({...inputError, phoneError: false})}
        if (auth.password){setInputError({...inputError, passwordError: false})}
    }, [auth])

    function handlePassword() {
        if (showPassword){setShowPassword(false)}
        else if (!showPassword){setShowPassword(true)}
    }

    function handleChange (e:any){
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]: value})
    }


    function triggerAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }
    
    async function createAccount(e:any){
        e.preventDefault()
        if (!auth.firstName || !auth.lastName || !auth.email || !auth.phone || !auth.password){
            triggerAlert("Please fill all fields", "warning")
            setInputError({...inputError, emailError: auth.email === "", firstNameError: auth.firstName === '', lastNameError: auth.lastName === '', passwordError: auth.password === '', phoneError: auth.phone === ''})
        }else {
            setLoading(true); 
            console.log(auth);

            setTimeout(() => {
            setLoading(false);
            // Handle successful login here
            router.push('/auth/login')
            }, 3000);
        }   
    }

    return (
        <div className="relative w-full h-[100vh] p-[20px] flex items-center jusitify-center ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
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
                    <div className="w-full h-full flex flex-col items-start justify-start gap-10">
                        <span className="mx-auto w-auto flex flex-col items-center justify-start gap-2">
                            <h2 className="text-3xl font-semibold text-black">Create Account</h2>
                            <p className="text-sm text-blue-400 cursor-pointer hover:text-amber-600 hover:underline" onClick={()=> {router.push('/auth/login')}} >Already have an account login</p>
                        </span>
                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[20px]'>
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
            </div>
        </div>
    )
}

export default Signup