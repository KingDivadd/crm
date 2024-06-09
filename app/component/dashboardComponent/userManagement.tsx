'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DropDown from '../dropDown';
import AddUsers from "../dashboardComponent/subComponent/addUser"

const UserManagement = () => {
    const [addUsers, setAddUsers] = useState(false)
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        userRole: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        userRole: 'User Role', status: 'Status'

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
            {addUsers ? <AddUsers addUsers={addUsers} setAddUsers={setAddUsers} /> 
            :
            <div className="w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Users</p>
                        <p className="text-sm text-black">127</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="h-[40px] w-[150px]">
                                <DropDown handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Active', 'Inactive']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <span className="w-[250px] h-[40px] ">
                                <input type="text" name="userName" placeholder='Enter name or email' id="" className='normal-input ' />
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDown handleSelectDropdown={handleSelectDropdown} title={'userRole'} dropArray={['Admin', 'Sales', 'Operation', 'Designer', 'Customer', 'Technician', 'Finance']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <button className="h-[40px] w-[180px] bg-blue-700 hover:bg-blue-800 text-white rounded-[3px] flex items-center justify-center gap-3" onClick={()=>{setAddUsers(true); console.log('yes')}}> <IoAddOutline size={20}/>
                            Add New User</button>

                    </span>
                </span>

                {/* user table */}

                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-t-[5px] ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Email</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Role</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Action</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                            <div className='h-auto w-full flex flex-col justify-start '>
                            {[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list ">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Iroegbu David </p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">irg.gdit@gmail.com</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">Technician</p>
                                        <p className={(ind % 2 === 1) ? "text-sm text-green-500 w-[15%] pr-2 pl-2 ": "text-sm text-red-500 w-[15%] pr-2 pl-2 "}>{(ind % 2 === 1) ? "Active" : "InActive"}</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-lime-600"><MdEdit size={16} /> Edit</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-red-400"><MdDeleteForever size={18} /> Delete</p>
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

export default UserManagement