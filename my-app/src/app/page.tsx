import Image from 'next/image'
import Link from 'next/link'
import "@/CSS/home.css";

export default function Home() {
  return (
    <>
      <div className='m-4'>
        <p id='title' className='text-2xl text-center'>College Attendance Record</p>
      </div>
      <div className='m-4'>
        <p className='text-center'>All in one App to maintain and keep tabs on your school / college attendance and never miss out on your grades.</p>
      </div>
    </>
  )
}
