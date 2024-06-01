import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = () => {
    return (
        <footer className='flex m-auto flex-col text-black-100  mt-5 border-t border-gray-200 '>
            
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10 ">
                <div className="flex flex-col justify-start items-start gap-6 ">
                <Link href={'/'} className='flex justify-center items-center'>
                    <p className='text-blue-500 font-bold text-[20px]'>SB</p><p className='text-black font-bold text-[20px]'>D</p>
                    {/* <Image src={'/logo.svg'} alt='logo' width={118} height={18} className='object-contain'></Image> */}
                </Link>                </div>
                <div className="flex-1 w-full flex flex-row md:justify-end flex-wrap max-md:mt-10 gap-20">
                    {footerLinks.map((link, ind)=>{
                        return(
                            <div key={ind} className="flex flex-col gap-6 text-base min-w-[170px]">
                                <h3 className='font-bold'>{link.title}</h3>
                                {link.links.map((item, ind)=>{
                                    return(
                                        <Link key={ind} href={item.url} className='text-gray-500' >{item.title}</Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-between items-center mt-10 border-t border-gray-200 sm:px-16 px-6 py-10">
                <p>@2024 SBD. All Rights Reserved</p>
                <div className='flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10'>
                    <Link href={'/'} className='text-gray-500'>Privacy Policy</Link>
                    <Link href={'/'} className='text-gray-500'>Term of Use</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer