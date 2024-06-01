'use client'
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock } from "react-icons/ci";

const ForgetPassword = () => {
    const router = useRouter();
    return (
        <div className="w-full h-[100vh] p-[20px] flex items-center justify-center">
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
                                <input type="text" className='signup-input' />
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500" onClick={(e)=>{e.preventDefault(); router.push('/auth/verifyotp')}} >Get Otp</button>
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
