'use client'
import React, {useState, useEffect} from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { HiFilter } from 'react-icons/hi'
// import CreateTicketModal from './createTicketModal'
import ServiceTicketModal from './serviceTicketModal'

const ServiceTicketPage = () => {
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
    
    function createTicket(){
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }

    return (
        <div className="w-full flex p-[10px] ">
            <div className="w-full h-full flex flex-col gap-[25px] pt-[20px] ">
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/4 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Tickets</p>
                            <p className="text-sm text-blue-600">5</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-sky-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600">Open Tickets</p>
                            <p className="text-sm text-sky-600">2</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-700 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-700">Closed Tickets</p>
                            <p className="text-sm text-lime-700">2</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-700 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-700">In Progress Tickets</p>
                            <p className="text-sm text-amber-700">1</p>
                        </div>
                    </span>                    
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full flex flex-row items-center justify-between h-[40px]">
                            <p className="text-xl font-semibold">Service Tickets</p>
                            {showFilters ? 
                            
                            <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex flex-row items-center justify-start gap-1" onClick={()=> setShowFilters(!showFilters)}><HiFilter size={21} />  Filter</p>
                            
                            : 
                            <span className="w-[350px] h-[40px] flex flex-row items-center justify-start gap-3">
                                <span className="w-[35px] h-full flex items-center justify-center cursor-pointer border hover:border-blue-600 hover:text-blue-600 text-gray-600 rounded-[3px]" onClick={()=> setShowFilters(!showFilters)} >
                                    <BsFillCaretRightFill size={23} />
                                </span>
                                <input type="text" name="userName" placeholder='Search by project name or ticket id' id="" className='normal-input bg-gray-100 ' />
                            </span> }
                            {/* <span className="flex flex-row items-center justify-end gap-3"></span> */}
                        </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-2 ">Ticket ID</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Project Name</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Project Status</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Date Submitted</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Last Update</p>
                        </span>
                        <div className="w-full all-project-cont flex flex-col justify-start items-start" >
                            {[1,2,3,4,5,6,7,8,9,0,1].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list" onClick={()=>viewDetails(data)} >
                                        <p className="text-sm w-[20%] px-2 ">1002{ind + 1}</p>
                                        <p className="text-sm w-[20%] px-2 ">Project {ind + 1}</p>
                                        <p className="text-sm w-[20%] px-2 ">{ind % 2 === 1 ? "In Progress":"Pending"}</p>
                                        <p className="text-sm w-[20%] px-2 ">June 25, 2024</p>
                                        <p className="text-sm w-[20%] px-2 ">June 20, 2024</p>
                                    </span>
                                )
                            })}
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
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

            {showModal && <ServiceTicketModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default ServiceTicketPage