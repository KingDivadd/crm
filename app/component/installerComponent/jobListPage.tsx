'use client'
import React, {useState, useEffect} from 'react'
import {JobListNumber, JobListCustomerName, JobListInstallDates, JobListProjectDetails} from './installerHelpers'
import JobListModal from './jobListModal'
import { HiFilter } from "react-icons/hi";
import { BsFillCaretRightFill } from "react-icons/bs";


const JobListPage = () => {
    const [showFilters, setShowFilters] = useState(true)
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    function viewDetails(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }


    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[20px] pt-[20px] ">

                <p className="text-xl font-semibold">All Job List</p>
                {/* Job List*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full flex flex-row items-center justify-between h-[40px]">
                        <p className="text-xl font-semibold">Job List</p>
                        {showFilters ? 
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex flex-row items-center justify-start gap-1" onClick={()=> setShowFilters(!showFilters)}><HiFilter size={21} />  Filter</p>
                        
                        : 
                        <span className="w-[300px] h-[40px] flex flex-row items-center justify-start gap-3">
                            <span className="w-[35px] h-full flex items-center justify-center cursor-pointer border hover:border-blue-600 hover:text-blue-600 text-gray-600 rounded-[3px]" onClick={()=> setShowFilters(!showFilters)} >
                                <BsFillCaretRightFill size={23} />
                            </span>
                            <input type="text" name="userName" placeholder='Search by name or Job Number' id="" className='normal-input bg-gray-100 ' />
                        </span> }
                        {/* <span className="flex flex-row items-center justify-end gap-3"></span> */}
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Job Number</p>
                            <p className="text-sm font-semibold w-[20%] px-[10px] ">Customer Name </p>
                            <p className="text-sm font-semibold w-[30%] px-[10px] ">Install Dates</p>
                            <p className="text-sm font-semibold w-[30%] px-[10px] ">project Details</p>
                        </span>
                        <div className="w-full customer-notification-cont flex flex-col justify-start items-start overflow-y-auto">
                            <div className="w-full flex flex-col items-start justify-start">
                                {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="job-list-table-list hover:cursor-pointer hover:bg-gray-100" onClick={()=>viewDetails(data)}>
                                            <span className="w-[20%] flex flex-col items-start justify-center">
                                                <JobListNumber />
                                            </span>
                                            <span className="w-[20%] flex flex-col items-start justify-center">
                                                <JobListCustomerName />
                                            </span>
                                            <span className="w-[30%] flex flex-col items-start justify-center">
                                                <JobListInstallDates />
                                            </span>
                                            <span className="w-[30%] flex flex-col items-start justify-center">
                                                <JobListProjectDetails />
                                            </span>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-centereen bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
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
                </div>

            </div>

            {showModal && <JobListModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default JobListPage
