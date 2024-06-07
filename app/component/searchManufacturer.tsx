'use client'
import { SearchManufacturerProps } from '@/types'
import React from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState, Fragment } from 'react'

const SearchManufacturer = ({manufacturer, setManufacturer}:SearchManufacturerProps) => {
    const [query, setQuery] = useState('')

    return (
        <div className='flex-1 max-sm: w-full flex justify-start items-center'>
            <Combobox>
                <div className="relative w-full">
                    
                    <Combobox.Input 
                    className="w-full h-[48px] p-4 rounded-[10px] bg-light-white outline-none cursor-pointer text-sm bg-blue-100"
                    displayValue={(manufacturer: string) => manufacturer}
                    onChange={(e)=>setQuery(e.target.value)} />
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer