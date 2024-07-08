'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import MyDatePicker from '../datePicker'
import { DropDownBlankTransparent } from '../dropDown'
import { FaCaretRight } from "react-icons/fa6";
import TaskModal from './taskModal'

const TaskManagement = () => {
    const [showFilter, setShowFilter] = useState(false)
    const [filter, setFilter] = useState({date: '', date2: ''})
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [clickedDate, setClickedDate] = useState('')
    const [clickedDate2, setClickedDate2] = useState('')
    const [showCalender, setShowCalender] = useState(false)
    const [showCalender2, setShowCalender2] = useState(false)

    const [showRedlineModal, setShowRedlineModal] = useState(false)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false,
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status',
    })

    useEffect(() => {
        setFilter({...filter, date2: clickedDate2})
        setShowCalender2(false)
    }, [clickedDate2])

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

    const handleSelectDropdown = (dropdown: any, title: any) => {
        setDropElements({...dropElements, [title]: dropdown});
        setDropMenus({...dropMenus, [title]: false});
    }

    function viewTask(data: any) {
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    function addTask() {
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }

    return (
        <div className="w-full p-[10px] flex">
            <div className="w-full h-full flex flex-col gap-[12.5px]">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className="flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/4 border border-blue-600">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px] pl-[20px] pr-[20px]">
                            <p className="text-lg text-blue-600">Total Task</p>
                            <p className="text-sm text-blue-600">10</p>
                        </div>
                    </span>

                    <span className="flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-sky-600 bg-white w-1/4">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px] pl-[20px] pr-[20px]">
                            <p className="text-lg text-sky-600">Pending</p>
                            <p className="text-sm text-sky-600">4</p>
                        </div>
                    </span>

                    <span className="flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/4">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px] pl-[20px] pr-[20px]">
                            <p className="text-lg text-amber-600">In Progress</p>
                            <p className="text-sm text-amber-600">4</p>
                        </div>
                    </span>

                    <span className="flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-700 rounded-[5px] bg-white w-1/4">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px] pl-[20px] pr-[20px]">
                            <p className="text-lg text-lime-700">Completed</p>
                            <p className="text-sm text-lime-700">2</p>
                        </div>
                    </span>
                </div>

                {/* Current Project*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px]">
                    <span className="w-full flex items-center justify-between">
                        <p className="text-lg font-semibold">Task List</p>

                        {showFilter ? 
                        <span className="flex flex-end justify-end gap-3">
                            <span className="h-[40px] w-[30px] cursor-pointer flex items-center justify-center " onClick={()=> setShowFilter(!showFilter)}>
                                <FaCaretRight size={22} />
                            </span>

                            <div className="w-[175px] flex flex-col items-end justify-end relative z-10">
                                <button
                                    className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]"
                                    onClick={() => setShowCalender(!showCalender)}>

                                    {filter.date ? filter.date : "Select Start Date"}
                                    <span className="h-full w-[15px] flex items-center justify-center cursor-pointer">
                                        {showCalender ? <FaCaretUp /> : <FaCaretDown />}
                                    </span>
                                </button>
                                {showCalender && (
                                    <div className="absolute top-[45px] left-0 min-h-[290px] w-full pt-[1px] flex flex-row items-start justify-center">
                                        <MyDatePicker clickedDate={clickedDate} setClickedDate={setClickedDate} />
                                    </div>
                                )}
                            </div>

                            <div className="w-[175px] flex flex-col items-end justify-end relative z-10">
                                <button
                                    className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]"
                                    onClick={() => setShowCalender2(!showCalender2)}
                                >
                                    {filter.date2 ? filter.date2 : "Select End Date"}
                                    <span className="h-full w-[15px] flex items-center justify-center cursor-pointer">
                                        {showCalender2 ? <FaCaretUp /> : <FaCaretDown />}
                                    </span>
                                </button>
                                {showCalender2 && (
                                    <div className="absolute top-[45px] left-0 min-h-[290px] w-full pt-[1px] flex flex-row items-start justify-center">
                                        <MyDatePicker clickedDate={clickedDate2} setClickedDate={setClickedDate2} />
                                    </div>
                                )}
                            </div>

                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent
                                    handleSelectDropdown={handleSelectDropdown}
                                    title={'status'}
                                    dropArray={['High', 'Medium', 'Low']}
                                    dropElements={dropElements}
                                    dropMenus={dropMenus}
                                    handleDropMenu={handleDropMenu}
                                    setDropElements={setDropElements}
                                    setDropMenus={setDropMenus}
                                />
                            </span>
                        </span> 
                        :
                        <span className="flex flex-row justify-end items-center gap-[15px] ">
                            <p className="text-lg hover:text-blue-600 cursor-pointer " onClick={()=> setShowFilter(!showFilter)}>Filter</p>
                            <p className="text-lg hover:text-blue-600 cursor-pointer " onClick={addTask} >Add Task </p>
                        </span>    
                    }
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200">
                            <p className="text-sm font-semibold w-[25%] px-2">Task Description</p>
                            <p className="text-sm font-semibold w-[25%] px-2">Due Date</p>
                            <p className="text-sm font-semibold w-[25%] px-2">Status</p>
                            <p className="text-sm font-semibold w-[25%] px-2">Priority</p>
                        </span>
                        <div className="w-full permit-cont-5 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full flex flex-col justify-start items-start">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, ind) => {
                                    return (
                                        <span key={ind} className="recent-activity-table-list" onClick={viewTask}>
                                            <p className="text-sm w-[25%] px-2">Structural Analysis</p>
                                            <p className="text-sm w-[25%] px-2">June 11, 2024</p>
                                            <p className="text-sm w-[25%] px-2">Pending</p>
                                            <p className="text-sm w-[25%] px-2">High</p>
                                        </span>
                                    )
                                })}
                            </span>
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px]">
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

            {showModal && <TaskModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}

        </div>
    )
}

export default TaskManagement
