'use client'
import { paymentSection } from '@/types'
import React, {useState, useEffect} from 'react'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import OpsViewInstall from './opsViewInstall'

const OpsInstallsPage = () => {
    const [addInvoice, setAddInvoice] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [show, setShow] = useState(false)

    function editInvoice(data:any){
        setSelectedInvoice(data)
        setAddInvoice(false)
        setShow(true)
    }
    return (
        <div className='w-full p-[10px]' >

            {show ?
            <OpsViewInstall show={show} setShow={setShow} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} addInvoice={addInvoice} setAddInvoice={setAddInvoice} /> : 
            <div className="w-full h-full flex flex-col items-start justify-start gap-[25px]">
                {/* summary card */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600 ">Total Installations</p>
                            <p className="text-sm text-blue-600 ">145</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-sky-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600">Scheduled Installations</p>
                            <p className="text-sm text-sky-600">45</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-blue-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Installations in Progress</p>
                            <p className="text-sm text-blue-600">65</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Completed Installations</p>
                            <p className="text-sm text-lime-600">65</p>
                        </div>
                    </span>
                    
                </div>

                {/* Material Section */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Materials Section</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Material Item</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Date Ordered</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Date Received</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Date Delivered</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Cost</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Roofing Sheet</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">{ind % 2 === 1 ? "Ordered": "Delivered"}</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 10, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 11, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 11, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">$15,000</p>
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

                {/* Payment Section */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Payment Section</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Phase</p>
                            <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Amount</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Date Received</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {paymentSection.map((data, ind)=>{
                                const {amount, dateReceived, phase, status} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">{phase}</p>
                                        <p className="text-sm w-[22.5%] pr-2 pl-2 ">{status}</p>
                                        <p className="text-sm w-[22.5%] pr-2 pl-2 ">{amount}</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">{dateReceived}</p>
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

                {/* Installation Workflow */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Approval Flow Trackings</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[32.5%] pr-2 pl-2 ">Scheduled</p>
                            <p className="text-sm font-semibold w-[35%] pr-2 pl-2 ">In Progress</p>
                            <p className="text-sm font-semibold w-[32.5%] pr-2 pl-2 ">Completed</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[32.5%] flex flex-col items-start justify-betw px-[10px] ">
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Task:</p>
                                                <p className="text-sm h-[30px] ">Footing Date</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Date:</p>
                                                <p className="text-sm h-[30px] ">June 20, 2024</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3 ">
                                                <p className="text-sm font-light h-[30px] ">Crew:</p>
                                                <p className="text-sm h-[30px] ">Crew A</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3 ">
                                                <p className="text-sm font-light h-[30px] ">Bill Sheet:</p>
                                                <p className="text-sm h-[30px] ">Pending</p>
                                            </span>
                                        </span>
                                        <span className="w-[35%] flex flex-col items-start justify-betw px-[10px]">
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Task:</p>
                                                <p className="text-sm h-[30px] ">Electrical Work</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3 ">
                                                <p className="text-sm font-light h-[30px] ">Date:</p>
                                                <p className="text-sm h-[30px] ">June 15, 2024</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Crew:</p>
                                                <p className="text-sm h-[30px] ">Crew C</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Bill Sheet:</p>
                                                <p className="text-sm h-[30px] ">Submitted</p>
                                            </span>
                                        </span>
                                        <span className="w-[32.5%] flex flex-col items-start justify-betw px-[10px] ">
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Task:</p>
                                                <p className="text-sm h-[30px] ">Inspection</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Date:</p>
                                                <p className="text-sm h-[30px] ">June 14, 2024</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3  ">
                                                <p className="text-sm font-light h-[30px] ">Crew:</p>
                                                <p className="text-sm h-[30px] ">Crew F</p>
                                            </span>
                                            <span className="w-full flex flex-row items-center justif-start gap-3 ">
                                                <p className="text-sm font-light h-[30px] ">Bill Sheet:</p>
                                                <p className="text-sm h-[30px] ">Approved</p>
                                            </span>
                                        </span>
                                        
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

                {/* Material Section */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full flex flex-row items-center justify-between">
                        <p className="text-xl font-semibold">Invoice Section</p>
                        <p className="text-md hover:text-blue-600 hover:underline cursor-pointer " onClick={()=>{setShow(true); setAddInvoice(true);}}>Add Invoice</p>
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Invoice Type</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Upload Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Cost</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Job</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 "></p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Duralum</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 13, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Uploaded</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">$500</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">JB10023</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-lime-600" onClick={()=>editInvoice(data)} ><MdEdit size={16} /> Edit</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-red-400" onClick={()=>editInvoice(data)}  ><MdDeleteForever size={18} /> Delete</p>
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


            </div>}
        </div>
    )
}

export default OpsInstallsPage