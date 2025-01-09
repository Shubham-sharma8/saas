import React from 'react';
import Navbar from "@/components/ui/navbar";


const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow overflow-auto">
       
                   {children}
                
      </main>
    </div>
  );
};

export default LandingLayout;

