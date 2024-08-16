'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import SalesViewContractDetails from './salesViewContractDetails'
import { get_auth_request } from '@/app/api/admin_api'

interface Report_Dashboard__Props {
    total_lead?:number, 
    sold_lead?:number, 
    total_lead_converted?:number, 
    revenue_generated?:number, 
    total_number_of_sales_person?:number, 
    total_number_of_sales_person_pages?:number, 
    sales_persons?:any, 
    leads?:any, 
    jobs?: any
}


const SalesReportPage = () => {
    const router = useRouter()
    const [report_dashboard, setReport_dashboard] = useState<Report_Dashboard__Props | null>(null)
    const [viewDetails, setViewDetails] = useState({contractDetails: false, documentAndInvoices: false })
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)



    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    useEffect(() => {
      get_page_info(page_number)
    
    }, [])
    

    async function get_page_info(page_num:number) {
        

        const response = await get_auth_request(`auth/report-dashboard/${page_num}`)

        if (response.status == 200 || response.status == 201){
            
            setReport_dashboard(response.data)                  
            console.log(response.data)                  

        }else{            
            if (response.response){
                showAlert(response.response.data.err, "error")
            }
        }
    }

    function viewContractDetails(){
        setViewDetails({...viewDetails, contractDetails: !viewDetails.contractDetails})
    }

    function viewDocumentAndInvoice(){
        setViewDetails({...viewDetails, documentAndInvoices: !viewDetails.documentAndInvoices})
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = report_dashboard?.total_number_of_sales_person_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        get_page_info(new_page_number)

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = report_dashboard?.total_number_of_sales_person_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    return (
        <div className="w-full p-[10px] pb-[10px]">
            {viewDetails.contractDetails && <SalesViewContractDetails viewContractDetails={viewContractDetails}  /> }
            {(viewDetails.contractDetails == false && viewDetails.documentAndInvoices == false) &&  <div className="w-full h-full flex flex-col items-start justify-start gap-[30px]">
                
                {/* first section = summary stat */}
                <div className="w-full flex flex-row items-center justify-between gap-[10px] relative">
                    <span className="absolute h-[145px] bg-blue-700 -top-[10px] -left-[10px] rounded-b-[3px] " style={{width: 'calc(100% + 20px)'}}></span>

                    
                    <span className="h-[120px] flex relative items-center justify-center w-1/4 rounded-[4px] shadow-md bg-white ">

                        <span className="w-full flex flex-col items-start justify-between gap-[5px] px-[20px]">
                            <p className="text-md">Total Lead</p>
                            <p className="text-sm">{report_dashboard?.total_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm">Last 30 days</p>
                        </span>

                    </span>

                    <span className="h-[120px] flex relative items-center justify-center w-1/4 rounded-[4px] shadow-md bg-white ">

                        <span className="w-full flex flex-col items-start justify-between gap-[5px] px-[20px]">
                            <p className="text-md">Lead Sold</p>
                            <p className="text-sm">{report_dashboard?.sold_lead?.toLocaleString() || 0}</p>
                            <p className="text-sm">Last 30 days</p>
                        </span>

                    </span>

                    <span className="h-[120px] flex relative items-center justify-center w-1/4 rounded-[4px] shadow-md bg-white ">

                        <span className="w-full flex flex-col items-start justify-between gap-[5px] px-[20px]">
                            <p className="text-md">Revenue Generated</p>
                            <p className="text-sm">${report_dashboard?.revenue_generated?.toLocaleString() || 0}</p>
                            <p className="text-sm">Last 30 days</p>
                        </span>

                    </span>
                    
                    <span className="h-[120px] flex relative items-center justify-center w-1/4 rounded-[4px] shadow-md bg-white ">

                        <span className="w-full flex flex-col items-start justify-between gap-[5px] px-[20px]">
                            <p className="text-md">Lead Converted</p>
                            <p className="text-sm">{report_dashboard?.total_lead_converted?.toLocaleString() || 0}</p>
                            <p className="text-sm">Last 30 days</p>
                        </span>

                    </span>


                </div>

                {/*Sales Performance*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                    {/* <p className="text-xl font-semibold">Sales Performance</p> */}

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] shadow-md ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-blue-700 text-white rounded-t-[3.5px]  ">
                            <p className="text-sm w-[10%] px-2  ">User Id</p>
                            <p className="text-sm w-[20%] px-2  ">Sales Person</p>
                            <p className="text-sm w-[15%] px-2  ">Lead Assigned</p>
                            <p className="text-sm w-[15%] px-2  ">Lead Converted</p>
                            <p className="text-sm w-[20%] px-2  ">Conversion Rate</p>
                            <p className="text-sm w-[20%] px-2  ">Revenue Generated</p>
                        </span>

                        {report_dashboard ? 
                        
                        <div className="w-full flex flex-col justify-start items-start" style={{height: 'calc(100vh - 315px)'}}>
                            {report_dashboard?.sales_persons.map((data:any, ind:any)=>{
                                const {first_name, last_name, user_id, user_ind} = data

                                // Find the number of leads assigned to this user
                                const user_jobs = report_dashboard.jobs.filter((data:any) => data.lead.assigned_to_id === user_id);
                                const user_Leads = report_dashboard.leads.filter((data:any) => data.assigned_to_id === user_id);
                                const lead_assigned = user_Leads.length;
                                const leads_converted = user_Leads.filter((lead:any) => lead.disposition === 'SOLD').length;
                                const conversion_rate = lead_assigned > 0 ? ((leads_converted / lead_assigned) * 100).toFixed(2): "0.00";
                                const revenue_generated = user_jobs
                                .reduce((total: any, lead: { contract_amount: any }) => total + (lead.contract_amount || 0), 0);

                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[10%] px-2 ">{user_ind}</p>
                                        <p className="text-sm w-[20%] px-2 ">{first_name} {last_name}</p>
                                        <p className="text-sm w-[15%] px-2 ">{lead_assigned}</p>
                                        <p className="text-sm w-[15%] px-2 ">{leads_converted}</p>
                                        <p className={`text-sm w-[20%] px-2 ${ Number(conversion_rate) > 70 ? 'text-green-600' : Number(conversion_rate) > 50 ? 'text-amber-600' : 'text-red-600'
                                        }`}
                                        >
                                        {conversion_rate}%
                                        </p>

                                        <p className="text-sm w-[20%] px-2 ">${Number(revenue_generated).toLocaleString()}</p>
                                    </span>
                                )
                            })}
                        </div> : 

                        <div className="w-full h-[250px] flex items-center justify-center" style={{height: 'calc(100vh - 315px)'}}>
                            <p className="text-sm font-normal">Loading Data...</p>
                        </div>
                        
                        }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_page_numbers()}
                                </span>
                                <p className="text-sm cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-15 of {(report_dashboard && report_dashboard?.total_number_of_sales_person) || 0}</p>
                            </span>
                        </span>
                    </div>
                </div>

            </div>}

        </div>
    )
}

export default SalesReportPage