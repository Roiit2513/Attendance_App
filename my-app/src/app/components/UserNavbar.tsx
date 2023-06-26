'use client';

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const UserNavbar = () => {
    const { data: session } = useSession()

    return (
        <>
            {session ? (
                <ul className='flex'>
                    <li>
                        <p className="p-2 mx-8 my-1">Welcome {session?.user?.name}</p>
                    </li>
                    <li>
                        <button className='p-2 mx-8 my-1' onClick={() => signOut()}>Logout</button>
                    </li>
                </ul>
            )
                : (
                    <ul className='flex'>
                        <li className="p-2 mx-8 my-1">
                            <Link href="/account/login">Login</Link>
                        </li>
                        <li className="p-2 mx-8 my-1">
                            <Link href="/account/register">Register</Link>
                        </li>
                    </ul>)
            }
        </>
    )
}

export default UserNavbar;