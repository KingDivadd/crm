'use client'
import { useState } from "react"

import SearchManufacturer from "./searchManufacturer"

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('')

    const handleSearch = ()=>{

    }
    return (
        <form className='flex flex-col max-sm: flex-col w-full relative max-sm: gap-4 max-w-3xl' onSubmit={handleSearch} bg-red-200 >
            <div className="flex-1 max-sm: w-full flex justify-start items-center relative bg-yellow-200">
                <p>First Names</p>
                <SearchManufacturer 
                manufacturer={manufacturer}
                setManufacturer={setManufacturer} />
            </div>
        </form>
    )
}

export default SearchBar