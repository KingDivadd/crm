'use client'
import { DropDownProps } from '@/types';
import React from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';

const DropDown = ({title, dropArray, handleDropMenu, handleSelectDropdown, dropElements, dropMenus, setDropElements, setDropMenus }: DropDownProps) => {
    
    return (
        <div className="relative flex h-auto items-center justify-start w-[60%] w-full">
            <span onClick={()=> {handleDropMenu(title)}} className="flex flex-row item-center jusitify-between w-full h-[35px] cursor-pointer rounded-[3px]">
                <span className="flex flex-1 h-full items-center justify-start px-3 bg-slate-100 rounded-l-[3px] border border-slate-500 text-slate-600 text-sm">{dropElements[title]}</span>
                <span className="flex flex-row w-[35px] h-full items-center justify-center bg-sky-600 text-white rounded-r-[3px] border border-sky-600">
                    {dropMenus[title] ? <FaCaretUp  /> : <FaCaretDown  />}
                </span>
            </span>

            {dropMenus[title] && 
            <span className="absolute flex flex-col justify-start items-center w-full h-auto top-[40px] left-0 rounded-[6px] z-10 border border-slate-400 shadow-xl ">
                {dropArray.map((data, ind)=>{
                    return (
                        <span onClick={()=> {handleSelectDropdown(data, title)} } key={ind} className="drop-element">{data}</span>
                    )
                })}
            </span>
            }
        </div>
    )
}

export default DropDown

export const SmallDropDown = ({title, dropArray, handleDropMenu, handleSelectDropdown, dropElements, dropMenus, setDropElements, setDropMenus }: DropDownProps) => {
    
    return (
        <div className="relative flex h-auto items-center justify-start w-[60%] w-full">
            <span onClick={()=> {handleDropMenu(title)}} className="flex flex-row item-center jusitify-between w-full h-[28px] cursor-pointer rounded-[3px]">
                <span className="flex flex-1 h-full items-center justify-start px-3 bg-slate-100 rounded-l-[3px] border border-slate-500 text-slate-600 text-sm">{dropElements[title]}</span>
                <span className="flex flex-row w-[35px] h-full items-center justify-center bg-sky-600 text-white rounded-r-[3px] border border-sky-600">
                    {dropMenus[title] ? <FaCaretUp  /> : <FaCaretDown  />}
                </span>
            </span>

            {dropMenus[title] && 
            <span className="absolute flex flex-col justify-start items-center w-full h-auto top-[40px] left-0 rounded-[6px] z-10 border border-slate-400 shadow-xl ">
                {dropArray.map((data, ind)=>{
                    return (
                        <span onClick={()=> {handleSelectDropdown(data, title)} } key={ind} className="drop-element">{data}</span>
                    )
                })}
            </span>
            }
        </div>
    )
}