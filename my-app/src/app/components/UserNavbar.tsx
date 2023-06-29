'use client';

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const UserNavbar = () => {
    return (
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