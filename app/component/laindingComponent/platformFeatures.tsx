import React from 'react'

const PlatformFeatures = () => {
    return (
        <div id="platformfeatures" className="w-full min-h-[100vh] flex flex-col items-center justif-start gap-10 pt-[40px] pb-[20px] pr-[70px] pl-[70px] ">
            <h3 className="font-bold text-3xl text-black">Platform Features</h3>
            <div className="w-full flex flex-col justify-start item-center gap-10 h-auto ">
                <div className="w-full flex flex-row items-start justify-between gap-3 h-auto">
                    {/* left side */}
                    <div className="w-[65%] flex flex-col items-start justify-start gap-3 ">
                        {/* top */}
                        <div className="w-full flex flex-row items-start justify-between gap-3 bg-">
                            {/* left side */}
                            <span className=" w-[45%] min-h-[120px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">User Role Management</h4>
                                <p className="text-sm font-light">Tailored access and control for various roles</p>
                                <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                            </span>
                            {/* right side */}
                            <span className=" w-[55%] min-h-[120px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Integrated Lead Management</h4>
                                <p className="text-sm font-light">Track and manage leads with calender integration</p>
                                <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                            </span>
                        </div>
                        {/* bottom */}
                        <div className="w-full flex flex-row items-start justify-between gap-3">
                            <span className=" w-[55%] min-h-[120px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Sales Pipe Line and Project Management</h4>
                                <p className="text-sm font-light">Manages sales stages and project details.</p>
                                <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                            </span>
                            <span className=" w-[45%] min-h-[120px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Customer Payments and Invoicing</h4>
                                <p className="text-sm font-light">Keep track of the number of new projects</p>
                                <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                            </span>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="w-[35%] h-[696px] flex flex-col items-start justify-start gap-3">
                        <span className=" w-[100%] h-full p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                            <h4 className="font-bold text-lg">Finance and HR Integration</h4>
                            <p className="text-sm font-light">Tracks financials and manages payroll and reporting.</p>
                            <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                        </span>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start items-between gap-10 ">
                    <h3 className="font-semibold text-2xl text-black">Additional features</h3>
                    <div className="w-full flex flex-row items-start justify-between gap-3">
                        {/* left side to be an image of a hand pressing a laptop */}

                        <span className="w-[40%] p-[10px] pr-[15px] pl-[15px] min-h-[400px] rounded-[5px] bg-gray-100 flex flex-col justify-start items-between gap-3 ">
                            <h4 className="font-bold text-lg">Technical and Permit Management</h4>
                            <p className="text-sm font-light">Manages technical tasks and permit processes.</p>
                            <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                        </span>

                        {/* right side listing the additional features */}
                        <div className="w-[60%] p-[10px] pr-[15px] pl-[15px] h-[400px] bg-gray-100 rounded-[5px] flex flex-col justify-start items-between gap-3 ">
                            <h4 className="font-bold text-lg">User Activity Tracking</h4>
                            <p className="text-sm font-light">Logs user activity and project modifications.</p>
                            <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        
    )
}

export default PlatformFeatures