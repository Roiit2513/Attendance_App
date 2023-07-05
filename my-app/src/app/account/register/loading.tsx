import { RingLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <RingLoader
        color="#000000"
        size={400}
      />
    </div>
  )
}