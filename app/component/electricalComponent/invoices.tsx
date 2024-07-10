'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import MyDatePicker from '../datePicker'
import { DropDownBlankTransparent } from '../dropDown'
import { HiPencil } from 'react-icons/hi'
import InvoiceModal from './invoiceModal'

const InvoicePage = () => {
    const [filter, setFilter] = useState({date: '', date2: ''})
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [clickedDate, setClickedDate] = useState('')
    const [clickedDate2, setClickedDate2] = useState('')
    const [showCalender, setShowCalender] = useState(false)
    const [edit, setEdit] = useState(false)
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
        setDropElements({...dropElements, [dropdown]: 'Status'});
    };

    const handleSelectDropdown = (dropdown: any, title: any) => {
        setDropElements({...dropElements, [title]: dropdown});
        setDropMenus({...dropMenus, [title]: false});
    }

    function viewTask(data: any) {
        setEdit(false)
        setShow(!show)
        setSelectedItem(data)
        setShowModal(!showModal)
    }

    function editTask(data:any) {
        setEdit(true)
        setShowModal(!showModal)
        setSelectedItem(null)
        setShow(!show)
    }



    return (
        <div className="w-full p-[10px] flex ">
            <div className="w-full h-full flex flex-col gap-[15px]  ">
                {/* summary tabs */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/5 border border-blue-600 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-blue-600">Total Invoices</p>
                            <p className="text-sm text-blue-600">50</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-amber-600 bg-white w-1/5  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600">Unpaid Invoices</p>
                            <p className="text-sm text-amber-600">10</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/5  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-lime-600">Paid Invoices</p>
                            <p className="text-sm text-lime-600">30</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-red-600 rounded-[5px] bg-white w-1/5  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-red-600">Overdue Invoices</p>
                            <p className="text-sm text-red-600">5</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-amber-600 rounded-[5px] bg-white w-1/5  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl text-amber-600">Amount Due</p>
                            <p className="text-sm text-amber-600">$15,000</p>
                        </div>
                    </span>
                    
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <span className="w-full h-[40px] flex items-center justify-between">
                        <p className="text-lg font-medium">Invoice List</p>

                        <span className="flex flex-end justify-end gap-3">
                            {/* <span className="h-[40px] w-[30px] cursor-pointer flex items-center justify-center " onClick={()=> setShowFilter(!showFilter)}>
                                <FaCaretRight size={22} />
                            </span> */}
                            

                            <div className="w-[175px] flex flex-col items-end justify-end relative z-10">
                                <button
                                    className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400  flex flex-row items-center justify-between px-[10px]"
                                    onClick={() => setShowCalender(!showCalender)}>

                                    {filter.date ? filter.date : "Due Date"}
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

                            <span className="h-[40px] w-[150px]">
                                <DropDownBlankTransparent
                                    handleSelectDropdown={handleSelectDropdown}
                                    title={'status'}
                                    dropArray={['All', 'UnPaid', 'Paid', 'Overdue']}
                                    dropElements={dropElements}
                                    dropMenus={dropMenus}
                                    handleDropMenu={handleDropMenu}
                                    setDropElements={setDropElements}
                                    setDropMenus={setDropMenus}
                                />
                            </span>

                            <span className="w-[200px] ">
                                <input type="text" name="" id="" placeholder='Enter project assignee' className=' normal-input bg-transparent focus:bg-transparent ' />
                            </span>

                        </span> 
                    </span>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-medium w-[15%] px-2 ">Invoice ID</p>
                            <p className="text-sm font-medium w-[15%] px-2 ">Customer Name</p>
                            <p className="text-sm font-medium w-[15%] px-2 ">Amount</p>
                            <p className="text-sm font-medium w-[15%] px-2 ">Due Date</p>
                            <p className="text-sm font-medium w-[15%] px-2 ">Status</p>
                            <p className="text-sm font-medium w-[12.5%] px-2 "></p>
                            <p className="text-sm font-medium w-[12.5%] px-2 "></p>
                        </span>
                        <div className="w-full cont-2 flex flex-col justify-start items-start overflow-y-auto">
                            <span className="w-full  flex flex-col justify-start items-start ">
                                {[1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                                    return (
                                        <span key={ind} className="recent-activity-table-list" >
                                            <p className="text-sm w-[15%] px-2 ">IV1000123</p>
                                            <p className="text-sm w-[15%] px-2 ">Jone Doe</p>
                                            <p className="text-sm w-[15%] px-2 ">$750</p>
                                            <p className="text-sm w-[15%] px-2 ">2024-07-20</p>
                                            <p className="text-sm w-[15%] px-2 ">UnPaid</p>
                                            <p className="text-sm w-[10%] px-2 flex items-center justify-start gap-3 hover:text-amber-600 " onClick={()=> editTask(data)} ><HiPencil size={11} /> Edit</p>
                                            <p className="text-sm w-[10%] px-2 flex items-center justify-start gap-3 hover:text-blue-600 " onClick={()=> viewTask(data)} > View</p>
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
           
            {showModal && <InvoiceModal edit={edit} setEdit={setEdit} showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}

        </div>
    )
}

export default InvoicePage