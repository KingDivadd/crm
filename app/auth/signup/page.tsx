'use client'
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';



const Signup = () => {
    const router = useRouter()
    return (
        <div className="w-full h-[100vh] p-[20px] flex items-center jusitify-center ">
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
                                <input type="text" className='signup-input' />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Last Name</h4>
                                <input type="text" className='signup-input' />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Phone</h4>
                                <input type="text" className='signup-input' />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Email</h4>
                                <input type="text" className='signup-input' />
                            </span>
                            <span className="w-full flex flex-col items-start jusitify-start gap-2">
                                <h4 className="text-md ">Password</h4>
                                <input type="password" className='signup-input' />
                            </span>

                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 ">Create Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup