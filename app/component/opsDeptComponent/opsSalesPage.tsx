'use client'
import React, {useState, useEffect} from 'react'
import { DropDownBlankTransparent } from '../dropDown';
import { MdEdit, MdEditCalendar } from 'react-icons/md';
import OpsViewLead from './opsViewLead'
import OpsSalesFunnelSection, {SalesfunnelLeadGen, SalesfunnelQualification, SalesfunnelProposal} from './opsSalesFunnelSection'
import { ProjectWorkFlowApproval, ProjectWorkFlowEngineering, ProjectWorkFlowPermitApproval, ProjectWorkFlowInstallation } from './opsWorkflowSection';

const OpsSalesPage = () => {
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
            <div className="w-full h-full flex flex-col items-start justify-start gap-[25px]">

                {/* summary card */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Sales</p>
                            <p className="text-sm text-blue-600">145</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-amber-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600 ">Pending Sales</p>
                            <p className="text-sm text-amber-600 ">45</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Completed Sales</p>
                            <p className="text-sm text-lime-600">65</p>
                        </div>
                    </span>
                    
                </div>

                {/* Sales Funnel  */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Sales Funnel</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px]  flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[16.5%] pr-2 pl-2 ">Lead Generation</p>
                            <p className="text-sm font-semibold w-[17%] pr-2 pl-2 ">Qualification</p>
                            <p className="text-sm font-semibold w-[16.5%] pr-2 pl-2 ">Proposal</p>
                            <p className="text-sm font-semibold w-[17%] pr-2 pl-2 ">Negotiation</p>
                            <p className="text-sm font-semibold w-[16.5%] pr-2 pl-2 ">Closed Sales</p>
                            <p className="text-sm font-semibold w-[16.5%] pr-2 pl-2 ">Lost Opportunities</p>
                        </span>
                        <div className="w-full  flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="approval-flow-table-list">
                                        <span className="w-[16.5%] flex flex-col items-start justify-betw">
                                            <SalesfunnelLeadGen />
                                        </span>
                                        <span className="w-[17%] flex flex-col items-start justify-betw">
                                            <SalesfunnelQualification />
                                        </span>
                                        <span className="w-[16.5%] flex flex-col items-start justify-betw">
                                            <SalesfunnelProposal status={""} />
                                        </span>
                                        <span className="w-[17%] flex flex-col items-start justify-betw">
                                            <SalesfunnelProposal status={"In Negotiation"} />
                                        </span>
                                        <span className="w-[16.5%] flex flex-col items-start justify-betw">
                                            <SalesfunnelProposal status={"Closed"} />
                                        </span>
                                        <span className="w-[16.6%] flex flex-col items-start justify-betw">
                                            <SalesfunnelProposal status={"Lost"} />
                                        </span>
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

                
                {/* the lead list */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Recent Sales Activities</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Activity Type</p>
                            <p className="text-sm font-semibold w-[40%] pr-2 pl-2 ">Description</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Customer / Project</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start ">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 21, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Engineering</p>
                                        <p className="text-sm w-[40%] pr-2 pl-2 ">Engineering documents submitted for Project Beta</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">{ind % 2 === 1 ? "Completed " : "Approved"}</p>

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

                {/* Sales information table */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Sales Information table</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[8%] pr-2 pl-2 ">Contract</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Contract Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Email</p>
                            <p className="text-sm font-semibold w-[7.5%] pr-2 pl-2 ">HOA</p>
                            <p className="text-sm font-semibold w-[7.5%] pr-2 pl-2 ">Permit</p>
                            <p className="text-sm font-semibold w-[17%] pr-2 pl-2 ">Next Step</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start ">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">JB1002</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">John Doe</p>
                                        <p className="text-sm w-[8%] pr-2 pl-2 ">$24,500</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">June 22,2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">johne.doe@email.com</p>
                                        <p className="text-sm w-[7.5%] pr-2 pl-2 ">Yes</p>
                                        <p className="text-sm w-[7.5%] pr-2 pl-2 ">Yes</p>
                                        <p className="text-sm w-[17%] pr-2 pl-2 ">Send to Engineering</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">{ind % 2 === 1 ? "Completed " : "In Progress"}</p>

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

                {/* Sales information table */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Approval and Task Tracking Table</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full min-h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">HOA Send Date</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">HOA Approved Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Engineering Submitted</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Engineering Received</p>
                            <p className="text-sm font-semibold w-[13.5%] pr-2 pl-2 ">Permit Sent Date</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Permit Number</p>
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Permit Approved Date</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start ">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">JB1002</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">June 17,2024</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">June 18,2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Jube 18,2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Jube 19,2024</p>
                                        <p className="text-sm w-[13.5%] pr-2 pl-2 ">June 20, 2024</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">P-10023</p>
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">June 20,2024</p>

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

export default OpsSalesPage