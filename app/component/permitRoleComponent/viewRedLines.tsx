'use client'
import React, { useState, useEffect } from 'react'
import Alert from '../alert'
import Image from 'next/image'
import { RedlineProps } from '@/types'
import ImageUploader, { ViewImage } from '../imageUploader'
import { MdOutlineCancel } from "react-icons/md";

const VeiwRedLinesModal = ({ setShowRedlineModal, showRedlineModal, show, setShow }: RedlineProps) => {
    const [forward, setForward] = useState({pm: false, engineering: false })
    const [showImage, setShowImage] = useState(true)
    const [imgUrl, setImgUrl] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ message: '', type: '' })
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false,
    });
    const [dropElements, setDropElements] = useState({
        status: 'Select Project',
    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({ ...dropElements, [dropdown]: 'SELECT' });
    };

    const handleSelectDropdown = (dropdown: any, title: any) => {
        setDropElements({ ...dropElements, [title]: dropdown }); setDropMenus({ ...dropMenus, [title]: false })
    }

    

    function triggerAlert(message: string, type: string) {
        setAlert({ message: message, type: type })
        setTimeout(() => {
            setAlert({ message: '', type: '' })
            setShow(false)
        }, 2000);
    }

    function handleSubmit() {
        if (false) {

        } else {
            setLoading(true); // Set loading to true when the request starts

            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                triggerAlert('Redline Documents Forwarded Successfully', "success")
                handleCloseModal()
            }, 2000);
        }
    }

    function handleCloseModal() {
        setShowRedlineModal(false)  
    }

    function handleShowImage(url:string) {
        setImgUrl(url)
        setShowImage(true)
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen pt-[20px] rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>
                    <div className={showImage ? "h-auto w-[75vw] mx-auto shadow-xl flex items-start ": "h-auto w-[40vw] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full h-[570px] flex justify-start items-start p-[20px] gap-[20px] ">
                                <div className="w-[40vw] flex flex-col items-start justify-start gap-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                        <p className="text-lg font-semibold  text-blue-600 ">View Red Lines</p>
                                    </span>


                                    <div className="w-full h-full flex flex-col items-start justify-start gap-[10px] ">

                                        <p className="text-md font-semibold">Redline Documents</p>

                                        <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px]  ">
                                            <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                                <p className="text-sm font-semibold w-[40%] px-2 ">Document Name</p>
                                                <p className="text-sm font-semibold w-[60%] px-2 ">Action</p>
                                            </span>
                                            <div className="w-full  h-[200px] flex flex-col justify-start items-start">
                                                {[1,2,3,4,5].map((data, ind)=>{
                                                    return (
                                                        <span key={ind} className="recent-activity-table-list" >
                                                            <p className="text-sm w-[40%] px-2 ">RedLine Doc {ind+1}</p>
                                                            <p className="text-sm w-[60%] px-2 hover:underline cursor-pointer " onClick={()=>handleShowImage('')} >view</p>
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                            <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-y-2  border-gray-200 px-[15px] rounded-b-[5px] ">
                                                <span className="flex flex-row items-center justify-start gap-3 h-full">
                                                    <p className="text-sm cursor-pointer">Prev</p>
                                                    <span className="w-auto h-full flex flex-row items-center justify-start">
                                                        <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>
                                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">2</p>
                                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">3</p>
                                                        <p className="text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">4</p>

                                                    </span>
                                                    <p className="text-sm cursor-pointer">Next</p>
                                                </span>
                                                <span className="flex flex-row items-center justify-end gap-3 h-full">
                                                    <p className="text-sm">Showing 1-5 of 60</p>
                                                </span>
                                            </span>
                                        </div>

                                        <span className="w-full flex flex-row items-start justify-start border-b border-gray-300 h-[40px]">
                                            <p className="text-lg font-semibold  ">Forwarding Options</p>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-start justify-start gap-[10px] ">
                                            <span className="w-full flex items-center justify-start gap-[10px]  ">
                                                <input type="checkbox" name="pm" id="pm" onChange={(e:any)=> {setForward({...forward, pm: e.target.checked})}} checked={forward.pm} className='w-[20px] flex h-[20px] items-center justify-center text-slate-500 text-sm border border-slate-500 px-2 bg-slate-100 focus:bg-gray-200 focus:outline-none rounded-[3px]' />
                                                <label htmlFor="pm" className='text-sm cursor-pointer ' >Forward to PM</label>
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px]  ">
                                                <input type="checkbox" name="engineering" id="engineering" onChange={(e:any)=> {setForward({...forward, engineering: e.target.checked})}} checked={forward.engineering} className='w-[20px] flex h-[20px] items-center justify-center text-slate-500 text-sm border border-slate-500 px-2 bg-slate-100 focus:bg-gray-200 focus:outline-none rounded-[3px]' />
                                                <label htmlFor="engineering" className='text-sm cursor-pointer ' >Forward to Engineering</label>
                                            </span>

                                        </span>

                                    </div>

                                    <span className="w-full flex items-center justify-end">
                                        <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Forward'}

                                        </button>
                                    </span>

                                </div>
                                {/* where the image will be shown */}
                                {showImage && <div className="w-[35vw]  h-full flex flex-col items-end justify-between gap-[10px] ">
                                    <span className="w-full flex items-center justify-end">
                                        <MdOutlineCancel size={22} className='cursor-pointer hover:text-red-500 ' onClick={()=> {setShowImage(false); setImgUrl('')}} />
                                    </span>

                                    <span className="flex items-center justify-center w-full h-[95%] rounded-[5px] ">
                                        <ViewImage id={'user-image'} title={"User Image"} url={'https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg'} />
                                    </span>
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VeiwRedLinesModal