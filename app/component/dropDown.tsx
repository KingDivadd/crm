'use client'
import { DropDownProps } from '@/types';
import React from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';

const DropDown = ({title, dropArray, handleDropMenu, handleSelectDropdown, dropElements, dropMenus, setDropElements, setDropMenus }: DropDownProps) => {
    
    return (
        <div className="relative flex h-auto items-center justify-start w-[60%] w-full">
            <span onClick={()=> {handleDropMenu(title)}} className="flex flex-row item-center jusitify-between w-full h-[40px] cursor-pointer rounded-[3px]">
                <span className="flex flex-1 h-full items-center justify-start px-3 bg-white rounded-l-[3px] border border-gray-400 text-black text-[17px">{dropElements[title]}</span>
                <span className="flex flex-row w-[35px] h-full items-center justify-center bg-blue-700 text-white rounded-r-[3px] border border-sky-600">
                    {dropMenus[title] ? <FaCaretUp  /> : <FaCaretDown  />}
                </span>
            </span>

            {dropMenus[title] && 
            <span className="absolute flex flex-col justify-start items-center w-full h-auto top-[45px] left-0 rounded-[6px] z-2 border border-slate-400 shadow-xl bg-white">
                {dropArray.map((data, ind)=>{
                    return (
                        <span onClick={()=> {handleSelectDropdown(data, title)} } key={ind} className="regular-drop-element">{data}</span>
                    )
                })}
            </span>
            }
        </div>
    )
}

export default DropDown

export const DropDownBlank = ({title, dropArray, handleDropMenu, handleSelectDropdown, dropElements, dropMenus, setDropElements, setDropMenus }: DropDownProps) => {
    
    return (
        <div className="relative flex h-auto items-center justify-start w-[60%] w-full">
            <span onClick={()=> {handleDropMenu(title)}} className="flex flex-row item-center jusitify-between w-full h-[40px] cursor-pointer rounded-[3px]">
                <span className="flex flex-1 h-full items-center justify-start px-3 bg-white rounded-l-[3px] border border-gray-400 border-r-0 text-black text-[17px">{dropElements[title]}</span>
                <span className="flex flex-row w-[35px] h-full items-center justify-center  text-black rounded-r-[3px] border border-gray-400 border-l-0 bg-white">
                    {dropMenus[title] ? <FaCaretUp  /> : <FaCaretDown  />}
                </span>
            </span>

            {dropMenus[title] && 
            <span className="absolute flex flex-col justify-start items-center w-full h-auto top-[45px] left-0 rounded-[6px] z-2 border border-slate-400 shadow-xl bg-white">
                {dropArray.map((data, ind)=>{
                    return (
                        <span onClick={()=> {handleSelectDropdown(data, title)} } key={ind} className="regular-drop-element">{data}</span>
                    )
                })}
            </span>
            }
        </div>
    )
}

export const DropDownBlankTransparent = ({title, dropArray, handleDropMenu, handleSelectDropdown, dropElements, dropMenus, setDropElements, setDropMenus }: DropDownProps) => {
    
    return (
        <div className="relative flex h-auto items-center justify-start w-[60%] w-full">
            <span onClick={()=> {handleDropMenu(title)}} className="flex flex-row item-center jusitify-between w-full h-[40px] cursor-pointer rounded-[3px]">
                <span className="flex flex-1 h-full items-center justify-start px-3 rounded-l-[3px] border border-gray-400 border-r-0 text-black text-[17px">{dropElements[title]}</span>
                <span className="flex flex-row w-[35px] h-full items-center justify-center  text-black rounded-r-[3px] border border-gray-400 border-l-0 ">
                    {dropMenus[title] ? <FaCaretUp  /> : <FaCaretDown  />}
                </span>
            </span>

            {dropMenus[title] && 
            <span className="absolute flex flex-col justify-start items-center w-full h-auto top-[45px] left-0 rounded-[6px] z-2 border border-slate-400 shadow-xl bg-white">
                {dropArray.map((data, ind)=>{
                    return (
                        <span onClick={()=> {handleSelectDropdown(data, title)} } key={ind} className="regular-drop-element">{data}</span>
                    )
                })}
            </span>
            }
        </div>
    )
}

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