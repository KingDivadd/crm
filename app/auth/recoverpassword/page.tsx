'use client'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiUnlock } from "react-icons/ci";
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import Alert from '@/app/component/alert';

const RecoverPassword = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({password: '', newPassword: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [inputError, setInputError] = useState({passwordError: false, newPasswordError: false})

    useEffect(() => {
        if (auth.password){setInputError({...inputError, passwordError: false})}
        if (auth.newPassword){setInputError({...inputError, newPasswordError: false})}
    }, [auth])
    
    function handlePassword() {
        if (showPassword){setShowPassword(false)}
        else if (!showPassword){setShowPassword(true)}
    }

    function handleChange(e:any) {
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})
    }

    async function handleSubmit (e:any) {
        e.preventDefault()
        if (!auth.password || !auth.newPassword){
            setAlert({message: 'Please create a new password', type: 'warning'})
            setInputError({...inputError, passwordError: auth.password === '', newPasswordError: auth.newPassword === ''})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
        }else {
            if (auth.password !== auth.newPassword){
                setAlert({message: 'Password do not match', type: 'error'})
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
                    router.push('/auth/login')
                }, 3000);
            }
        }
    }



    return (
        <div className="w-full relative h-[100vh] p-[20px] flex items-center justify-center">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
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
                            <h2 className="text-3xl font-semibold text-black">Reset Password</h2>
                            <span className='text-white bg-amber-600 p-[10px] rounded-[100%] '> <CiUnlock size={25} /> </span>
                            <h4 className="text-lg">Create a new password</h4>
                        </span>

                        <form action="" className='w-[80%] mx-auto flex flex-col gap-[30px]'>
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Password</h4>
                                <span className="w-full relative bg-red-100 ">
                                    <input type={showPassword ? "text" : "password"} name='password' className={inputError.passwordError ?'password-input-error':'password-input'} value={auth.password} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-blue-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>
                            
                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <h4 className="text-md font-light">Re-enter Password</h4>
                                <span className="w-full relative bg-red-100 ">
                                    <input type={showPassword ? "text" : "password"} name='newPassword' className={inputError.newPasswordError ?'password-input-error':'password-input'} value={auth.newPassword} onChange={handleChange} />
                                    <span className='absolute w-[40px] flex items-center justify-center top-[30%] right-0 text-blue-600' onClick={handlePassword} >
                                        {showPassword ? <IoEye size={20} className='cursor-pointer' />: <IoMdEyeOff size={20} className='cursor-pointer' /> }
                                    </span>
                                </span>
                            </span>
                            
                            <button className="mt-[10px] w-full h-[50px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Submit'}
                            </button>
                        </form>

                        <span className="w-[80%] flex flex-row items-center justify-between h-[40px] mx-auto"> 

                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}></p>
                            <p className="text-sm text-blue-400 hover:text-amber-600 hover:underline cursor-pointer mt-[10px]" onClick={() => { router.push('/auth/login') }}>Back to Login</p>
                        
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoverPassword;
