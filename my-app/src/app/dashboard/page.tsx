'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from "@/firebase/auth";
import { collection, addDoc, getDocs, where, query, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function Dashboard() {
    const { authUser, isLoading } = useAuth();
    const [subjects, setSubjects] = useState<string[]>([]);
    const [text, setText] = useState("")
    const [temp, setTemp] = useState<string[]>([]);
    useEffect(() => {
        if (!isLoading && !authUser.email) {
            redirect("/account/login");
        }
        if(!!authUser.email){
            fetchSubjects();
        }
    }, [authUser, isLoading])
    useEffect(() => {
    }, [temp])

    const handleAdd = () => {
        if (text) {
            setTemp(arr => [...arr, text])
            setText("");
        }
    }
    const handleSubmit = async () => {
        try {
            const docRef = await addDoc(collection(db, "subjects"), {
                owner: authUser.uid,
                email: authUser.email,
                subjects: temp,
            })
            console.log("Document written with ID: ", docRef.id);
            fetchSubjects();
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }
    const fetchSubjects = async () => {
        try {
            const q = query(collection(db, 'subjects'), where("owner", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const document = doc.data();
                setSubjects(document.subjects);

            });
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }
    return (
        <>
            {(subjects.length) ?
                (
                    <div className="m-4">
                        <h2 className='m-4'> Your Subjects</h2 >
                        {subjects.map((subject) =>
                            <p key={subject} className='my-4 mx-6 p-2 rounded bg-stone-400 inline'>- {subject}</p>
                        )}
                    </div>
                )
                :
                <div className='m-4'>
                    <h2 className='m-2'>Add Subjects</h2>
                    <div className="flex m-2">
                        <input className='m-1 p-2' type="text" placeholder="Enter your subject" value={text} onChange={(e) => setText(e.target.value)} />
                        <button className='m-1 text-3xl' onClick={handleAdd}>+</button>
                    </div>
                    <button className='m-2 p-2 rounded bg-stone-700 text-white' onClick={handleSubmit}>Submit</button>
                </div>
            }
            <h1>DashBoard Page</h1>
        </>
    )
}