import React from 'react'

const OpsUserTrackingPage = () => {
    return (
        <div className="w-full h-full p-[10px] ">
            <div className="w-full h-full flex flex-col items-start justify-start gap-[25px] ">
                {/* Summary card */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total User Tracked</p>
                            <p className="text-sm text-blue-600">1,455</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-green-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-green-600">Total Logins Today</p>
                            <p className="text-sm text-green-600">745</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600 ">Total Modifications Today</p>
                            <p className="text-sm text-amber-600 ">2,465</p>
                        </div>
                    </span>
                    
                </div>

                {/* Financial Report */}
                <div className="w-full flex flex-col items-start justify-start gap-[15px] ">
                    <p className="text-xl font-semibold">Activity Log Timeline</p>
                    <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                        <div className="w-[45%] flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Login/Logout Records</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[30%] pr-2 pl-2 ">Username</p>
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Action</p>
                                    <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Date</p>
                                    <p className="text-sm font-semibold w-[22.5%] pr-2 pl-2 ">Time</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[30%] pr-2 pl-2 ">{ind % 2 === 1 ? "John Doe": "Mary Poppins"}</p>
                                                <p className="text-sm w-[22.5%] pr-2 pl-2 ">{ind % 2 === 1 ? "Login": "Logout"}</p>
                                                <p className="text-sm w-[25%] pr-2 pl-2 ">June 18, 2024</p>
                                                <p className="text-sm w-[22.5%] pr-2 pl-2 ">{ind % 2 === 1 ? "11:25 AM": "10:24 AM"}</p>
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

                        <div className="w-[55%] flex flex-col items-start justify-start gap-[10px] ">
                            <p className="text-lg">Project Modification Log</p>

                            <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                                <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Date</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Time</p>
                                    <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Username</p>
                                    <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Action</p>
                                    <p className="text-sm font-semibold w-[32.5%] pr-2 pl-2 ">Details</p>
                                </span>
                                <div className="w-full h-[200px] flex flex-col justify-start items-start">
                                    {[1,2,3,4,5].map((data, ind)=>{
                                        return (
                                            <span key={ind} className="recent-activity-table-list">
                                                <p className="text-sm w-[17.5%] pr-2 pl-2 ">{ind % 2 === 1 ? "June 18,2024": "June 17,2024" }</p>
                                                <p className="text-sm w-[17.5%] pr-2 pl-2 ">{ind % 2 === 1 ? "12:05 PM": "03:20 PM"}</p>
                                                <p className="text-sm w-[17.5%] pr-2 pl-2 ">John Doe</p>
                                                <p className="text-sm w-[15%] pr-2 pl-2 ">Added</p>
                                                <p className="text-sm w-[32.5%] pr-2 pl-2 ">Project Alpha</p>
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
            </div>
        </div>
    )
}

export default OpsUserTrackingPage