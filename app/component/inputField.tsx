import { InputProps } from '@/types'
import { Combobox } from '@headlessui/react'
import { useState } from 'react'

const Input = ({ title, placeholder }: InputProps) => {
    const [query, setQuery] = useState('')

    return (
        <div className='flex-1 max-sm:w-full flex-col gap-10 justify-start items-center mb-6'>
            <h4 className='text-lg font-[400] mb-4'>{title}</h4>
            <Combobox>
                <div className="relative w-full">
                    <Combobox.Input 
                        className="w-full h-16 px-4 rounded-md text-lg border border-gray-200 focus:outline-none"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                </div>
            </Combobox>
        </div>
    )
}

export default Input;
