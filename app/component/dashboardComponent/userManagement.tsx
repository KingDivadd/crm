'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import AddUsers from "../dashboardComponent/subComponent/addUser"
import Alert from '../alert';

const UserManagement = () => {
    const [userArray, setUserArray] = useState([{lastName: "Iroegbu", firstName: "David", email: 'ireugbudavid@gmail.com', phone: '07044907610', role: 'Sales', status: 'active',password: 'user1password' }, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}])
    const [addUsers, setAddUsers] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
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

    function editUser(data:any) {
        setSelectedUser(data)
        setAddUsers(true)
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            {addUsers ? <AddUsers addUsers={addUsers} setAddUsers={setAddUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> 
            :
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Users</p>
                        <p className="text-sm text-black">127</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Active', 'Inactive']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <span className="w-[250px] h-[40px] ">
                                <input type="text" name="userName" placeholder='Enter name or email' id="" className='normal-input bg-gray-100 ' />
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'userRole'} dropArray={['Admin', 'Sales', 'Operation', 'Designer', 'Customer', 'Technician', 'Finance']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <button className="h-[40px] w-[180px] bg-blue-700 hover:bg-blue-800 text-white rounded-[3px] flex items-center justify-center gap-3" onClick={()=>{setAddUsers(true)}}> <IoAddOutline size={20}/>
                            Add New User</button>

                    </span>
                </span>

                {/* user table */}

                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Last Name</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">First Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Email</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Role</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Status</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Action</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                            <div className='h-auto w-full flex flex-col justify-start '>
                            {userArray.map((data, ind)=>{
                                const {lastName, firstName, email, role, status,} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[15%] pr-2 pl-2 "> {lastName} </p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 "> {firstName} </p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 "> {email} </p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 "> {role} </p>
                                        <p className={(status.toLocaleLowerCase() === "active") ? "text-sm text-green-500 w-[15%] pr-2 pl-2 ": "text-sm text-red-500 w-[15%] pr-2 pl-2 "}>{(status.toLowerCase() === "active") ? "Active" : "InActive"}</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-lime-600" onClick={()=>{editUser(data)}} ><MdEdit size={16} /> Edit</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-red-400"  onClick={()=>{console.log('deleting data of index : ',ind)}} ><MdDeleteForever size={18} /> Delete</p>
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