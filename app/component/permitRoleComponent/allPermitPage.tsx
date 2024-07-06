'use client'
import React, {useState, useEffect} from 'react'
import PermitUploadModal from './permitUploadModal'
import VeiwRedLinesModal from './viewRedLines'


const AllPermitPage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showRedlineModal, setShowRedlineModal] = useState(false)


    function viewPermit(data:any) {
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    function addPermit() {
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }

    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[25px] pt-[20px] ">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-lime-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Approved Permit</p>
                            <p className="text-sm text-lime-600">45</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-blue-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Awaiting Approval</p>
                            <p className="text-sm text-blue-600">13</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600">Upcomming Inspection</p>
                            <p className="text-sm text-amber-600">3</p>
                        </div>
                    </span>
                    
                </div>

                {/* Current Project*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full flex items-center justify-between">
                        <p className="text-xl font-semibold">All Permits</p>

                        <p className="text-xl cursor-pointer text-blue-600 hover:underline " onClick={addPermit}>Add Permit</p>
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] px-2 ">Permit Id</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Date Submitted</p>
                            <p className="text-sm font-semibold w-[20%] px-2 ">Status</p>
                            <p className="text-sm font-semibold w-[40%] px-2 ">Activity</p>
                        </span>
                        <div className="w-full permit-cont-3 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full  flex flex-col justify-start items-start ">
                                {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" onClick={()=>viewPermit(data)} >
                                            <p className="text-sm w-[20%] px-2 ">PT1000123{ind}</p>
                                            <p className="text-sm w-[20%] px-2 ">June 11, 2024</p>
                                            <p className="text-sm w-[20%] px-2 ">Pending Approval</p>
                                            <p className="text-sm w-[40%] px-2 ">Permit #123 submitted for approval</p>
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
            {showModal && <PermitUploadModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default AllPermitPage