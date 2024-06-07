import React from 'react'

const PlatformFeatures = () => {
    return (
        <div id="platformfeatures" className="w-full min-h-[100vh] flex flex-col items-center justif-start gap-10 pt-[40px] pb-[20px] pr-[70px] pl-[70px] ">
            <h3 className="font-bold text-3xl text-black">Platform Features</h3>
            <div className="w-full flex flex-col justify-start item-center gap-10 h-auto ">
                <div className="w-full flex flex-row items-start justify-between gap-3 h-auto ">
                    {/* left side */}
                    <div className="w-[65%] flex flex-col items-start justify-start gap-3 ">
                        {/* top */}
                        <div className="w-full flex flex-row items-start justify-between gap-3 bg-">
                            {/* left side */}
                            <span className=" w-[45%] min-h-[100px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Projects</h4>
                                <p className="text-sm font-light">Keep track of the number of new projects</p>
                                <span className="w-full h-[100px] flex flex-row items-center justify-between bg-red-100 "></span>
                            </span>
                            {/* right side */}
                            <span className=" w-[55%] min-h-[100px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Projects</h4>
                                <p className="text-sm font-light">Keep track of the number of new projects</p>
                                <span className="w-full h-[100px] flex flex-row items-center justify-between bg-red-100 "></span>
                            </span>
                        </div>
                        {/* bottom */}
                        <div className="w-full flex flex-row items-start justify-between gap-3">
                            <span className=" w-[55%] min-h-[100px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Projects</h4>
                                <p className="text-sm font-light">Keep track of the number of new projects</p>
                                <span className="w-full h-[100px] flex flex-row items-center justify-between bg-red-100 "></span>
                            </span>
                            <span className=" w-[45%] min-h-[100px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                                <h4 className="font-bold text-lg">Projects</h4>
                                <p className="text-sm font-light">Keep track of the number of new projects</p>
                                <span className="w-full h-[100px] flex flex-row items-center justify-between bg-red-100 "></span>
                            </span>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="w-[35%] flex flex-col items-start justify-start gap-3">
                        <span className=" w-[100%] min-h-[100px] p-[10px] pr-[15px] pl-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[5px] ">
                            <h4 className="font-bold text-lg">Projects</h4>
                            <p className="text-sm font-light">Keep track of the number of new projects</p>
                            <span className="w-full h-[100px] flex flex-row items-center justify-between bg-blue-100 "></span>
                        </span>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start items-between gap-10 ">
                    <h3 className="font-semibold text-2xl text-black">Upgrade plan for additional features</h3>
                    <div className="w-full flex flex-row items-start justify-between gap-3">
                        {/* left side to be an image of a hand pressing a laptop */}
                        <span className="w-[40%] h-[400px] rounded-[5px] bg-blue-100 "></span>
                        {/* right side listing the additional features */}
                        <div className="w-[60%] h-[400px] bg-blue-500 rounded-[5px] "></div>
                    </div>
                </div>

            </div>

        </div>

        
    )
}

export default PlatformFeatures