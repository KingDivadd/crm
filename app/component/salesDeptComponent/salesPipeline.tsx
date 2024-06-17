'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { DropDownBlankTransparent } from '../dropDown'
import KanbanBoard from './salesKanbanBoard'
import SalesViewPipelineDetails from './salesViewPipelineDetails'

const SalesPipeline = () => {
    const router = useRouter()
    const [showDetails, setShowDetails] = useState(false)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        userRole: false, disposition: false
    });
    const [dropElements, setDropElements] = useState({
        userRole: 'User Role', disposition: 'Disposition'

    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'SELECT'});
    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }
    
    return (
        <div className="w-full h-full p-[10px] ">
            {showDetails? <SalesViewPipelineDetails showDetails={showDetails} setShowDetails={setShowDetails} /> :  <div className="relative w-full h-full flex flex-col items-start justify-start gap-[20px] ">

                <div className="w-full flex flex-row items-center justify-between">
                    <p className="text-xl font-semibold">Sales Pipeline</p>
                    
                    <span className="w-auto flex flex-row items-center justif-between gap-5 h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="userName" placeholder='Search by name or lead Id' id="" className='normal-input bg-gray-100 ' />
                        </span>
                        <span className="h-[40px] w-[150px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['Sold', 'Not Sold']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>

                        {/* <button className="rounded-[3px] w-[150px] h-[40px] border border-gray-400 hover:border-blue-600 hover:text-blue-600 ">Add Lead</button> */}
                    </span>
                </div>
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Lead</p>
                            <p className="text-md font-semibold">45</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-green-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Conversion Rate 20%</p>
                            <p className="text-md font-semibold">450</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Average Deal Size</p>
                            <p className="text-md font-semibold">$5,250</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Sales</p>
                            <p className="text-md font-semibold">$250,450</p>
                        </div>
                    </span>
                    
                </div>


                {/* Kanban Board*/}
                <KanbanBoard showDetails={showDetails} setShowDetails={setShowDetails} />

                {/* Pipeline Board*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] pb-[10px] ">
                    <p className="text-xl font-semibold">Pipeline Board</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Lead Id</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Appointment Date</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Disposition</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Contract Amount</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Project Type</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Status</p>  {/* pending, inporgress, aproved*/}
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>  
                        </span>
                        <div className="w-full pipeline-cont flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">LD100123</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">June 11, 2024</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">Sold</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">$24,500</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">Freestanding</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">In progress</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 text-blue-600 hover:underline" onClick={()=>{setShowDetails(!showDetails)}} >View Details</p>
                                        
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

export default SalesPipeline