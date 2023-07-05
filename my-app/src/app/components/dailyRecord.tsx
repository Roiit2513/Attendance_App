"use client";

import { useEffect, useState } from "react";
import Calender from "./calendar";
import { useAppSelector } from "@/redux/store";

export default function DailyRecord(props: any) {
    const [selected, setSelected] = useState("NoClass");
    const [record, setRecord] = useState<any[]>([]);
    const subjects = props.subjects;

    const currDate = useAppSelector((state) => state.currDateReducer.value.DateString);

    useEffect(() => {
        if (subjects.length) {
            subjects.forEach((subject: string) => {
                let object = {
                    subject: subject,
                    status: "NoClass",
                }
                setRecord(record => [...record, object]);
            });
        }
    }, [])
    useEffect(() => {
        console.log(record);
    }, [record])
    const handleClick = (e: any) => {
        let newArr = record;
        newArr.forEach((ele: any) => {
            if (ele.subject == e.target.name) {
                ele.status = e.target.value;
            }
        })
        setRecord(newArr);
        console.log(record);
        setSelected(e.target.value);
    }
    return (
        <>
            <div className="w-1/2 flex flex-col items-center bg-stone-200 min-h-full">
                <h1>{currDate}</h1>
                <p className="underline underline-offset-4 mt-8 mb-2 text-4xl uppercase font-serif">Daily</p>
                <p className="underline underline-offset-4 mb-8 text-4xl uppercase font-serif"> Record</p>
                {(record.length) ?
                    (
                        record.map((obj) => {
                            return (
                                <div key={obj.subject} className="flex bg-stone-700 w-3/4 my-2 rounded-md justify-between items-center">
                                    <p key={obj.subject + "heading"} className="py-2 px-8 text-white font-mono text-xl">{obj.subject}</p>
                                    <div key={obj.subject} className="flex">
                                        <button key={obj.subject + "Present"} id={obj.subject + "Present"} name={obj.subject} value="Present" className={(obj.status == "Present") ? "p-2 m-2 my-4 rounded-lg bg-stone-300" : "p-2 m-2 my-4 rounded-lg bg-stone-500"} onClick={handleClick}>Present</button>
                                        <button key={obj.subject + "Absent"} id={obj.subject + "Absent"} name={obj.subject} value="Absent" className={(obj.status == "Absent") ? "p-2 m-2 my-4 rounded-lg bg-stone-300" : "p-2 m-2 my-4 rounded-lg bg-stone-500"} onClick={handleClick}>Absent</button>
                                        <button key={obj.subject + "NoClass"} id={obj.subject + "NoClass"} name={obj.subject} value="NoClass" className={(obj.status == "NoClass") ? "p-2 m-4 my-4 rounded-lg bg-stone-300 w-max" : "p-2 m-4 my-4 rounded-lg bg-stone-500 w-max"} onClick={handleClick}>No Class</button>
                                    </div>
                                </div>
                            )
                        }
                        )
                    ) : 
                    <p>No subject</p>
                }
            </div>
        </>
    )
}