'use client';

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react';
import useFirebaseAuth, { useAuth } from "@/firebase/auth";
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

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
            <ul className='flex'>
                <li className="p-2 mx-8 my-1">
                    <Link href="">Welcome {authUser?.username}</Link>
                </li>
                <li className="p-2 mx-8 my-1">
                    <button onClick={handleSignOut}>Logout</button>
                </li>
            </ul>

        </>
    )
    :
    (
        <>
            <ul className='flex'>
                <li className="p-2 mx-8 my-1">
                    <Link href="/account/login">Login</Link>
                </li>
                <li className="p-2 mx-8 my-1">
                    <Link href="/account/register">Register</Link>
                </li>
            </ul>

        </>
    )
}

export default UserNavbar;