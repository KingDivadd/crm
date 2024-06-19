'use client'
import React, {useState, useEffect} from 'react'
import DropDown, { DropDownBlank, DropDownBlankTransparent } from '../../component/dropDown';
import { AddUsersProps, OpsInvoiceProps, } from '../../../types';
import Alert from '../alert';
import { IoMdArrowBack } from "react-icons/io";
import { userResponsibilities } from '../../../constants';
import MyDatePicker from '../datePicker';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import ImageUploader, { FlexibleImageUploader } from '../imageUploader';
import DeleteInvoiceModal from "./opsDeleteInvoice"

const OpsViewInstall = ({addInvoice, selectedInvoice, setAddInvoice, setSelectedInvoice, setShow, show}:OpsInvoiceProps) => {

    const [selectedItem, setSelectedItem] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [invoice, setInvoice] = useState({invoiceType: '', uploadDate: '', cost: '', jobNumber: ''})

    const [inputError, setInputError] = useState({lastNameError: false, firstNameError: false, emailError: false, phoneError: false, roleError: false, passwordError: false})
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [clickedDate, setClickedDate] = useState('')
    const [showCalender, setShowCalender] = useState(false)

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        invoiceType: false
    });
    const [dropElements, setDropElements] = useState({
        invoiceType: 'SELECT'
    })

    useEffect(() => {
        setInvoice({...invoice, uploadDate: clickedDate})
        setShowCalender(false)
    }, [clickedDate])


    // useEffect(() => {
    //     if (auth.lastName){setInputError({...inputError, lastNameError: auth.lastName === ''})}
    //     if (auth.firstName){setInputError({...inputError, firstNameError: auth.firstName === ''})}
    //     if (auth.email){setInputError({...inputError, emailError: auth.email === ''})}
    //     if (auth.phone){setInputError({...inputError, phoneError: auth.phone === ''})}
    //     if (auth.password){setInputError({...inputError, passwordError: auth.password === ''})}
    // }, [auth])

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

    function handleChange(e:any){
        const name = e.target.name
        const value = e.target.value
        setInvoice({...invoice, [name]:value})
    }

    function triggerAlert(type:string, message: string){
        setAlert({type: type, message: message})
        setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 3000);
    }

    async function handleSubmit(e:any){
        if(false){
           
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setShow(false)
                    triggerAlert('success', 'Task Added successfully')
            }, 3000);
        }
    }

    async function updateTask(e:any){
        if(false){
            triggerAlert('warning', 'Please fill all required fields.')

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                    setShow(false)
                    triggerAlert('success', 'Task updated successfully')
            }, 3000);
        }
    }

    async function deleteTask(){
        
        setShowModal(true)
    }

    return (
        <div className="w-full relative h-full p-[10px] pb-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[15px] pt-[10px]">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={()=>{setShow(false)}}>
                        <IoMdArrowBack size={23} className='text-blue-600' />All Invoice</p>
                        <p className="text-md text-black">155</p>
                        
                    </span>
                    <span className="h-full flex flex-row items-center justify-end gap-4">
                        {!addInvoice ? <span className="w-auto h-auto flex flex-row items-center justify-end gap-3">
                            <p className="text-lg ">Lead ID:</p>
                            <p className="text-lg font-semibold">INV1001</p>
                        </span> : <p className="text-lg font-semibold">Adding New Invoice</p> }                        
                    </span>
                </span>


                <div className="w-full flex flex-row items-start justify-between bg-white px-[10px] py-[10px] rounded-[5px] border border-blue-600 gap-[10px] ">
                    {/* left side for inputs */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <span className="w-full flex flex-col items-start justify-start gap-2 ">
                            <h4 className="text-md font-light">Invoice Type</h4>
                            <span className="h-[40px] w-full z-30">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'invoiceType'} dropArray={['Duralum', '4K', 'JS Services']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Upload Date</h4>
                            <div className="w-full flex flex-col items-end justify-end relative z-20 ">
                                <button className="rounded-[3px] h-[40px] w-full text-md bg-transparent border border-gray-400 font-light flex flex-row items-center justify-between px-[10px]" onClick={()=>{setShowCalender(!showCalender)}}>
                                    {invoice.uploadDate ? invoice.uploadDate :  "Select Date"}
                                    <span className="h-full w-[15px]  flex items-center justify-center cursor-pointer">
                                        {showCalender ?  <FaCaretUp  /> : <FaCaretDown  />}
                                    </span>
                                </button>
                                {showCalender && <div className="absolute top-[45px] left-0 min-h-[290px] w-auto mx-auto pt-[1px] flex flex-row items-start justify-center w-full ">
                                    <MyDatePicker clickedDate={clickedDate} setClickedDate={setClickedDate} />
                                </div>}
                            </div>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Cost</h4>
                            <input type="text" name='cost' className='normal-input' value={invoice.cost} onChange={handleChange} />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Job Number</h4>
                            <input type="text" name='jobNumber' className='normal-input' value={invoice.jobNumber} onChange={handleChange} />
                        </span>

                        
                        
                        

                        {/* -----------------------END OF COLUMN------------------------------- */}
                        
                        
                    </div>
                    {/* -------------------------BEGINNING OF THE RIGHT COLUMB------------------- */}
                    <div className="w-[50%] flex flex-col items-start justify-start gap-4">
                        <span className="w-full invoice-img-cont flex flex-col items-start justify-start gap-2">
                            <FlexibleImageUploader id={'user-image'} title={"Upload Invoice"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg'} />
                        </span>
                    </div>
                            
                </div>

                <div className="w-full flex flex-row justify-between">
                    {addInvoice ? <p></p> 
                    : 
                    <button className=" w-[170px] h-[40px] text-white bg-red-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center" onClick={deleteTask} disabled={delLoading}>
                        {delLoading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Delete Task'}
                    </button> }

                    <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    {!addInvoice  ? <button className=" w-[150px] h-[40px] text-white bg-amber-600 rounded-[5px] hover:bg-amber-500 flex items-center justify-center" onClick={updateTask} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Save Changes'}
                    </button>
                    :
                    <button className=" w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Add Task'}
                    </button>}
                    </span>
                </div>

            </div>
            {showModal && <DeleteInvoiceModal showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setShow={setShow} show={show} />}
        </div>
    )
}

export default OpsViewInstall