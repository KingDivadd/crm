import { JobListProps } from '@/types'
import React from 'react'

export const JobListNumber = () => {
    return (
        <div className="w-full flex flex-col items-start justify-between px-3">
            <p className="text-sm h-[30px] ">1001</p>
            <p className="text-sm h-[30px] "></p>
            <p className="text-sm h-[30px] "></p>
        </div>
    )
}

export const JobListCustomerName = () => {
    return (
        <div className="w-full flex flex-col items-start justify-between px-3">
            <p className="text-sm h-[30px] ">Jode Doe</p>
            <p className="text-sm h-[30px] "></p>
            <p className="text-sm h-[30px] "></p>
        </div>
    )
}

export const JobListInstallDates = () => {
    return (
        <div className="w-full flex flex-col items-start justify-between px-3">
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Install Dates:</p>
                <p className="text-sm  ">June 21, 2024</p>
            </span>
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Set Post:</p>
                <p className="text-sm  ">June 23, 2024</p>
            </span>
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Install:</p>
                <p className="text-sm  ">June 25, 2024</p>
            </span>
        </div>
    )
}


export const JobListProjectDetails = () => {
    return (
        <div className="w-full flex flex-col items-start justify-between px-3">
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Design:</p>
                <p className="text-sm  ">Attached</p>
            </span>
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Materials:</p>
                <p className="text-sm  ">Combo</p>
            </span>
            <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px]">
                <p className="text-sm  font-light">Cover Color:</p>
                <p className="text-sm  ">Green</p>
            </span>
        </div>
    )
}

export const JobListBar = ({title, value}:JobListProps)=>{

    return (
        <span className="w-full flex flex-row items-center justify-start gap-3 h-[30px] ">
            <p className="text-md font-light">{title}:</p>
            <p className="text-md ">{value}</p>
        </span>
    )
}