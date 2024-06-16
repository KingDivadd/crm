'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import ViewTask from './salesViewTask';

import { salesTasksArray } from '../../../constants';

const SalesTaskPage = () => {
    const [show, setShow] = useState(false)
    const [addTask, setAddTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false, priority: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status', priority: 'Priority'

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
        <div className="w-full h-full p-[10px] pb-[10px] ">
            {show ? <ViewTask addTask={addTask} show={show} setShow={setShow} selectedTask={selectedTask} setSelectedTask={setSelectedTask} /> 
            :
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Tasks</p>
                        <p className="text-sm text-black">155</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="TaskName" placeholder='Search by assigned to ' id="" className='normal-input bg-gray-100 ' />
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Pending', 'In Progress', 'Completed']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'priority'} dropArray={['High', 'Low']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            
                        </span>

                        

                    </span>
                </span>

                {/* Task table */}

                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Task Id</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Task Title</p>
                            <p className="text-sm font-semibold w-[17.5%] pr-2 pl-2 ">Description</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Due Date</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Priority</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Assiged To</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                            <div className='h-auto w-full flex flex-col justify-start '>
                            {salesTasksArray.map((data, ind)=>{
                                const {assignedTo, description, dueDate, priority, status, taskId, taskTitle} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[10%] pr-2 pl-2 "> {taskId} </p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 "> {taskTitle} </p>
                                        <p className="text-sm w-[17.5%] pr-2 pl-2 "> {description} </p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 "> {dueDate} </p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 "> {priority} </p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 "> {assignedTo} </p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 "> {status} </p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 text-blue-600 hover:underline " onClick={(data:any)=>{setSelectedTask(data); setShow(true); setAddTask(false)}} > View Details </p>
                                        
                                    </span>
                                )
                            })}
                            </div>
                        </div>
                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] ">
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
                                <p className="text-sm">Showing 1-15 of 60</p>
                            </span>
                        </span>
                    </div>
            </div>}
        </div>
    )
}

export default SalesTaskPage