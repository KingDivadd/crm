import { SalesFunnelProps, salesFunnelStages } from '../../../types/index';
import React, { useState, useEffect } from 'react';

const OpsSalesFunnelSection = ({ }) => {

    return (
        <div className="flex w-full gap-[10px] funnel-cont">
            {salesFunnelStages.map((stage, index) => (
                <div key={index} className="w-full bg-gray-100 rounded-lg ">
                    <h2 className="text-lg mb-4">{stage.title}</h2>
                    <div className="space-y-[10px]">
                        {stage.projects.map((project) => (
                            <div key={project.id} className="w-full bg-white p-[10px] border border-blue-600 rounded-[5px] flex flex-col gap-2">
                                <span className="w-full flex flex-col items-start gap-2 justitfy-start">
                                    <p className="text-md font-light">Project ID:</p>
                                    <p className="text-md">{project.id}</p>
                                </span>
                                <span className="w-full flex flex-col items-start gap-2 justitfy-start">
                                    <p className="text-md font-light">Project Name:</p>
                                    <p className="text-md">{project.name}</p>
                                </span>
                                <span className="w-full flex flex-col items-start gap-2 justitfy-start">
                                    <p className="text-md font-light">Status:</p>
                                    <p className="text-md">{project.status}</p>

                                </span>
                                <p className="text-sm text-blue-600 hover:underline cursor-pointer w-1/2  " >View Details</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpsSalesFunnelSection;


export const SalesfunnelLeadGen = ({})=>{

    return (
        <div className="w-full flex flex-col px-[10px] ">
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm">Project Info</p></span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">ID:</p>
                <p className="text-sm">10023</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Name:</p>
                <p className="text-sm">Project Alpha</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Status:</p>
                <p className="text-sm">New</p>
            </span>
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm text-blue-600 hover:underline">view details</p></span>
        </div>
    )
}

export const SalesfunnelQualification = ({})=>{

    return (
        <div className="w-full flex flex-col px-[10px] ">
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm">Project Info</p></span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">ID:</p>
                <p className="text-sm">10023</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Name:</p>
                <p className="text-sm">Project Gamma</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Status:</p>
                <p className="text-sm">In Progress</p>
            </span>
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm text-blue-600 hover:underline">view details</p></span>
        </div>
    )
}

export const SalesfunnelProposal = ({status}:SalesFunnelProps)=>{

    return (
        <div className="w-full flex flex-col px-[10px] ">
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm">Project Info</p></span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">ID:</p>
                <p className="text-sm">10023</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Name:</p>
                <p className="text-sm">Project Gamma</p>
            </span>
            <span className="w-full flex flex-row item-center justify-start h-[30px] gap-3">
                <p className="text-sm">Status:</p>
                <p className="text-sm">{status || "Proposal Sent"}</p>
            </span>
            <span className="w-full flex item-center justify-start h-[30px]"><p className="text-sm text-blue-600 hover:underline">view details</p></span>
        </div>
    )
}