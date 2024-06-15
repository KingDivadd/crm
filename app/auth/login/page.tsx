'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiLock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Alert from "../../component/alert"
import { credentials } from '@/constants';

const Login = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({ email: '', password: '' });
    const [inputError, setInputError] = useState({ emailError: false, passwordError: false });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState({message: '', type: ''})

    useEffect(() => {
        if (auth.email) {setInputError({ ...inputError, emailError: auth.email === "" })}
        if (auth.password) {setInputError({ ...inputError, passwordError: auth.password === "" });}
    }, [auth]);

    function handlePassword() {
        setShowPassword(!showPassword);
    }

    function handleChange(e:any) {
        const name = e.target.name;
        const value = e.target.value;
        setAuth({ ...auth, [name]: value });
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handleSubmit(e:any) {
        e.preventDefault();

        if (!auth.email || !auth.password) {
            showAlert("Please enter all fields", "warning");
            setInputError({ ...inputError, emailError: auth.email === "", passwordError: auth.password === "" });
            return;
        }else {
            setLoading(true); // Set loading to true when the request starts
            console.log(auth);
            
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                showAlert("Login successful", "success"); 
                setAuth({email: '', password: ''})
                router.push('/home')
            // Handle successful login here
            }, 3000);
        }
    }

    return (
        <div className=" relative w-full h-[100vh] p-[20px] flex items-center justify-center">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>
            <div className="w-full flex flex-row items-center justify-between h-full gap-[20px]">
                <div className="relative w-[45%] h-full rounded-[20px] overflow-hidden auth-bg">
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
                            <h2 className="text-3xl font-semibold text-black">Welcome Back.</h2>
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '><CiLock size={25} /></span>
                            <h4 className="text-lg">Sign in</h4>
                        </span>

                        

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Email</h4>
                                <input type="email" name='email' className={inputError.emailError ? 'signup-input-error' : 'signup-input'} value={auth.email} onChange={handleChange} />
                            </span>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <span className="w-full relative bg-red-100 ">
                                    <input type={showPassword ? "text" : "password"} name='password' className={inputError.passwordError ? 'password-input-error' : 'password-input'} value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-blue-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                                    </span>
                                </span>
                            </span>
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Login'}
                            </button>
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
