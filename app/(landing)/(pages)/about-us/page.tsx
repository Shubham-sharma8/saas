"use client";
import React from "react";

import { Footer } from "@/components/footer";
import SparklesPreview from "@/components/ui/sparks";
import { CardHoverEffectDemo } from "./(routes)/card-hover";
import { AnimatedTooltipPreview } from "./(routes)/founder";
import { AnimatedPinDemo } from "./(routes)/casouselabout";
import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingPage: React.FC = () => {
  return (
    <div className="mt-12">
      <SparklesPreview buttonText="About us" />
      <AnimatedTooltipPreview />
      <div className="flex flex-row items-center justify-center  w-full md:text-1xl text-1xl lg:text-2xl font-semibold ">
        <p> Meet our Founder and CEO</p>
      </div>
      <CardHoverEffectDemo />
      <AnimatedPinDemo />

      <Footer />
    </div>
  );
};

export default LandingPage;
