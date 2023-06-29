'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from "@/firebase/auth";

export default function Dashboard() {
    const { authUser, isLoading } = useAuth();
    useEffect(() => {
        if(!isLoading && !authUser.email){
            redirect("/account/login");
        }
    }, [authUser, isLoading])

    return(
        <>
        <h1>DashBoard Page</h1>
        </>
    )
}