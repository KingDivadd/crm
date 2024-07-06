'use client'
import React, {useState, useEffect} from 'react'
import InspectionModal from './inspectionPageModal'
import PermitHistoryModal from './permitHistoryModal'
import { DropDownBlankTransparent } from '../dropDown'
import MyDatePicker from '../datePicker'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'



const PermitHistory = () => {
    const [filter, setFilter] = useState({date: ''})
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [clickedDate, setClickedDate] = useState('')
    const [showCalender, setShowCalender] = useState(false)

    const [showRedlineModal, setShowRedlineModal] = useState(false)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status:false,
    });
    const [dropElements, setDropElements] = useState({
        status:'Select',
    })

    useEffect(() => {
        setFilter({...filter, date: clickedDate})
        setShowCalender(false)
    }, [clickedDate])

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
            <div className="w-full h-full flex flex-col gap-[15px]  ">
                <p className="text-xl font-semibold">Permit Historys</p>
                {/* Current Project*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full flex items-center justify-between">
                        <p className="text-lg font-semibold">All Permit</p>
                        
                        <span className=" flex flex-end justify-end gap-3">
                            <div className="w-[175px] flex flex-col items-end justify-end relative z-10 ">
                                <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={()=>{setShowCalender(!showCalender)}}>
                                    {filter.date ? filter.date :  "Select Date"}
                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                        {showCalender ?  <FaCaretUp  /> : <FaCaretDown  />}
                                    </span>
                                </button>
                                {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-full  pt-[1px] flex flex-row items-start justify-center w-full ">
                                    <MyDatePicker clickedDate={clickedDate} setClickedDate={setClickedDate} />
                                </div>}
                            </div>
                            <span className="w-[275px] ">
                                <input type="text" placeholder='Enter Permit Id' className='normal-input bg-transparent' />
                            </span>
                            <span className="h-[40px] w-[175px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Pending', 'Approved',]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>
                        </span>
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] px-2 ">Permit Id</p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Submitted Date </p>
                            <p className="text-sm font-semibold w-[25%] px-2 ">Status</p>
                            <p className="text-sm font-semibold w-[25%] px-2  ">Actions</p>
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

            {showModal && <PermitHistoryModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default PermitHistory