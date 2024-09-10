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
                <div className="w-full h-screen flex items-center rounded-lg overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[85%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-white  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {modalFor == 'view' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] rounded-[3px] p-[15px] pt-0 ">
                                    <div className="w-full flex flex-row items-center justify-between border-b border-slate-200 h-[55px] ">
                                        <p className="text-md font-semibold  text-slate-800 ">View pipeline: <strong>{selectedPipeline.pipeline_ind}</strong> </p>
                                        
                                    </div>

                                    <div className="w-full flex items-start justify-start gap-[15px] h-[50vh] overflow-y-auto ">

                                        <div className="w-full flex flex-col items-center justify-start gap-[60px]">
                                            {/* the first row 1. Lead created 2. Lead sold, 3. Job & Project Created */}

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="active-pipeline-box-flow-1">
                                                    <p className="text-[15px] text-blue-600 ">Lead Created</p>
                                                </span>

                                                <span className="pipeline-box-flow-1">
                                                    <p className="text-[15px] ">Lead Sold</p>
                                                </span>

                                                <span className={false ? "active-pipeline-box-flow-2": "pipeline-box-flow-2"}>
                                                    <p className="text-[15px] ">Job Created</p>
                                                </span>
                                                
                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className={false ? "active-pipeline-box-flow-1": "pipeline-box-flow-1"}>
                                                    <p className="text-[15px] ">Contract Stigned</p>
                                                </span>

                                                <span className={false ? "active-pipeline-box-flow-2": "pipeline-box-flow-2"}>
                                                    <p className="text-[15px] ">Job & Project Details Finalized </p>
                                                </span>

                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">General Permit Required</p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Engineering Permit Required </p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Hoa Permit Required </p>
                                                </span>

                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex flex-col items-center justify-center gap-[5px] ">
                                                    <p className="text-[15px] ">General Permit </p>
                                                    <p className="text-[15px] ">(Approved) </p>
                                                </span>

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex flex-col items-center justify-center gap-[5px] ">
                                                    <p className="text-[15px] ">Engineering Permit </p>
                                                    <p className="text-[15px] "> (Approved) </p>
                                                </span>

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex flex-col items-center justify-center gap-[5px] ">
                                                    <p className="text-[15px] ">HOA Permit </p>
                                                    <p className="text-[15px] "> (Approved) </p>
                                                </span>

                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Materials Ordered</p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Installation Scheduled</p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Job Begins </p>
                                                </span>

                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Installation Progress </p>
                                                </span>

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Electrical Work</p>
                                                </span>

                                                <span className="h-full w-[250px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Final Inspection</p>
                                                </span>

                                            </div>

                                            <div className="w-auto h-[80px] flex items-center justify-center gap-[100px]">

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Job Completed </p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Invoicing</p>
                                                </span>

                                                <span className="h-full w-[275px] border border-gray-400 rounded-[3px] flex items-center justify-center ">
                                                    <p className="text-[15px] ">Payment & Finalization</p>
                                                </span>

                                            </div>

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