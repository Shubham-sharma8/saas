import { ShareActions } from '@/components/share-actions'
import prisma from '@/lib/prisma'
import { auth, getAuth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server';



const DashboardLayout = async ({ children }: { children: React.ReactNode },) => {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
      }
    const previousChats = await prisma.chatUrl.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, createdAt: true, path: true }
      })

  return (
    <div className="relative flex h-screen">
      <div className="flex-grow relative">
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <ShareActions chats={previousChats} className="your-custom-class" />
        </div>
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
