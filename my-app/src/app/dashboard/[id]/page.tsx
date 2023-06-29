'use client'

import { useSession } from 'next-auth/react'
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
const getUser = async (email: any) => {
    try {
        console.log("getUser")
        console.log(email);
        // const res = await fetch(`http://localhost:3000/api/user/${email}`, {
        //     method: "GET",
        // });

        // if (!res.ok) {
        //     throw new Error("Failed to fetch user");
        // }
        // return res.json();
        return;
    } catch (error) {
        console.log("Error loading user: ", error);
    }
}
export default async function DashboardWithId({ params }: { params: any }) {
    const { data:session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/account/login")
        },
    })
    if(status === "authenticated"){
        const email = (params.id).replace("%40", "@");
        await getUser(email);
        
        return (
            <>
                <div>
                    <p className="text-4xl">hahahahah email</p>
                    {/* <p>id: {user._id}</p>
                    <p>email: {user.email}</p> */}
                </div>
            </>
        )

    }
}