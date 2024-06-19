import React from 'react';
import { Task, Columns, tasks, SchedulingAndLogisticDataProps } from '@/types';

const SchedulingAndLogistics: React.FC = () => {
    const columns: Columns = {
        Scheduled: tasks.filter(task => task.status === 'Scheduled'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        Completed: tasks.filter(task => task.status === 'Completed'),
    };

    return (
        <div className="flex w-full gap-[10px] ">
            {Object.keys(columns).map((column, index) => (
                <div key={index} className="w-full rounded-lg">
                    <h2 className="text-lg mb-4">{column}</h2>
                    <div className="space-y-[10px]">
                        {columns[column as keyof Columns].map((item, idx) => (
                            <div key={idx} className="bg-white p-4 border border-blue-600 rounded-md flex flex-col gap-2">
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Task:</p>
                                    <p className="text-md"> {item.task}</p>
                                </span>
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Date: </p>
                                    <p className="text-md">{item.date}</p>
                                </span>
                                <span className="w-full flex flex-row items-center gap-3 justitfy-start">
                                    <p className="text-md font-light">Assigned Team:</p>
                                    <p className="text-md"> {item.team}</p>
                                </span>
                                <p className="text-sm text-blue-600 hover:underline cursor-pointer w-auto" onClick={() => console.log("Details clicked")}>View Details</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SchedulingAndLogistics;


export const SchedulingAndLogisticData = ({task, date, team}:SchedulingAndLogisticDataProps) =>{

    return (
        <div className="w-full flex flex-col px-[10px]  ">
            <span className="w-full flex flex-row items-center gap-3 justitfy-start h-[30px] ">
                <p className="text-sm font-light">Task:</p>
                <p className="text-sm"> {task}</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start h-[30px]  ">
                <p className="text-sm font-light">Date: </p>
                <p className="text-sm">{date}</p>
            </span>
            <span className="w-full flex flex-row items-center gap-3 justitfy-start h-[30px] ">
                <p className="text-sm font-light">Assigned Team:</p>
                <p className="text-sm"> {team}</p>
            </span>
        </div>
    )
}