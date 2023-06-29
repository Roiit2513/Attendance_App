'use client'

import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const addUser = async (email: any) => {
    console.log("adduser function")
    try {
        const res = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
    } catch (error) {
        console.log(error)
    }
}

export default async function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            console.log(session);
            if (!session) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        }
        securePage()
    }, [])

    if (loading) {
        return (
            <>
                <h2>Login to your account to acces this page.</h2>
                <Link href="/account/login">Go to Login Page</Link>
        
            </>
        )
    } 
    return (
        <>
            <h1>DashBoard Page</h1>
            {/* <p>Name : {session?.user?.name}</p>
            <p>Email id : {session?.user?.email}</p> */}
        </>
    )
}