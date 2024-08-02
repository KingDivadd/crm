'use client'

import React from 'react'

const LeadTable = () => {

    function render_page_numbers(){

    }

    function recent_activity_action(item: any){

    }


    return (
        <div className="w-full flex flex-col bg-white rounded-[5px] border border-blue-500">
            <span className="w-full h-[40px] flex flex-row items-center justify-start bg-white rounded-t-[5px] border-b border-gray-300">
                <p className="text-sm font-normal w-[20%] pr-2 pl-2">Activity Type</p>
                <p className="text-sm font-normal w-[20%] pr-2 pl-2">Description</p>
                <p className="text-sm font-normal w-[20%] pr-2 pl-2">User</p>
                <p className="text-sm font-normal w-[20%] pr-2 pl-2">Date</p>
                <p className="text-sm font-normal w-[20%] pr-2 pl-2">Time</p>
            </span>

            { [1,2,3].length ?
            
            <div className="w-full admin-shortcut-table-cont flex flex-col justify-start items-start">
                {[1,2,3,4,5]?.map((data: any, ind: number) => {
                    // const { details, user, created_at, action } = data;
                    return (
                    <span key={ind} className="recent-activity-table-list">
                        <p className="text-sm w-[20%] pr-2 pl-2">{'action'}</p>
                        <p className="text-sm w-[20%] pr-2 pl-2">{'details'}</p>
                        <p className="text-sm w-[20%] pr-2 pl-2">{'user'}</p>
                        <p className="text-sm w-[20%] pr-2 pl-2">{'created_at'}</p>
                        <p className="text-sm w-[20%] pr-2 pl-2">{'created_at'}</p>
                    </span>
                    );
                })}
            </div>

            :

            <div className="w-full h-[200px] flex items-center justify-center ">
                <p className="text-md font-normal">No Activity yet</p>
            </div>
            
            }

            <span className="w-full h-[40px] flex flex-row items-center justify-between bg-white rounded-b-[5px] border-t border-gray-300 px-[15px] rounded-b-[5px]">
                <span className="flex flex-row items-center justify-start gap-3 h-full">
                    <p className="text-sm cursor-pointer" onClick={() => recent_activity_action('prev')}>Prev</p>
                    <span className="w-auto h-full flex flex-row items-center justify-start">
                    </span>
                    <p className="text-sm cursor-pointer" onClick={() => recent_activity_action('next')}>Next</p>
                </span>
                <span className="flex flex-row items-center justify-end gap-3 h-full">
                    <p className="text-sm">Showing 1-15 of 20</p>
                </span>
            </span>
        </div>
    )
}

export default LeadTable