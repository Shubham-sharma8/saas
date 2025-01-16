
import { LandingContent } from "@/components/Landing-content";
import { TabsDemo } from "@/components/tabs-middle";
import { Footer } from "@/components/footer";
import {DataConnect} from "@/components/improved/highlighterComponent";
import  {HeroHighlights}  from "./(try)/conversation/text";
import  RetroGridFinal  from "@/components/magicui/retro";
import PageHome from './(try)/conversation/addHome'
import {SplineSceneBasic} from '@/components/improved/3d/maindemo'
import CookieConsent from '@/components/cookie-consent'


const LandingPage = () => {
  return (
    <div>
      <SplineSceneBasic/>
      <RetroGridFinal/>
      <TabsDemo />
      <CookieConsent />
      <LandingContent />
      <DataConnect />
     
      <Footer />
    </div>
  );
};

export default LandingPage;
