'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({email: '', password: ''})
    const [showPassword, setShowPassword] = useState(false)
    
    function handlePassword() {
        if (showPassword){setShowPassword(false)}
        else if (!showPassword){setShowPassword(true)}
    }
    
    function handleChange(e:any) {
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})
    }

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
                            <h2 className="text-3xl font-semibold text-black">Welcome Back</h2>
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '> <CiLock size={25} /> </span>
                            <h4 className="text-lg">Sign in</h4>
                        </span>

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Email</h4>
                                <input type="email" name='email' className='signup-input' value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <span className="w-full relative bg-red-100 ">
                                    <input type={showPassword ? "text" : "password"} name='password' className='password-input' value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-blue-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500">Login</button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 
                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/signup') }}>Don't have an account, Signup</p>

                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/forgetpassword') }}>Forget Password</p>
                        
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
