'use client'
import React, {useState, useEffect} from 'react'
import { DropDownBlankTransparent } from '../dropDown';
import { MdEdit, MdEditCalendar } from 'react-icons/md';
import OpsViewLead from './opsViewLead'
import { IoCaretBackOutline } from "react-icons/io5";
import { HiFilter } from "react-icons/hi";

const OpsLeadsPage = () => {
    const [showFilters, setShowFilters] = useState(true)
    const [show, setShow] = useState(false)
    const [addLead, setAddLead] = useState(false)
    const [selectedLead, setSelectedLead] = useState(null)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false, assignedTeam: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'All', assignedTeam: 'Select Team'

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

    function editLead(data:any){
        setAddLead(false)
        setShow(true)
        setSelectedLead(data)
    }

    return (
        <div className="w-full p-[10px] ">
            {show ? 
            <OpsViewLead addLead={addLead} selectedLead={selectedLead} show={show} setShow={setShow} setSelectedLead={setSelectedLead} />
            :
            <div className="w-full h-full flex flex-col items-start justify-start gap-[10px]">

                {/* summary card */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/4 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600 ">Total Lead</p>
                            <p className="text-sm text-blue-600 ">145</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-green-600 bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-green-600 ">New Leads</p>
                            <p className="text-sm text-green-600 ">45</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600 ">Leads in Progress</p>
                            <p className="text-sm text-amber-600 ">65</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-sky-600 rounded-[5px] bg-white w-1/4  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-sky-600">Leads Completed</p>
                            <p className="text-sm text-sky-600">50</p>
                        </div>
                    </span>
                    
                    
                </div>

                {/* Filtering bar */}
                <div className="w-full flex flex-row items-center justify-between">
                    
                    {showFilters ? 
                    <p className="text-md text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-1 h-[40px]" onClick={()=>{setShowFilters(!showFilters)}} ><HiFilter size={23} /> Filter </p> 
                    : 
                    <span className="w-auto flex flex-row items-center justif-between gap-5 h-[40px] ">
                        <span className="w-[300px] h-[40px] ">
                            <input type="text" name="userName" placeholder='Search by name or lead Id' id="" className='normal-input bg-gray-100 ' />
                        </span>
                        <span className="h-[40px] w-[150px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Scheduled','In Progress', 'Completed']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>
                        <span className="h-[40px] w-[200px]">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'assignedTeam'} dropArray={['Team A', 'Team B', 'Team C']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>
                        <span className="w-[35px] h-full flex items-center justify-center cursor-pointer border border-gray-400 text-gray-600 rounded-[3px]" onClick={()=> setShowFilters(!showFilters)} >
                            <IoCaretBackOutline size={23} />
                        </span>

                    </span>}
                    <p className="text-md hover:underline text-blue-600 cursor-pointer" onClick={()=>{ setAddLead(true); setShow(true)}}>Add Lead</p>
                </div>

                {/* the lead list */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Lead Overview</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[12%] pr-2 pl-2 ">Phone</p>
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Designer</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Gate Code</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Appintment Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Disposition</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full min-h-[200px] flex flex-col justify-start items-start ops-lead-cont">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">Peter Parker</p>
                                        <p className="text-sm w-[12%] pr-2 pl-2 ">(123)-456-7890</p>
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">Marry Jane</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">246898</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 19, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">{ind % 2 === 1 ? "Scheduled" : "In Progress"}</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">{ind % 2 === 1 ? "Sold " : "Not Sold"}</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-lime-600" onClick={()=>{editLead(data)}} ><MdEdit size={16} /> Edit</p>

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

export default OpsLeadsPage