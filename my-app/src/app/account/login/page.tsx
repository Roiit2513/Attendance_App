"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation";
import { useAuth } from "@/firebase/auth";



const provider = new GoogleAuthProvider();


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authUser, isLoading } = useAuth();

    useEffect(() => {
        if(!isLoading && authUser.email){
            redirect("/");
        }
    }, [authUser, isLoading])

    const handleLogin = async () => {
        if (!email || !password) {
            return;
        }
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            console.log(auth);

        } catch (error) {
            console.log("Error occured ", error);
        }
    }
    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithPopup(auth, provider);
            console.log(user);
            console.log(auth);
        } catch (error) {
            console.log("An error occured", error);
        }
    }
    return (isLoading || (!isLoading && authUser.email)) ? "Loading......." :
     (
        <>
            <div className='m-4'>
                <p className="text-2xl">Login Page</p>
            </div>
            <div className='m-4'>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <input className='m-2 p-1 border-b-4 focus:outline-none' type="email" name="" id="" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} required />
                    <input className='m-2 p-1 border-b-4 focus:outline-none' type="password" name="" id="" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} required />
                    <button type="submit" className="bg-stone-700 text-white p-2 m-2 rounded" onClick={handleLogin}>Log In</button>
                </form>
            </div>
            <br />
            <button
                className='border m-4 p-4 rounded-lg bg-stone-700 text-white'
                onClick={handleGoogleLogin}
            >
                <svg
                    aria-hidden='true'
                    focusable='false'
                    data-icon='google'
                    className='mr-8 w-5 inline'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 488 512'
                >
                    <path
                        fill='white'
                        d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                    ></path>
                </svg>
                Continue with Google
            </button>
        </>
    );
}