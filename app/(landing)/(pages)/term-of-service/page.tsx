import { Terms } from "./(routes)/terms";
import  SparklesPreview  from "@/components/ui/sparks";
// import { LandingMiddle } from "@/components/landing-navmiddle";

import { Footer } from "@/components/footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service", 
  description: "Unleash AI Creativity",
}


const LandingPage = () => {
    return ( 
        <div className="mt-12">
           
            {/* <LandingMiddle /> */}
            <SparklesPreview buttonText="Terms of Service" />
            <Terms />
            <Footer/>
        </div>
    );
}
 
export default LandingPage;