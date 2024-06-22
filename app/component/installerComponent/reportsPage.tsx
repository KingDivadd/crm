'use client'
import React, {useState, useEffect} from 'react'

const ReportsPage = () => {
    return (
        <div className="w-full flex p-[10px] ">
            <div className="w-full flex flex-col items-start justify-start gap-[25px] pt-[20px] ">
                <p className="text-2xl font-semibold">Reports</p>

                <div className="w-full flex flex-row items-start justify-start gap-[10px] h-full ">
                    <div className="w-1/2 flex flex-col items-start gap-[15px]">
                        <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-xl font-semibold">Profit & Loss Report</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[40%] px-2 ">Job Number</p>
                                    <p className="text-sm font-semibold w-[30%] px-2 ">Profit</p>
                                    <p className="text-sm font-semibold w-[30%] px-2 ">Loss</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list" >
                                                <p className="text-sm w-[40%] px-2 ">JB1000123 {ind + 1}</p>
                                                <p className="text-sm w-[30%] px-2 ">$2,500</p>
                                                <p className="text-sm w-[30%] px-2 ">$1,200</p>
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
                    <div className="w-1/2 flex flex-col items-start gap-[15px] ">

                        <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-xl font-semibold">Cost Per Project</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[40%] px-2 ">Project Type</p>
                                    <p className="text-sm font-semibold w-[60%] px-2 ">Average Cost ($)</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list" >
                                                <p className="text-sm w-[40%] px-2 ">PJ1000123 {ind + 1}</p>
                                                <p className="text-sm w-[60%] px-2 ">$2,500</p>
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
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Invoice/Bills</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-2 ">Invoice</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Vender</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Amount</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Date</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list" >
                                        <p className="text-sm w-[20%] px-2 ">IN1000223</p>
                                        <p className="text-sm w-[20%] px-2 ">JB1000223</p>
                                        <p className="text-sm w-[20%] px-2 ">Duralumn</p>
                                        <p className="text-sm w-[20%] px-2 ">$2,500</p>
                                        <p className="text-sm w-[20%] px-2 ">June 21, 2024</p>
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

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Payroll</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] px-2 ">Employee Name</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Amount</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Date</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list" >
                                        <p className="text-sm w-[25%] px-2 ">Marry Poppins</p>
                                        <p className="text-sm w-[25%] px-2 ">JB1000223</p>
                                        <p className="text-sm w-[25%] px-2 ">$2,500</p>
                                        <p className="text-sm w-[20%] px-2 ">June 21, 2024</p>
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
        </div>
    )
}

export default ReportsPage