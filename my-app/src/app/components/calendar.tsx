'use client';
import React, { useState } from "react";
import Calendar from "react-calendar";
import "@/CSS/calendarStyles.css";
import { setCurrDate } from "@/redux/features/date";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function CalendarBox(){

    const [date, setDate] = useState(new Date());
    const DateString = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();

    const dispatch = useDispatch<AppDispatch>();

    const onChange = (date: any) => {
        setDate(date);
        const dateString = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
        dispatch(setCurrDate(dateString));
    }
    return(
        <>
        <div className="w-1/2 min-h-full bg-stone-500 flex flex-col items-center">
            <h1 className="m-8 text-4xl underline decoration-double decoration-1 underline-offset-4 font-serif">{DateString}</h1>
            <div className="my-2">
                <Calendar onChange={onChange} value={date}/>
            </div>
        </div>
        </>
    )
}