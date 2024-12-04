import { FlameKindling } from 'lucide-react';
import Link from 'next/link';
import ColorControl from '@/components/darkmode/ColorControl';
export default function Navbar() {
  return (
    <nav className="bg-base-300 text-base-content">
      <div className="container navbar">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl gap-2">
            <FlameKindling className="w-11 h-10" />
            Veritas
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="#home">Home</Link></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-300 rounded-t-none p-2">
                  <li><Link href="#about">About</Link></li>
                  <li><Link href="#contact">Contact</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center w-10 h-10">
          <ColorControl />
        </div>
      </div>
    </nav>
  )
}