import {  Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RazorpayButton from '../components/RazorpayButton';



export const FreeCounter = ({
  
}) => {
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  


  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
             Consider donating to development of this project.
            </p>
            
            </div>
            
          
          <div className="text-center" > 
          <RazorpayButton />
      </div>
        </CardContent>
      </Card>
    </div>
  )
}