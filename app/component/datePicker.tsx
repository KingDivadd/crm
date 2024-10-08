'use client'
import { SelectDateProps } from '@/types';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const MyDatePicker = ({clickedDate, setClickedDate}: SelectDateProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
    if (clickedDate !== ''){
        setDate(new Date(clickedDate));
    }
    }, [clickedDate])

    const onChange = (newDate:any) => {
        setDate(newDate);
        setClickedDate(formatDate(newDate))
    };

    function formatDate(dateString:string) {
        const date = new Date(dateString);
        const options:any = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
        return formattedDate;
    }
        
    return (
        <div className=" h-full ">
            <Calendar
                value={date}
                onChange={onChange}
                // calendarType="US" 
                className={'custom-calendar h-full '}
            />
        </div>
    );
};

export default MyDatePicker;

//

type PermitDates = {
    contract_date: string;
    hoa_permit_submit_date: string;
    hoa_permit_approval_date: string;
    engineering_permit_submit_date: string;
    engineering_permit_approval_date: string;
    general_permit_submit_date: string;
    general_permit_approval_date: string;
};

export interface DateProps {
    clickedDate: string;
    title: keyof PermitDates; // Ensuring it's keyof PermitDates
    setClickedDate: (field: keyof PermitDates, clickedDate: string) => void;
}

export const DatePicker = ({ clickedDate, setClickedDate, title }: DateProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // if (clickedDate !== '') {
        // setDate(new Date(clickedDate)); // Set the date when clickedDate changes
        // }
    }, [clickedDate]);

    

    const onChange = (newDate: any) => {
        setDate(newDate); // Update local state with the new date
        const formattedDate = formatDate(newDate);
        setClickedDate(title, formattedDate); // Pass the title (field name) and the formatted date
    };

    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).toUpperCase(); // Format the date
    }

    return (
        <div className="h-full">
        <Calendar
            value={date}
            onChange={onChange} // Handle date change
            className="custom-calendar h-full"
        />
        </div>
    );
};

type CalenderDates = {
    footing_date: string;
    set_post_date: string;
    demo_date: string;
    install_date: string;
    electrical_date: string;
    inspection_date: string;
}


export interface InstallDateProps {
    clickedDate: string;
    title: keyof CalenderDates; // Ensuring it's keyof PermitDates
    setClickedDate: (field: keyof CalenderDates, clickedDate: string) => void;
}

export const InstallDatePicker = ({ clickedDate, setClickedDate, title }: InstallDateProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // if (clickedDate !== '') {
        // setDate(new Date(clickedDate)); // Set the date when clickedDate changes
        // }
    }, [clickedDate]);

    

    const onChange = (newDate: any) => {
        setDate(newDate); // Update local state with the new date
        const formattedDate = formatDate(newDate);
        setClickedDate(title, formattedDate); // Pass the title (field name) and the formatted date
    };

    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).toUpperCase(); // Format the date
    }

    return (
        <div className="h-full">
        <Calendar
            value={date}
            onChange={onChange} // Handle date change
            className="custom-calendar h-full"
        />
        </div>
    );
};


// Installation Dates

type InspectionDates = {
    footing_inspection_date: string;
    set_post_inspection_date: string;
    demo_inspection_date: string;
    install_inspection_date: string;
    electrical_inspection_date: string;
    final_inspection_date: string;
};


export interface InspectionDateProps {
    clickedDate: string;
    title: keyof InspectionDates; 
    setClickedDate: (field: keyof InspectionDates, clickedDate: string) => void;
}

export const Installation_date_picker = ({ clickedDate, setClickedDate, title }: InspectionDateProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // if (clickedDate !== '') {
        // setDate(new Date(clickedDate)); // Set the date when clickedDate changes
        // }
    }, [clickedDate]);

    

    const onChange = (newDate: any) => {
        setDate(newDate); // Update local state with the new date
        const formattedDate = formatDate(newDate);
        setClickedDate(title, formattedDate); // Pass the title (field name) and the formatted date
    };

    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).toUpperCase(); // Format the date
    }

    return (
        <div className="h-full">
        <Calendar
            value={date}
            onChange={onChange} // Handle date change
            className="custom-calendar h-full"
        />
        </div>
    );
};
