import Link from 'next/link'
import UserNavbar from '@/app/components/UserNavbar';
import "@/CSS/home.css";


const NavbarComp = () => {
    return(
        <>
        <div id='navbar' className="p-2 flex justify-between bg-stone-300">
            <ul id='nav-1' className="p-1 flex ">
                <li id='nav-home' className="p-1 mx-8 my-1 text-xl font-sans">
                    <Link href="/">Home</Link>
                </li>
                <li id='nav-dashboard' className="p-1 mx-8 my-1 text-xl font-sans">
                    <Link href="/dashboard">Dashboard</Link>
                </li>
            </ul>
            <UserNavbar />
        </div>
        </>
    )
}

export default NavbarComp;