import { opsStages } from '@/types';
import React, { useState, useEffect } from 'react';

const OpsWorkflowSection = ({ }) => {

    return (
        <div className="flex w-full gap-[10px] ">
            {opsStages.map((stage, index) => (
                <div key={index} className="w-full bg-gray-100 rounded-lg ">
                    <h2 className="text-lg mb-4">{stage.title}</h2>
                    <div className="space-y-[10px]">
                        {stage.projects.map((project) => (
                            <div key={project.id} className="w-full bg-white p-[10px] border border-blue-600 rounded-[5px] flex flex-col gap-2">
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Project ID:</p>
                                    <p className="text-md">{project.id}</p>
                                </span>
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Project Name:</p>
                                    <p className="text-md">{project.name}</p>
                                </span>
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Status:</p>
                                    <p className="text-md">{project.status}</p>

                                </span>
                                <p className="text-sm text-blue-600 hover:underline cursor-pointer w-auto " >View Details</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpsWorkflowSection;


export const ProjectWorkFlowApproval = ()=>{

    return (
        <div className="w-full flex flex-col items-start justif-start  ">
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project ID:</p>
                <p className="text-sm">1001</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project Name:</p>
                <p className="text-sm">Project Alpha</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Status:</p>
                <p className="text-sm">Pending</p>

            </span>
        </div>
    )
}

export const ProjectWorkFlowEngineering = ()=>{

    return (
        <div className="w-full flex flex-col items-start ">
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project ID:</p>
                <p className="text-sm">1005</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project Name:</p>
                <p className="text-sm">Project Gamma</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Status:</p>
                <p className="text-sm">In Progress</p>

            </span>
        </div>
    )
}

export const ProjectWorkFlowPermitApproval = ()=>{

    return (
        <div className="w-full flex flex-col items-start ">
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project ID:</p>
                <p className="text-sm">1007</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project Name:</p>
                <p className="text-sm">Project Delta</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Status:</p>
                <p className="text-sm">Submitted</p>

            </span>
        </div>
    )
}

export const ProjectWorkFlowInstallation = ()=>{

    return (
        <div className="w-full flex flex-col items-start ">
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project ID:</p>
                <p className="text-sm">1009</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Project Name:</p>
                <p className="text-sm">Project Epilson</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start px-[10px]  h-[30px] ">
                <p className="text-sm font-light">Status:</p>
                <p className="text-sm">Scheduled</p>

            </span>

        </div>
    )
}