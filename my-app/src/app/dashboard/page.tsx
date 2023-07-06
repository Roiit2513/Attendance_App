'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from "@/firebase/auth";
import { collection, addDoc, getDocs, where, query, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import DailyRecord from '@/app/components/dailyRecord';
import CalendarBox from '@/app/components/calendar';
import { RingLoader } from 'react-spinners';

export default function Dashboard() {
    const { authUser, isLoading } = useAuth();
    const [subjects, setSubjects] = useState<string[]>([]);
    const [text, setText] = useState("")
    const [temp, setTemp] = useState<string[]>([]);
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState<any[]>([])

    useEffect(() => {
        if (!isLoading && !authUser.email) {
            redirect("/account/login");
        }
        if (!!authUser.email) {
            fetchSubjects();
        }
    }, [authUser, isLoading])
    useEffect(() => {
    }, [temp])

    const handleAdd = () => {
        if (text) {
            setTemp(arr => [...arr, text])
            let object = {
                subject: text,
                presentCount: 0,
                absentCount: 0,
                percentage: 0,
            }
            setTotal(total => [...total, object]);
            setText("");
        }
    }

    const handleSubmit = async () => {
        try {
            setLoader(true);
            const docRef = await addDoc(collection(db, "subjects"), {
                owner: authUser.uid,
                email: authUser.email,
                subjects: temp,
                attendance: [],
                total: total,
            })
            console.log("Document written with ID: ", docRef.id);
            fetchSubjects();
            setLoader(false);
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }
    const fetchSubjects = async () => {
        try {
            setLoader(true);
            const q = query(collection(db, 'subjects'), where("owner", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const document = doc.data();
                setSubjects(document.subjects);

            });
            setLoader(false);
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }

    return (loader) ?
        <div className="flex w-screen h-screen justify-center items-center">
            <RingLoader
                color="#000000"
                size={400}
            />
        </div>
        :
        (
            <>
                {(subjects.length) ?
                    (
                        <>
                            <div className="flex flex-row min-h-screen">
                                <DailyRecord subjects={subjects} />
                                <CalendarBox />
                            </div>
                        </>
                    )
                    :
                    <div className='m-4'>
                        <h2 className='mx-4 my-8 text-4xl'>Add Subjects</h2>
                        {(temp.length) ? (temp.map((subject) =>
                            <p key={subject} className='mx-4 my-8 p-2 rounded bg-stone-400 inline'>{subject}</p>
                        )) : (<></>)}
                        <div className="flex m-2">
                            <input className='m-4 p-2' type="text" placeholder="Enter your subject" value={text} onChange={(e) => setText(e.target.value)} />
                            <button className='m-1 text-3xl' onClick={handleAdd}>+</button>
                        </div>
                        <button className='m-2 p-2 rounded bg-stone-700 text-white' onClick={handleSubmit}>Submit</button>
                    </div>
                }

            </>
        )
}