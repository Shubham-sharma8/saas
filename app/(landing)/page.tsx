import { LandingContent } from "@/components/Landing-content";
import { TabsDemo } from "@/components/tabs-middle";
import { Footer } from "@/components/footer";
import { TypewriterEffectSmoothDemo } from "@/components/typing-effect";
import Navbar from "@/components/ui/navbar";
import { HeroHighlights } from "./(try)/conversation/text";
import  RetroGridFinal  from "@/components/magicui/retro";
import PageHome from './(try)/conversation/addHome'

import CookieConsent from '@/components/cookie-consent'


const LandingPage = () => {
  return (
    <div>
      <PageHome/>
      <Navbar />
      <HeroHighlights/>
      <RetroGridFinal/>
      <TabsDemo />
      <CookieConsent />
      <LandingContent />
      <TypewriterEffectSmoothDemo/>
      <Footer />
    </div>
  );
};

export default LandingPage;
