'use client'
import React, {useState, useEffect} from 'react'
import PayrollModal from './payrollModal'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const PayrollPage = () => {
    const [showFilter, setShowFilter] = useState(false)
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    

    function viewPayroll(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    function addPayroll(){
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }


    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[15px]  ">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Payroll Expenses</p>
                            <p className="text-sm text-blue-600">$500,000</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-sky-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600">Total Employees</p>
                            <p className="text-sm text-sky-600">50</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Average Payroll per Employee</p>
                            <p className="text-sm text-lime-600">$10,000</p>
                        </div>
                    </span>
                    
                </div>

                
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="h-[35px] w-full flex items-center justify-between">
                        <p className="text-lg font-semibold">Payroll Details</p>

                        <span className="h-full flex items-center justify-end gap-[15px] ">

                            {showFilter && 
                            <span className="w-[400px] h-full flex items-center justify-start gap-[15px] ">
                                <span className="h-full w-[40px] cursor-pointer hover:bg-gray-200 rounded-[5px] flex items-center justify-center " onClick={()=> setShowFilter(!showFilter)}>
                                    <FaCaretRight size={23} />
                                </span>
                                <input placeholder='Enter Employee Name or EmployeeID' type="text" name="" id="" className="normal-input" /> 
                            </span>}

                            {!showFilter && <p className="text-lg font-medium hover:text-blue-600 cursor-pointer" onClick={()=> setShowFilter(!showFilter)}>Filters</p>}
                            {!showFilter && <p className="text-lg font-medium hover:text-blue-600 cursor-pointer" onClick={addPayroll}>Add Payroll</p>}
                        </span>
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[30%] px-2 ">Employee ID</p>
                            <p className="text-sm font-semibold w-[30%] px-2 ">Employee Name</p>
                            <p className="text-sm font-semibold w-[40%] px-2 ">Payroll Amount</p>
                        </span>
                        <div className="w-full cont-4 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full  flex flex-col justify-start items-start ">
                                {[1,2,3,4,5,6,7,8,9,10, 11, 12].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" onClick={viewPayroll} >
                                            <p className="text-sm w-[30%] px-2 ">EM1000123{ind + 4}</p>
                                            <p className="text-sm w-[30%] px-2 ">John Doe</p>
                                            <p className="text-sm w-[40%] px-2 ">$9,500</p>
                                            
                                        </span>
                                    )
                                })}
                            </span>
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
                                <p className="text-sm">Showing 1-10 of 60</p>
                            </span>
                        </span>
                    </div>
                </div>

             
            </div>
            
            {showModal && <PayrollModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}

         

        </div>
    )
}

export default PayrollPage