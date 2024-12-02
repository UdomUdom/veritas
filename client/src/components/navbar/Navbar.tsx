import { LampFloor } from 'lucide-react';
import Link from 'next/link';
import { Darkmode } from './Darkmode';
import Droplist from './Droplist';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between py-4'>
      <Link href="/" className='flex items-center gap-2'>
        <LampFloor />
        <h1>Veritas</h1>
      </Link>
      <div className='flex items-center gap-4'>
        <Droplist text="Dropdown" options={["info 1", "info 2", "info 3"]} />
        <Darkmode />
      </div>
    </nav>
  )
}