'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { DropDownBlankTransparent } from '../dropDown'
import KanbanBoard from './salesKanbanBoard'
import SalesViewPipelineDetails from './salesViewPipelineDetails'
import { get_auth_request } from '@/app/api/admin_api'
import Alert from '../alert'

interface Pipeline_Props {
    total_leads: number;
    conversion_rate: any;
    total_sales: number;
    total_sales_amount: number;
    pipeline: any;
}

const SalesPipeline = () => {
    const [pipeline, setPipeline] = useState<Pipeline_Props | null>(null)
    const router = useRouter()
    const [showDetails, setShowDetails] = useState(false)
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

    useEffect(() => {
      
        get_pipeline_data()

    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }
    
    
    async function get_pipeline_data() {

        console.log('started fetching');
        
        const response = await get_auth_request(`auth/sales-pipeline`)

        if (response.status == 200 || response.status == 201){
            
            setPipeline(response.data)      
            
            console.log('Pipeline ', response.data);
            

          }else{
            console.log(response);
            
            showAlert(response.response.data.err, "error")
          }
    }
    
    return (
        <div className="w-full h-full p-[10px] relative ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            {showDetails? <SalesViewPipelineDetails showDetails={showDetails} setShowDetails={setShowDetails} /> :  <div className="relative w-full h-full flex flex-col items-start justify-start gap-[20px] ">

                <div className="w-full flex flex-row items-center justify-between gap-[10px]">
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] bg-white w-1/3 border border-blue-500 ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Lead</p>
                            <p className="text-md font-semibold">{pipeline?.total_leads || 0}</p>
                        </div>
                    </span>
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] rounded-[5px] border border-green-600 bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Conversion Rate</p>
                            <p className="text-md font-semibold"> {pipeline?.conversion_rate != null ? `${pipeline.conversion_rate} %` : '0 %'} </p>

                        </div>
                    </span>
                    
                    
                    <span className=" flex flex-col gap-3 items-start justify-start h-[85px] border border-lime-600 rounded-[5px] bg-white w-1/3  ">
                        <div className="h-full flex flex-col justify-start items-start gap-[10px] pt-[10px]  pl-[20px] pr-[20px]  ">
                            <p className="text-xl font-semibold">Total Sales</p>
                            <p className="text-md font-semibold">${pipeline?.total_sales_amount.toLocaleString() || 0}</p>
                        </div>
                    </span>
                    
                </div>


                {/* Kanban Board*/}
                <KanbanBoard showDetails={showDetails} setShowDetails={setShowDetails} />

                {/* Pipeline Board*/}
                <div className="w-full flex flex-col items-start justify-start gap-[10px] pb-[10px] ">
                    <p className="text-xl font-semibold">Pipeline Board</p>

                    <div className="w-full min-h-[150px] flex flex-col bg-white rounded-[5px] border border-blue-500 ">
                        <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b-2 border-gray-200 ">
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Lead Id</p>
                            <p className="text-sm font-semibold w-[15%] pr-2 pl-2 ">Customer Name</p>
                            <p className="text-sm font-semibold w-[14.5%] pr-2 pl-2 ">Appointment Date</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Disposition</p>
                            <p className="text-sm font-semibold w-[13%] pr-2 pl-2 ">Contract Amount</p>
                            <p className="text-sm font-semibold w-[12.5%] pr-2 pl-2 ">Project Type</p>
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 ">Status</p>  {/* pending, inporgress, aproved*/}
                            <p className="text-sm font-semibold w-[10%] pr-2 pl-2 "></p>  
                        </span>

                        {pipeline?.pipeline ?
                        
                        <div className="w-full pipeline-cont flex flex-col justify-start items-start">
                            {pipeline?.pipeline.map((data:any, ind:number)=>{

                                const {lead_id, customer, appointment_date, disposition, contract_amount, project_type, status,   } = data

                                return (
                                    <span key={ind} className="recent-activity-table-list">
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">{lead_id}</p>
                                        <p className="text-sm w-[15%] pr-2 pl-2 ">{customer.other_names || customer.first_name}</p>
                                        <p className="text-sm w-[14.5%] pr-2 pl-2 ">{appointment_date}</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">{disposition}</p>
                                        <p className="text-sm w-[13%] pr-2 pl-2 ">${contract_amount}</p>
                                        <p className="text-sm w-[12.5%] pr-2 pl-2 ">{project_type}</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 ">{status}</p>
                                        <p className="text-sm w-[10%] pr-2 pl-2 text-blue-600 hover:underline" onClick={()=>{setShowDetails(!showDetails)}} >View Details</p>
                                        
                                    </span>
                                )
                            })}
                        </div>
                        :
                        <div className="w-full h-[200px] flex flex-col justify-center items-center">
                            <p className="text-sm font-normal">No Sales Pipeline</p>
                        </div>
                        }

                        <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t-2 border-gray-200 px-[15px] rounded-b-[5px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-sm cursor-pointer">Prev</p>
                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    <p className="text-sm font-light border border-gray-400 h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer">1</p>

                                </span>
                                <p className="text-sm cursor-pointer">Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-sm">Showing 1-15 of {(pipeline?.pipeline && pipeline?.pipeline.length) || 0}</p>
                            </span>
                        </span>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default SalesPipeline