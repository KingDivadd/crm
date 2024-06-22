'use client'
import React, {useState, useEffect} from 'react'
import BillSheetModal from './billSheetModal'

const BillSheetPage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    function viewDetails(data:any){
        console.log('clicked ',data)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }
    
    function addSheet(){
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }

    return (
        <div className="w-full flex p-[10px]">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[25px] pt-[20px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <p className="text-xl font-semibold">Bill Sheets</p>
                    <p className="text-md text-blue-600 hover:underline cursor-pointer " onClick={addSheet}>Add Sheet</p>
                </span>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-2 ">Bill Sheet</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Task </p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Crew</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Date</p>
                            <p className="text-sm font-semibold w-[15%] px-2 ">Amount</p>
                        </span>
                        <div className="w-full bill-sheet-cont  flex flex-col justify-start items-start overflow-y-auto">
                            <div className="w-full flex flex-col items-start justify-start">
                                {[1,2,3,4,5,6,7,8,9,0].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" >
                                            <p className="text-sm w-[20%] px-2 ">10001234{ind + 1}</p>
                                            <p className="text-sm w-[15%] px-2 ">10001345{ind + 1}</p>
                                            <p className="text-sm w-[20%] px-2 ">Electrical </p>
                                            <p className="text-sm w-[15%] px-2 ">Crew A</p>
                                            <p className="text-sm w-[15%] px-2 ">June 6, 2024</p>
                                            <p className="text-sm w-[15%] px-2 ">$1,200</p>
                                        </span>
                                    )
                                })}
                            </div>
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
            {showModal && <BillSheetModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default BillSheetPage