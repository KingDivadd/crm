'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Alert from '@/app/component/alert';

const ForgetPassword = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [auth, setAuth] = useState({otp: ''})


    function resendOtp() {
        console.log('resending otp')
    }

    function handleChange(e:any) {
        setAuth({...auth, otp: e.target.value})
    }

    async function verifyOtp(e:any) {
        e.preventDefault()
        if (!auth.otp){
            setAlert({message: 'Please enter otp', type: 'error'})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else {
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
            // Handle successful login here
            router.push('/auth/recoverpassword')
            }, 3000);
        }
    }
    return (
        <div className="relative w-full h-[100vh] p-[20px] flex items-center justify-center">
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
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '> {true ? <CiLock size={25} />: <CiUnlock size={25} />} </span>
                            <h4 className="text-lg">A six digit code has been sent to your email</h4>
                        </span>

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">OTP</h4>
                                <span className="w-full h-auto relative">

                                    <input type="text" name='otp' value={auth.otp} onChange={handleChange} className='signup-input' />
                                </span>
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={verifyOtp} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Verify Otp'}
                            </button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 

                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        
                            <p className="text-sm text-blue-400 hover:text-amber-600 cursor-pointer mt-[10px]" onClick={resendOtp}>Resend Otp</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;
