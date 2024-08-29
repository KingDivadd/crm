'use client'
import React, { useState, useEffect } from 'react'
import Alert from '../alert'
import { timestamp_to_readable_value } from '../helper';


interface Pipeline_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedPipeline: any;
    setSelectedPipeline: (selectedPipeline: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const Pipeline_Modal = ({ showModal, setShowModal, selectedPipeline, setSelectedPipeline, modalFor}: Pipeline_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    function handleCloseModal() {
        setShowModal(false)
    }

    useEffect(() => {
        if (modalFor == 'add'){
        }else if (modalFor == 'view'){     
            console.log('selected pipeline ', selectedPipeline);
                   
        }
    }, [])


    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[85px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[85%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {modalFor == 'view' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[3px] p-[15px] pt-0 ">
                                    <div className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">View pipeline: <strong>{selectedPipeline.pipeline_ind}</strong> </p>
                                        
                                    </div>

                                    <div className="w-full h-full flex items-start justify-start gap-[15px]">
                                        <div className="w-1/2 h-full flex flex-col items-start justify-start gap-[10px] ">

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Job Id</p>    
                                                {selectedPipeline.job ?
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.job.job_ind}</p>   :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Lead Id</p>    
                                                {selectedPipeline.lead ?
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.lead_ind}</p>    :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Customer Name</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.customer_first_name} {selectedPipeline.lead.customer_last_name}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Address</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.state}, {selectedPipeline.lead.city}</p>    
                                            </span>
                                            
                                             <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Phone Number</p>    
                                                {selectedPipeline.lead.phone_number ? 
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.phone_number}</p>    :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Email</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.email}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Contract Amount</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">${Number(selectedPipeline.contract_amount).toLocaleString()}</p>    
                                            </span>

                                             <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Gate Code</p>    
                                                {selectedPipeline.lead.gate_code ? 
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.gate_code}</p>    :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Assigned to </p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.lead.assigned_to.first_name} {selectedPipeline.lead.assigned_to.last_name} ({selectedPipeline.lead.assigned_to.user_role}) </p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Appointment Date</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{timestamp_to_readable_value(Number(selectedPipeline.lead.appointment_date))}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Disposition</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.disposition.replace(/_/g, ' ')}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Status</p>    
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.status.replace(/_/g, ' ')}</p>    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Contract Date </p>    
                                                {selectedPipeline.job ?
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.job.contract_date}</p>  :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                             <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Cover Size </p>    
                                                {selectedPipeline.job ?
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.job.cover_size}</p>    :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}   
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[35%]">Cover Color </p>    
                                                {selectedPipeline.job ? 
                                                <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.job.cover_color}</p>    :
                                                <p className="text-sm font-medium w-[65%] text-start">-</p>}    
                                            </span>

                                        </div>

                                        <div className="w-1/2 h-full flex flex-col items-start justify-start gap-[10px] ">

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Hoa Status </p>    
                                                {selectedPipeline.job ? 
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.hoa_permit_status.replace(/_/g,' ') || '' }</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Hoa Permit Submit Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.hoa_permit_submit_date ) 
                                                ? <p className="text-sm font-medium w-[65%] text-start">{selectedPipeline.job.hoa_permit_submit_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Hoa Permit Approval Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.hoa_permit_approval_date ) ? 
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.hoa_permit_approval_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                             <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">General Permit Status </p>    
                                                {selectedPipeline.job ? <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.general_permit_status}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">General Permit Submit Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.general_permit_submit_date ) ?
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.general_permit_submit_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">General Permit Approval Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.general_permit_approval_date ) ? 
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.general_permit_approval_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Engineering Permit Status </p>    
                                                {selectedPipeline.job ? 
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.engineering_permit_status.replace(/_/g,' ')}</p>    
                                                :<p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Engineering Permit Submit Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.engineering_permit_submit_date ) ?
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.engineering_permit_submit_date}</p>   :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Engineering Permit Approval Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.engineering_permit_approval_date ) ?
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.engineering_permit_approval_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Electrical Permit Status </p>    
                                                {selectedPipeline.job ? 
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.electrical_permit_status.replace(/_/g,' ')}</p>    
                                                :<p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Electrical Permit Sent Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.electrical_permit_submit_date ) ?
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.electrical_permit_submit_date}</p>   :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>

                                            <span className="w-full flex items-center justify-start gap-[10px] ">
                                                <p className="text-sm font-normal w-[50%]">Electrical Permit Approval Date </p>    
                                                {(selectedPipeline.job && selectedPipeline.job.general_permit_approval_date ) ?
                                                <p className="text-sm font-medium w-[50%] text-start">{selectedPipeline.job.general_permit_approval_date}</p>    :
                                                <p className="text-sm font-medium w-[50%] text-start">-</p>}    
                                            </span>


                                        </div>

                                    </div>
                                        



                            </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Pipeline_Modal