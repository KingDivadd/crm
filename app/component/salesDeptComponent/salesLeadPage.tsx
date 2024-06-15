'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import ViewLead from './salesViewLead';

const SalesLeadPage = () => {
    const [userArray, setUserArray] = useState([{lastName: "Iroegbu", firstName: "David", email: 'ireugbudavid@gmail.com', phone: '07044907610', role: 'Sales', status: 'active',password: 'user1password' }, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}, {lastName: "Ayeni", firstName: "Peace", email: 'ayenipeace@gmail.com', phone: '09026030392', role: 'Technician', status: 'inactive', password: 'user2password'}])
    const [addUsers, setAddUsers] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
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

    function viewLead(data:any) {
        setSelectedUser(data)
        setAddUsers(true)
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            {addUsers ? <ViewLead addUsers={addUsers} setAddUsers={setAddUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> 
            :
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[30px] pt-[10px]">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold text-black">All Leads</p>
                        <p className="text-sm text-black">135</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="w-[300px] h-[40px] ">
                                <input type="text" name="userName" placeholder='Search by name or phone number' id="" className='normal-input bg-gray-100 ' />
                            </span>
                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'disposition'} dropArray={['Sold', 'Not Sold']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        

                    </span>
                </span>

                {/* user table */}

                <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Phone Number</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Appointment Date</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Disposition</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Details</p>
                        </span>
                        <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                            <div className='h-auto w-full flex flex-col justify-start '>
                            {userArray.map((data, ind)=>{
                                const {lastName, firstName, email, role, status,} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[25%] pr-2 pl-2 "> {lastName} {firstName} </p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 "> 07044907610 </p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 "> June 14, 2024 </p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 "> Sold </p> {/*sold , not sold*/}
                                        <p className="text-sm w-[15%] pr-2 pl-2 text-blue-600 hover:underline" onClick={viewLead}> view details</p>
                                        
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

export default SalesLeadPage