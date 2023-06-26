import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='m-4'>
        <p className='text-2xl'>College Attendance Record</p>
      </div>
      <div className='m-4'>
        <p>All in one App to maintain and keep tabs on your school / college attendeance and never miss out on your grades.</p>
        <div className="m-4">
          <Link href="/account/login" className="bg-black text-white p-2">Login</Link>
        </div>
        <div className="m-4">
          <Link href="/account/register" className="bg-black text-white p-2">Register</Link>
        </div>
      </div>
    </>
  )
}
