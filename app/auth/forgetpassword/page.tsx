'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock } from "react-icons/ci";
import Alert from '../../component/alert'

const ForgetPassword = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({email: ''})
    const [inputError, setInputError] = useState({ emailError: false });
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})


    useEffect(() => {
        if (auth.email){setInputError({...inputError, emailError: false})}
    }, [auth])

    function handleChange(e:any){
        setAuth({...auth, email: e.target.value})
    }

    function getOtp(e:any){
        e.preventDefault()
        if (!auth.email){
            setAlert({message: 'Please provide your registered email address', type: 'warning'})
            setInputError({...inputError, emailError: auth.email === ''})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else{
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
            // Handle successful login here
                router.push('/auth/verifyotp')
            }, 3000);
        }

    }

    return (
        <div className="w-full relative h-[100vh] p-[20px] flex items-center justify-center">
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
                <div className="w-[55%] rounded-[20px] h-full flex items-start justify-start">
                    <div className="w-full h-full flex flex-col items-start justify-start gap-10 mt-[60px]">
                        <span className="mx-auto w-auto flex flex-col items-center justify-start gap-5">
                            <h2 className="text-3xl font-semibold text-black">Recover Password</h2>
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '> <CiLock size={25} /> </span>
                            <h4 className="text-lg">Enter your email address</h4>
                        </span>

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Email</h4>
                                <input value={auth.email} onChange={handleChange} type="email" className={inputError.emailError? 'signup-input-error':'signup-input'} />
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={getOtp} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Get Otp'}
                            </button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 
                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/signup') }}>Don't have an account, Signup</p>

                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;
