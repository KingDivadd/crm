'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import SalesViewContractDetails from './salesViewContractDetails'
import { get_api_auth_request } from '@/app/api/admin_api'
import Alert from '../alert'

const SalesJobsPage = () => {
    const router = useRouter()
    const [alert, setAlert] = useState({type: '', message: ''})
    const [viewDetails, setViewDetails] = useState({contractDetails: false, documentAndInvoices: false })
    const [sales_page, setSales_page] = useState({job_contract_details: null, project_information: null, project_tracking: null})
    const [pages_numbers, setPages_numbers] = useState({job_contract_page_number: 1, project_info_page_number: 1, project_tracking_page_number: 1 })

    function viewContractDetails(){
        setViewDetails({...viewDetails, contractDetails: !viewDetails.contractDetails})
    }

    function viewDocumentAndInvoice(){
        setViewDetails({...viewDetails, documentAndInvoices: !viewDetails.documentAndInvoices})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
      
        get_job_contract_details()

        get_project_information()

        get_project_progress_tracking_information()
        
    }, [])

    async function get_job_contract_details() {

        console.log('started fetching');
        
        const response = await get_api_auth_request(`auth/job-contract-details/${pages_numbers.job_contract_page_number}`)        

        if (response.status == 200 || response.status == 201){
            
            console.log('job contract details ', response.data);

            setSales_page({...sales_page, job_contract_details: response.data })

          }else{
            console.log(response);
            
            showAlert(response.response.data.err, "error")
          }
    }

    async function get_project_information() {

        console.log('started fetching');
        
        const response = await get_api_auth_request(`auth/project-information/${pages_numbers.project_info_page_number}`)

        if (response.status == 200 || response.status == 201){
            
            console.log('Project Information ', response.data);

            setSales_page({...sales_page, project_information: response.data })

          }else{
            console.log(response);
            
            showAlert(response.response.data.err, "error")
          }
    }

    async function get_project_progress_tracking_information() {

        console.log('started fetching');
        
        const response = await get_api_auth_request(`auth/project-progress-tracking/${pages_numbers.project_tracking_page_number}`)

        if (response.status == 200 || response.status == 201){
            
            
            console.log('Project tracking ', response.data);

            setSales_page({...sales_page, project_tracking: response.data })

          }else{
            console.log(response);
            
            showAlert(response.response.data.err, "error")
          }
    }
    

    return (
        <div className="w-full p-[10px] pb-[10px] relative ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            {viewDetails.contractDetails && <SalesViewContractDetails viewContractDetails={viewContractDetails}  /> }
            {(viewDetails.contractDetails == false && viewDetails.documentAndInvoices == false) &&  <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                {/* Contract details*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Job Contract Details</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Job Number</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Contract Amount</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Contract Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">HOA Sent Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">HOA Approved Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Permit Sent Date</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 "></p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">JOB1001</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">$25,000</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 1, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 2, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 10, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 15, 2024</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 text-blue-600 hover:underline " onClick={viewContractDetails}>view details</p>
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

                {/* Project Information */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Project Information</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Structure Type</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Cover Type</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Cover Size</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Cover Color</p>
                            <p className="text-sm font-semibold w-[20%] pr-2 pl-2 ">Trim Color</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Freestanding</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Lattice</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">300 sq feet</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">White</p>
                                        <p className="text-sm w-[20%] pr-2 pl-2 ">Grey</p>
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

                {/* Project Progress Tracking */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Project Progress Tracking</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Footing Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Set Post Date</p>
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Demo Date</p>
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Install Date</p>
                            <p className="text-sm font-semibold w-[14%] pr-2 pl-2 ">Electrical Date</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Inspection Date</p>
                            <p className="text-sm font-semibold w-[13%] pr-2 pl-2 ">Inspection Status</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 3, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 3, 2024</p>
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">June 4, 2024</p>
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">June 5, 2024</p>
                                        <p className="text-sm w-[14%] pr-2 pl-2 ">June 7, 2024</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">June 8, 2024</p>
                                        <p className="text-sm w-[13%] pr-2 pl-2 text-lime-600">Pass</p>
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

                {/* Financial Information */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Financial Information</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Material Cost</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Engineering Cost</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Permit Cost</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Total Cost</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">$5,000</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">$2,000</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">$500</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">$7,500</p>
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

                {/* Document upload */}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    <p className="text-xl font-semibold">Document and Invoices</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Document Type</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Uploaded Date</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">Notes</p>
                            <p className="text-sm font-semibold w-[25%] pr-2 pl-2 ">View/Download</p>
                        </span>
                        <div className="w-full h-[200px] flex flex-col justify-start items-start">
                            {[1,2,3,4,5].map((data, ind)=>{
                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Contract</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">June 12, 2024</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 ">Initial Contract Signed</p>
                                        <p className="text-sm w-[25%] pr-2 pl-2 text-blue-600 hover:underline " onClick={viewDocumentAndInvoice}>view</p>
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

export default SalesJobsPage