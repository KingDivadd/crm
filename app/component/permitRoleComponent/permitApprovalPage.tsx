'use client'
import React, {useState, useEffect} from 'react'
import InspectionModal from './inspectionPageModal'
import PermitApprovalModal from './permitApprovalModal'

const PermitApprovalPage = () => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showRedlineModal, setShowRedlineModal] = useState(false)


    function viewInspection(data:any) {
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    function addInspection() {
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }

    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[25px]  ">
                <p className="text-xl font-semibold">Permit Approval</p>
                {/* Current Project*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-lg font-semibold">All Permits</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] px-2 ">Permit Id</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Submitted Date </p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                            <p className="text-sm font-semibold w-[25%] px-2  ">Action</p>
                        </span>
                        <div className="w-full permit-cont-4 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full  flex flex-col justify-start items-start ">
                                {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" onClick={()=> viewInspection(data)} >
                                            <p className="text-sm w-[25%] px-2 ">PT1000123{ind}</p>
                                            <p className="text-sm w-[25%] px-2 ">June 11, 2024</p>
                                            <p className="text-sm w-[25%] px-2 ">Pending</p>
                                            <p className="text-sm w-[25%] px-2 hover:text-blue-600 cursor-pointer hover:underline ">view</p>
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

            {showModal && <PermitApprovalModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default PermitApprovalPage