'use client'
import { PipelineProps } from '@/types';
import React, {useState, useEffect} from 'react';

const KanbanBoard = ({showDetails, setShowDetails}:PipelineProps) => {
    const stages = [
        {
        title: "New Leads",
        leads: [
            { id: 101, name: "John Doe" },
            { id: 106, name: "Sarah Connor" },
            { id: 110, name: "Bruce Wayne" },
        ],
        },
        {
        title: "Contacted",
        leads: [
            { id: 102, name: "Jane Smith" },
            { id: 107, name: "Tom Hanks" },
        ],
        },
        {
        title: "Proposal Sent",
        leads: [
            { id: 103, name: "Mike Taylor" },
        ],
        },
        {
        title: "Closed (Sold)",
        leads: [
            { id: 105, name: "Emma Johnson" },
            { id: 108, name: "Bob Marley" },
        ],
        },
        {
        title: "Closed (Not Sold)",
        leads: [
            { id: 104, name: "Alice Brown" },
            { id: 109, name: "Carol White" },
        ],
        },
    ];

    return (
        <div className="flex w-full  gap-[10px] ">
        {stages.map((stage, index) => (
            <div key={index} className=" w-1/5 bg-gray-100 rounded-lg ">
                <h2 className="text-lg  mb-[10px]">{stage.title}</h2>
                <div className="space-y-2">
                    {stage.leads.map((lead) => (
                    <div key={lead.id} className="bg-white p-[10px] border border-blue-600 rounded-[5px] flex flex-col gap-2">
                        <p className="text-md ">Lead ID: {lead.id}</p>
                        <p className="text-sm ">Customer Name:</p>
                        <p className="text-sm"> {lead.name}</p>
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer" onClick={()=>{setShowDetails(!showDetails)}} > view details</p>
                    </div>
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
};

export default KanbanBoard;
