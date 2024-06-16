'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import SalesViewContractDetails from './salesViewContractDetails'

const SalesReportPage = () => {
    const router = useRouter()
    const [viewDetails, setViewDetails] = useState({contractDetails: false, documentAndInvoices: false })

    function viewContractDetails(){
        setViewDetails({...viewDetails, contractDetails: !viewDetails.contractDetails})
    }

    function viewDocumentAndInvoice(){
        setViewDetails({...viewDetails, documentAndInvoices: !viewDetails.documentAndInvoices})
    }
    return (
        <div className="w-full p-[10px] pb-[10px]">
            {viewDetails.contractDetails && <SalesViewContractDetails viewContractDetails={viewContractDetails}  /> }
            {(viewDetails.contractDetails == false && viewDetails.documentAndInvoices == false) &&  <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Lead</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] rounded-[5px] border border-green-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Sales</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Conversion Rate</p>
                            <p className="text-sm font-semibold">75%</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[120px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Pending Tasks</p>
                            <p className="text-sm font-semibold">450</p>
                            <p className="text-sm font-light">Last 30 days</p>
                        </div>
                    </span>
                    
                    
                    
                    
                </div>

                {/*Sales Performance*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Sales Performance</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Sales Person</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Lead Assigned</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Lead Converted</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Conversion Rate</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Revenue Generated</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">50</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">30</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">60%</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">$150,000</p>
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

                {/* Lead Analysis */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Lead Analysis</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Lead Source</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Lead Generated</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Lead Converted</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Conversion Rate</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Website</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">100</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">60</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">60%</p>
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

                {/* Revenue by Product Service */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Revenue by Product Service</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[40%] pr-2 pl-2 ">Product / Service</p>
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Quantity Sold</p>
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Total Revenue</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[40%] pr-2 pl-2 ">Product A</p>
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">100</p>
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">$125,000</p>
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

                {/* Monthly Sales Trend*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Monthly Sales Trend</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[40%] pr-2 pl-2 ">Month</p>
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Lead Converted</p>
                            <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Revenue Generated</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {['January', 'February', 'March', 'April', 'May'].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[40%] pr-2 pl-2 ">{data}</p>
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">45</p>
                                        <p className="text-sm w-[30%] pr-2 pl-2 ">$45,000</p>
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

                {/* Sales Report*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Sales Report</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Sales Id</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Sales Person</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Product/Services</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Sales Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Revenue Generated</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">SALES100012</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Marry Jane</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Product A</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 11, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">$125,000</p>
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

export default SalesReportPage