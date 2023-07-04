'use client';
import React, { useState } from "react";
import Calendar from "react-calendar";
import "@/CSS/calendarStyles.css";

export default function CalendarBox(){

    const [date, setDate] = useState(new Date());

    const onChange = (date: any) => {
        setDate(date);
    }
    return(
        <>
        <div className="w-1/2 min-h-full bg-stone-500 flex flex-col items-center">
            <h1 className="m-8 text-4xl underline decoration-double decoration-1 underline-offset-4 font-serif">{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</h1>
            <div className="my-2">
                <Calendar onChange={onChange} value={date}/>
            </div>
        </div>
        </>
    )
}