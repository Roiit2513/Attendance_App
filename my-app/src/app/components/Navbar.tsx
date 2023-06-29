import Link from 'next/link'
import UserNavbar from '@/app/components/UserNavbar';

const NavbarComp = () => {
    return(
        <>
        <div className="p-2 flex justify-between bg-stone-300">
            <ul className="p-1 flex ">
                <li className="p-1 mx-8 my-1">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-1 mx-8 my-1">
                    {/* <Link href="/dashboard">Dashboard</Link> */}
                </li>
            </ul>
            <UserNavbar />
        </div>
        </>
    )
}

export default NavbarComp;