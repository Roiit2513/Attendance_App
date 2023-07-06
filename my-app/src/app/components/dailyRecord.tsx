"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { RingLoader } from 'react-spinners';

import { useAuth } from "@/firebase/auth";
import { collection, addDoc, getDocs, where, query, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';


export default function DailyRecord(props: any) {
    const { authUser, isLoading } = useAuth();
    const [record, setRecord] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);
    const subjects = props.subjects;
    const [toggle, setToggle] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(false);
    const [docId, setDocId] = useState<string>("");

    const currDate = useAppSelector((state) => state.currDateReducer.value.DateString);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [total, setTotal] = useState<any[]>([]);

    useEffect(() => {
        setRecord([]);
        if (!!authUser.email) {
            fetchData();
        }
    }, [currDate])
    useEffect(() => {
        console.log(toggle);
        console.log(record);
    }, [toggle]);
    useEffect(() => {
        UpdateDocument();
    }, [toggleSubmit])

    const fetchData = async () => {
        try {
            setLoader(true);
            const q = query(collection(db, 'subjects'), where("owner", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const document = doc.data();
                setAttendance(document.attendance);
                console.log(currDate);
                if(document.attendance.find((obj: any) => obj.date == currDate)){
                    const object = document.attendance.find((obj: any) => obj.date == currDate);
                    setRecord(object.record);
                } else {
                    subjects.forEach((subject: string) => {
                        const object = {
                            subject: subject,
                            status: "NoClass",
                        }
                        setRecord(record => [...record, object]);
                    });
                }
                setTotal(document.total);
                setDocId(doc.id);
            });
            setLoader(false);
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }

    const handleSelect = (e: any) => {
        let newArr = record;
        newArr.forEach((ele: any) => {
            if (ele.subject == e.target.name) {
                ele.status = e.target.value;
            }
        })
        setRecord(newArr);
        setToggle(!toggle);
        console.log(record);
    }
    const handleSubmit = async () => {
        const newArr = attendance.filter(obj => {return obj.date !== currDate});
        setAttendance(newArr);
        const object = {
            date: currDate,
            record: record,
        }
        console.log(object);
        let newTotal = total;
        record.forEach((ele: any) => {
            newTotal.forEach((sub: any) => {
                if(sub.subject == ele.subject){
                    if(ele.status == "Present"){
                        sub.presentCount = sub.presentCount + 1;
                    }
                    if(ele.status == "Absent"){
                        sub.absentCount = sub.absentCount + 1;
                    }
                    sub.percentage = ((sub.presentCount)/(sub.presentCount + sub.absentCount))*100;
                }
            })
        });
        setAttendance(attendance => [...attendance, object]);
        setTotal(newTotal)
        setToggleSubmit(!toggleSubmit);
    }
    const UpdateDocument = async () => {
        try {
            setLoader(true);
            console.log("document id : ", docId);
            console.log(attendance);
            const docRef = doc(db, "subjects", docId);
            await updateDoc(docRef, {
                attendance: attendance,
                total: total,
            })
            setLoader(false);
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }
    return (loader) ? 
    (
        <div className="flex w-1/2 h-screen justify-center items-center">
            <RingLoader
                color="#000000"
                size={200}
            />
        </div>
    )
    :
     (
        <>
            <div className="w-1/2 flex flex-col items-center bg-stone-200 min-h-full">
                <p className="underline underline-offset-4 mt-8 mb-2 text-4xl uppercase font-serif">Daily</p>
                <p className="underline underline-offset-4 mb-8 text-4xl uppercase font-serif"> Record</p>
                {(record.length) ?
                    (
                        record.map((obj) => {
                            return (
                                <div key={obj.subject} className="flex bg-stone-700 w-3/4 my-2 rounded-md justify-between items-center">
                                    <p key={obj.subject + "heading"} className="py-2 px-8 text-white font-mono text-xl">{obj.subject}</p>
                                    <div key={obj.subject} className="flex">
                                        <button key={obj.subject + "Present"} id={obj.subject + "Present"} name={obj.subject} value="Present" className={(obj.status == "Present") ? "p-2 m-2 my-4 rounded-lg bg-stone-300" : "p-2 m-2 my-4 rounded-lg bg-stone-500"} onClick={handleSelect}>Present</button>
                                        <button key={obj.subject + "Absent"} id={obj.subject + "Absent"} name={obj.subject} value="Absent" className={(obj.status == "Absent") ? "p-2 m-2 my-4 rounded-lg bg-stone-300" : "p-2 m-2 my-4 rounded-lg bg-stone-500"} onClick={handleSelect}>Absent</button>
                                        <button key={obj.subject + "NoClass"} id={obj.subject + "NoClass"} name={obj.subject} value="NoClass" className={(obj.status == "NoClass") ? "p-2 m-4 my-4 rounded-lg bg-stone-300 w-max" : "p-2 m-4 my-4 rounded-lg bg-stone-500 w-max"} onClick={handleSelect}>No Class</button>
                                    </div>
                                </div>
                            )
                        }
                        )
                    ) :
                    <p>No subject</p>
                }
                <div className="flex w-3/4 justify-end">
                    <button className="rounded-3xl m-4 bg-green-600 p-4 hover:rounded-none" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}