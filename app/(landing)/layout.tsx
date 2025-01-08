import React from 'react';
import Navbar from "@/components/ui/navbar";
import GoogleCaptchaWrapper from '@/app/GoogleCaptchaWrapper';


const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow overflow-auto">
       <GoogleCaptchaWrapper>
                   {children}
                 </GoogleCaptchaWrapper> 
      </main>
    </div>
  );
};

export default LandingLayout;

