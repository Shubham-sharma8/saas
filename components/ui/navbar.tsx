import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SheetDemo } from "./mainsidear";
import { currentUser } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utilsAdvace';
import { NavigationMenuMain } from "@/components/ui/navitems";
import { ModeToggle } from '..//mode-toggle'
import { UserButton } from '@clerk/nextjs'







const font = Montserrat({ weight: '600', subsets: ['latin'] });

type Props = {}

const Navbar = async (props: Props) => {
  const user = await currentUser()
  return (
    <header className="fixed right-0 left-0 top-0 h-16 px-4 bg-white dark:bg-black z-[100] flex items-center border-b border-neutral-200 dark:border-neutral-800 justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-2">
          <Image 
            fill 
            alt="Logo" 
            src="/logo.png" 
            className="block dark:hidden"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            fill
            alt="Dark Mode Logo"
            src="/logo_white.png"
            className="hidden dark:block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className={cn('text-xl font-bold', font.className)}>Cogify</h1>
      </Link>

      <nav className="hidden  md:block">
        <NavigationMenuMain />
      </nav>
      
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative h-9 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm px-4 flex items-center justify-center"
        >
          <span className="relative z-10">
            {user ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        
        {user && <UserButton afterSignOutUrl="/" />}
        <div className="hidden md:block">
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <SheetDemo />
        </div>
      </div>
    </header>
  )
}

export default Navbar
