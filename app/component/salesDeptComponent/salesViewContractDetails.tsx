'use client'
import React, {useState, useEffect} from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import Alert from '../alert'
import { SalesContractDetailProps } from '../../../types'

const SalesViewContractDetails = ({viewContractDetails}:SalesContractDetailProps) => {
    const [contractDetails, setContractDetails] = useState({lastName: '', firstName: '', phone: '', email: '', designer: '', appointmentDate: '', disposition: 'notsold', contractAmount: '', contractDate: '', contractSigned: false, salesPersonNote: ''})

    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)


    function triggerAlert(type:string, message: string){
        setAlert({type: type, message: message})
        setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 2000);
    }

    async function handleSubmit(){
        if (false){

        }else{
            setLoading(true); // Set loading to true when the request starts
            
            // Simulate a login request with a timeout
            setTimeout(() => {
                triggerAlert('success', 'Contract Details updated successfully')
            }, 2000);
            setTimeout(() => {
                setLoading(false); // Set loading to false when the request completes
                viewContractDetails()
            }, 3000);
        }
    }

    function handleChange(e:any) {
        const name = e.target.value
        const value = e.target.name
    }

    
    return (
        <div className="w-full relative h-full p-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[0px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <div className="w-full h-full flex flex-col items-start justify-start gap-[20px] ">
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        
                        <p className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-start gap-2 " onClick={viewContractDetails}><IoMdArrowBack size={23} className='text-blue-600' />Back</p>
                        
                    </span>

                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md">Job Number:</p>                        
                        <p className="text-md font-semibold">JOB1001234</p>                        
                    </span>


                </span>

                <div className="view-contract-details-cont gap-2">
                    <div className="w-1/3 h-full flex flex-col items-start justify-start gap-3">
                        <p className="text-md font-semibold">Job Overview</p>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Last Name</h4>
                            <input type="text" name='lastName' className='normal-input' value={contractDetails.lastName} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">First Name</h4>
                            <input type="text" name='firstName' className='normal-input' value={contractDetails.firstName} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Email</h4>
                            <input type="text" name='email' className='normal-input' value={contractDetails.email} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Phone</h4>
                            <input type="text" name='phone' className='normal-input' value={contractDetails.phone} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Appointment Date (calender input) </h4>
                            <input type="text" name='phone' className='normal-input' value={contractDetails.phone} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Disposition (Sold Not sold)</h4>
                            <input type="text" name='phone' className='normal-input' value={contractDetails.phone} onChange={handleChange} />
                        </span>
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-start justify-start gap-3">
                        <p className="text-md font-semibold">Contract Information</p>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Contract Amount</h4>
                            <input type="text" name='contractAmount' className='normal-input' value={contractDetails.contractAmount} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Contract Date</h4>
                            <input type="text" name='contractDate' className='normal-input' value={contractDetails.contractDate} onChange={handleChange} />
                        </span>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Contract Signed (drop down)</h4>
                            <input type="text" name='contractSigned' className='normal-input' value={contractDetails.contractDate} onChange={handleChange} />
                        </span>
                        <p className="text-md font-semibold">Notes and Comments</p>
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <h4 className="text-md font-light">Salesperson Notes</h4>
                            <textarea name="salesPersonNote" id=""  defaultValue={contractDetails.salesPersonNote} onChange={handleChange}  className=' resize-none rounded-[3px] p-[10px] outline-none focus:border-blue-500 focus:border-2 border border-gray-400 w-full h-[173px]' ></textarea>
                            
                        </span>
                    </div>
                    <div className="w-1/3 h-full  flex flex-col items-start justify-start gap-3 overflow-y-auto cont-1-scrollbar ">
                        <p className="text-md font-semibold">HOA Details</p>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">HOA Required:</p>
                            <p className="text-md">Yes</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">HOA Sent Date:</p>
                            <p className="text-md">June 10, 2024</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">HOA Approved Date:</p>
                            <p className="text-md">June 10, 2024</p>
                        </span>
                        <p className="text-md font-semibold">Permit Details</p>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Permit Details:</p>
                            <p className="text-md">Yes</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Permit Sent Date:</p>
                            <p className="text-md">June 13, 2024</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Permit Number:</p>
                            <p className="text-md">PT10012</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Approved Date:</p>
                            <p className="text-md">June 14, 2024</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Permit Cost:</p>
                            <p className="text-md">$500</p>
                        </span>
                        <p className="text-md font-semibold">Engineering Details</p>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Submitted Date:</p>
                            <p className="text-md">June 15, 2024</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Received Date:</p>
                            <p className="text-md">June 15, 2024</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Engineering Cost:</p>
                            <p className="text-md">$2,000</p>
                        </span>
                        <p className="text-md font-semibold">Payment Schedule</p>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Deposit:</p>
                            <p className="text-md"> $3,000 (Paid on June 15, 2024)</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Scheduling:</p>
                            <p className="text-md"> $3,000 (Due on June 16, 2024)</p>
                        </span>
                        <span className="h- w-full flex flex-row items-start justify-start gap-3">
                            <p className="text-md font-light">Delivery:</p>
                            <p className="text-md"> $3,000 (Due on June 17, 2024)</p>
                        </span>
                        <span className="h- w-full flex flex-col items-start justify-start gap-3 ">
                            <p className="text-md font-light ">Construction Completion:</p>
                            <p className="text-md  "> $3,000 (Due on June 18, 2024)</p>
                        </span>
                        <span className="h- w-full flex flex-col items-start justify-start gap-3">
                            <p className="text-md font-light">Electrical Completion:</p>
                            <p className="text-md"> $3,000 (Due on June 18, 2024)</p>
                        </span>
                    </div>

                </div>
            </div>
            <span className="w-full h-[40px] flex justify-end px-[10px] ">
                    <button className="mt-[10px] w-[150px] h-[40px] text-white bg-blue-600 rounded-[5px] hover:bg-blue-500 flex items-center justify-center" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'Save Changes'}
                    </button>
            </span>
        </div>
    )
}

export default SalesViewContractDetails