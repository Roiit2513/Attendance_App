'use client';

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react';
import useFirebaseAuth, { useAuth } from "@/firebase/auth";
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import "@/CSS/home.css";

const UserNavbar = () => {
    const { authUser, isLoading } = useAuth();
    const [logout, setLogout] = useState(false);
    const { signOut } = useFirebaseAuth();

    if(logout){
        redirect("/account/login");
        setLogout(false);
    }
    const handleSignOut = async () => {
        await signOut();
        setLogout(true);
    }

    return (!isLoading && authUser.email) ? 
    (
        <>
            <ul id='nav-2' className='flex text-xl font-sans'>
                <li id='nav-login' className="p-2 mx-8 my-1">
                    <Link href="">Welcome {(authUser?.username)}</Link>
                </li>
                <li id='nav-register' className="p-2 mx-8 my-1">
                    <button onClick={handleSignOut}>Logout</button>
                </li>
            </ul>

        </>
    )
    :
    (
        <>
            <ul id='nav-2' className='flex'>
                <li id='nav-login' className="p-2 mx-8 my-1">
                    <Link href="/account/login">Login</Link>
                </li>
                <li id='nav-register' className="p-2 mx-8 my-1">
                    <Link href="/account/register">Register</Link>
                </li>
            </ul>

        </>
    )
}

export default UserNavbar;