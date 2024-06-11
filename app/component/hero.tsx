'use client'
import Image from "next/image";
import CustomButton from "./custombuttom";
import Link from "next/link";
import { IoIosPeople } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const Hero = () => {
    const router = useRouter()

    function getStarted(){
        router.push('/auth/login')
    }

    return (
        <div className="w-full h-[100vh] bg-white flex flex-row items-start jusitify-center gap-[10px] pt-[20px] pb-[20px] ">
            {/* left side */}
            <div className="w-[45%] h-full flex items-start justify-start pl-[70px] pr-[70px] pt-[20px] ">
                <div className="w-full h-auto flex flex-col justify-start items-start  pb-[30px] ">
                    {/* the icon and logo */}
                    <nav className="w-full flex flex-row items-center justify-start gap-3 h-[50px] ">
                        {/* logo goes here */}
                        <h3 className="font-bold text-2xl ">SBD</h3>
                    </nav>

                    {/* The middle text and button */}
                    <div className="w-full flex flex-col justify-start items-start bg-brown-200 mt-[100px] gap-[30px]  ">
                        <h1 className="font-bold text-4xl w-[85%] " >CRM platform to grow your business</h1>
                        <h4 className="font-light text-sm w-[85%] " >A unique and powerful software suite to transform the way you work. Grow your company even more successfully.</h4>
                        <button className="w-[150px] h-[50px] bg-slate-800 text-slate-200 font-md rounded-[25px] hover:bg-slate-700" onClick={()=>{router.push('/auth/login')}}>Get Started</button>
                    </div>
                    {/* The bottom */}
                    <div className="w-auto h-[140px] flex flex-row items-start justify-start gap-[20px] mt-[90px]">
                        <span className="w-[130px] h-full flex flex-col items-start justify-between ">
                            <span className="w-auto text-blue-600"> <IoIosPeople  size={30}  />  </span>
                            <h1 className="font-bold text-4xl" >20M+</h1>
                            <h4 className="font-light text-sm" >Users Globally</h4>
                        </span>
                        <span className="h-full w-1 border-r border-slate-300"></span>
                        <span className="w-[130px] ml-[30px] h-full flex flex-col items-start justify-between ">
                            <span className="w-auto text-blue-600"> <FaGlobe  size={25}  />  </span>
                            <h1 className="font-bold text-4xl" >30M+</h1>
                            <h4 className="font-light text-sm" >Countries Served</h4>
                        </span>
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className="w-[55%] h-full flex flex-col justify-start items-start bg-slate-800 rounded-l-[20px] pt-[20px] relative">

                <nav className="z-2 w-full flex flex-row items-center justify-between gap-3 h-[50px] pl-[70px] pr-[70px]">
                    {/* logo goes here */}
                    <span className="w- flex flex-row items-center justify-start gap-[40px]">
                        <Link href={'/'} className='text-slate-200 font-sm hover:underline '>Home</Link>
                        <Link href={'#platformfeatures'} className='text-slate-200 font-sm hover:underline '>Features</Link>
                        <Link href={'#reviews'} className='text-slate-200 font-sm hover:underline '>Reviews</Link>
                    </span>
                    <button className="w-[150px] h-[45px] bg-white text-slate-700 font-md rounded-[22.5px] hover:bg-slate-100" onClick={()=>{router.push('/auth/login')}} >Login</button>
                </nav>
                <div className="z-1 h-[70%] w-[110%]  absolute top-[15%] right-0 bg-slate-800 rounded-l-[20px] p-[10px] ">
                    <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                        <Image 
                            src="/crm-dash.jpg" 
                            alt="Authentication" 
                            layout="fill" 
                            objectFit="cover" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
