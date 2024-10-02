import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from './/mode-toggle'


const Navbar = async () => {

  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full items-center gap-4 justify-end list-none">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle/>

      </div>
    </div>
   );
}
 
export default Navbar;