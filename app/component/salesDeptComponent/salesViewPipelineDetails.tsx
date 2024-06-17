import { pipelineApprovalInfo, pipelineBasicInfo, pipelineLeadComment, pipelineProjectInfo } from '@/constants'
import { PipelineProps } from '@/types'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'

const SalesViewPipelineDetails = ({showDetails, setShowDetails}:PipelineProps) => {
    return (
        <div className="w-full h-full ">
            <div className="w-full flex flex-col items-start justify-start gap-[10px] " >
                <div className="w-full h-[40px] flex items-center justify-between ">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg  text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setShowDetails(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />Back</p>
                    </span>

                    <p className="text-lg">Lead ID: <strong>LD1000234</strong></p>
                </div>
                <div className="w-full h-full flex flex-row items-start justify-start gap-[10px] ">
                    <div className="w-1/3 h-full border border-blue-600 rounded-[5px] p-[10px] ">
                        {/* basic infor column */}
                        <div className="w-full flex flex-col gap-3 items-start justify-start">
                            <p className="text-md font-semibold">Basic Information</p>
                            {pipelineBasicInfo.map((data, ind)=>{
                                return (
                                    <span key={ind} className="w-full flex flex-row gap-3">
                                        <p className="text-md font-light">{data.title}</p>
                                        <p className="text-md ">{data.value}</p>
                                    </span>

                                )
                            })}
                        </div>

                        
                    </div>
                    <div className="w-1/3 h-full border border-blue-600 rounded-[5px] p-[10px] flex flex-col gap-[10px] ">
                        {/* Project Detials  */}
                        <div className="w-full flex flex-col gap-3 items-start justify-start">
                            <p className="text-md font-semibold">Project Details</p>
                            {pipelineProjectInfo.map((data, ind)=>{
                                return (
                                    <span key={ind} className="w-full flex flex-row gap-3">
                                        <p className="text-md font-light">{data.title}</p>
                                        <p className="text-md ">{data.value}</p>
                                    </span>
                                )
                            })}
                        </div>
                        {/* Project Detials  */}
                        <div className="w-full flex flex-col gap-3 items-start justify-start border-t border-gray-400 pt-[10px] ">
                            <p className="text-md font-semibold">Approval Tracking</p>
                            {pipelineApprovalInfo.map((data, ind)=>{
                                return (
                                    <span key={ind} className="w-full flex flex-row gap-3">
                                        <p className="text-md font-light">{data.title}</p>
                                        <p className="text-md ">{data.value}</p>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-1/3 h-full border border-blue-600 rounded-[5px] p-[10px] ">
                        {/* Notes and Comment  */}
                        <div className="w-full flex flex-col gap-3 items-start justify-start  ">
                            <p className="text-md font-semibold">Comments and Note</p>
                            {pipelineLeadComment.map((data, ind)=>{
                                return (
                                    <span key={ind} className="w-full flex flex-col items-start justify-start gap-3">
                                        <p className="text-md font-light">Comment on {data.title}</p>
                                        <p className="text-md ">{data.value}</p>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesViewPipelineDetails