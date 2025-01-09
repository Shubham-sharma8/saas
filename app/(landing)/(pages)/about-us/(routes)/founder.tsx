"use client";
import React from "react";

import { AnimatedTooltip } from "@/components/pages/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Shubham Sharma",
    designation: "Developer - Cogify",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczPNdzh4KBaFuG6JdIR1H6HPA_8WB_X_slJJi7vpv-GYVaPyVaunbHmyRRRalgq_V1owcaLirOGwHJVcAP6Y4Mmon5FYTSy7RQcFpJGSglIeHEmDEE2k3imOmLGGHQqXozQqxMIjNMA6gzAf9zyyNmoO=w1498-h2082-s-no?authuser=0",
  },
  {
    id: 2,
    name: "Vishal",
    designation: "Developer - Cogify",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOeN-JlFLQYD11gDr5vvLo45HVc2WY_yASVP3tplc_DYftcEEkBs-rowc0mDy8GhtZvF0gB0b3iejWBEGWgLinuJvBiSQ9mPIYtOonq2eBXu0oSJvWFapZcirYHkdSoaYIVI30sJEIA2yruP1tepk4P=w1030-h1280-s-no?authuser=0",
  },
  {
    id: 3,
    name: "Saswatayu Sengupta",
    designation: "Developer - Cogify",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOB8OK5EDaoNGIVP_aM7mW23ki_yEBzZYbG8nO3ea8XNov3oxusWStzfxvPcfbScHbVOtRouSEVeIiPY76Wp_70Tu77TJQN5aYtxVbnCs6YP_g5E73e71AK0NkqWfW0dNitrakePqrOaoYKep3oZ7d1=w959-h1280-s-no?authuser=0",
  },
  // {
  //   id: 4,
  //   name: "Emily Davis",
  //   designation: "UX Designer",
  //   image:
  //     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  // },
  // {
  //   id: 5,
  //   name: "Tyler Durden",
  //   designation: "Soap Developer",
  //   image:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  // },
  // {
  //   id: 6,
  //   name: "Dora",
  //   designation: "The Explorer",
  //   image:
  //     "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  // },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center  w-full">
      <AnimatedTooltip items={people} />
      <p> </p>
    </div>
  );
}
