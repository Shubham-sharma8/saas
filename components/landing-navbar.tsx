import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react'

import { UserButton, currentUser } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';


const font = Montserrat({ weight: '600', subsets: ['latin'] });
type Props = {}


export const LandingNavbar = async (props: Props) => {
  const user = await currentUser()


  return (
    
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
        <Image fill alt="Logo" 
           className="block dark:hidden"
           src="/logo.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
           <Image
            fill
            alt="Dark Mode Logo"
            src="/logo_white.png"
            className="hidden dark:block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />        </div>
        <div>
          <h1 className={cn('text-2xl font-bold', font.className)}>Cogify</h1>
        </div>
      </Link>
     
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative w-30 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm "
        >
          {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> */}
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {user ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        {user ? <UserButton afterSignOutUrl="/" /> : null}
                <MenuIcon  className="md:hidden" />

        
      </aside>
    </nav>
  );
};
