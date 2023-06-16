import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <p className='text-2xl'>College Attendance Record</p>
      </div>
      <div>
        <p>All in one App to maintain and keep tabs on your school / college attendeance and never miss out on your grades.</p>
        <Link href="/account/login">Login</Link>
        <Link href="/account/register">Register</Link>
      </div>
    </>
  )
}
