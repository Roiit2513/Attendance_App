"use client";
import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        await fetch('../../api/hello' , {
            method: 'POST',
            body: JSON.stringify({email, password}),
        })
    }
    return(
        <>
        <div className='m-4'>
            <p className="text-2xl">Login Page</p>
        </div>
        <div className='m-4'>
            <input className='m-2 p-1 border-b-4 focus:outline-none' type="email" name="" id="" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} />
            <input className='m-2 p-1 border-b-4 focus:outline-none' type="password" name="" id="" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)}/>
            <button className="bg-black text-white p-2 m-2" onClick={handleLogin}>Log In</button>
        </div>
        </>
    );
}