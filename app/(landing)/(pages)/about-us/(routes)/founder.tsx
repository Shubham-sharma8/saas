"use client";
import React from "react";

import { AnimatedTooltip } from "@/components/pages/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Shubham Sharma",
    designation: "Developer - Cogify",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczO8yoAMymiHU6BNv-yGj4yTQz6gPqYoavPmLDq4H5XMu-FfwMEc5otew2KZrIa40MCQGFOa2feMO_7u99BZhUjaN02TKW3ife7X0NdvMjJKdjkggLICoQuokpBGd3mx0CDFs6qaA-IRg1OZ5gVZtyRVuK6d7eKxlJsAKgtsCb1I9yT2_wEudIjEIFIjKYYSONgezKsmfDiVGjG8hdjZf3w00GlVLVQagapA9GjAeqmdPabAhBrJ4Jt8jbJbzztPFY2RWdvOEA_p0GDxOpmOqCpsLfKdSF3SqKNk0y8DHpITKrSslzAtQMt0Sr4Vto_g5weKL7VBxwIuAuA6gbyBbWCL0hirSbSrReTkTypdAb1ByvX8al0v0D9lorMis2g3Q4rLmZre7e_28lYyjGm-ZSinQlbIV0RG4QkXzD7UpNPfuI3v02WpOvjqDsw0HPnn2a4kOoXsChrdv9lFQUkBCM8m1CalI8MwBzhqZcLTobtKcovgVyzHU_z__NUlnK9FzmNB6MFmCH__6QyOfQmX8gZ90TASSgTKydLCHTD2QPOGJGOCNGWJ3R9U8s4jtAb4mV9AqBip8DcrPd4Aa0Re8_MFZDAp4zZliRd94BcT5uk8lOoTIzqPWh1uQYjP3sXKHQCut_ALQ4SEdjf1aZLCn_MGPgLDk52pyX0emVf4N7wjMv8oBAK0xsiRNU1n0jLpBAacTu7Fae4mfu6Hzpnp0AXQXEa-O0SVYUM1nd5TNkyGxqjHbLO-DIPJz98Zu9qmIoSudQ28xB_-xlH8UIUoIyTnvJwz6FlBd_QPBDmaHALwGyjkLoEilspfAjnjDFc-svKbmXIwi9W1gC8itLZcVWJPaxDyQ1XkrZQrrlPA2kdEB5i_dH56Iqe_VSzTk2e3-rkHt5l5WMUat9db1d127UHwb5WITZujRR2sBzH-TWImt051NwAcTdi8Gco-YPY_VEmVoIKwAukpKvquvgiIHiznv6lpAB_HLykM9jEYbDvZTrLTOLADnvChPdn2LjbJFxcJwLhi_3RTo5N36LkowDWD5K3_01Z7nXUeh8SCKBKMiIz7o6vQZUXunENmJct9Ww5yqK-g-a8QKQ6z1n47SjkH8DpnRi95AIqE2iRdUTPj=w330-h220-no?authuser=2",
  },
  {
    id: 2,
    name: "Vishal",
    designation: "Developer - Cogify",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMWOS-OM4wYlH0SHqOaGDSHfK52YKkU5OsvdtzM40IdYXg6ArSzi0dlUDjA1eK_ZZIJiaZDKpsA0lVYpiwp9LCviTavzLTTH_EzWoYudcYItauajMIYVHSW8uM_8y5PuCyUvSwl3afnWnPjK4r2MeQY9oMgnZsQ3GNcRtzpRdk0X0BYOyie8us3plhJtokUP_T9G-IO4A81c_t9YcP8XX7CZh-Jufcfvrw0SbCOCKUgJp6nAG9e24aU5I_vjTXa14G666XaRfeDylgPhXqtWRSPL_RbSB3-EeEPE7d1T0g4B_o0_yeAdOz-DPP5XHOKypxQVZYFXtHkqfuZLzr8iJy5TQD7CLpIqHj0_pvZpq9POCuDBdQIWT_HQ1XYKPpEhUVcsEXa17nSbCp2DhLe_E7tVfynFMdgrS1L-H2Tevh--fY_fRSG3eqdrx_OkbgFn1XTZoVhxtqz79gWciuRgtz-fYbCm4THVx1tNT5NKH0ER5BcAncQWkhz0SgKLCp7phgcYzuo4hRKiIB74LvSlplHi5hYVq3rGdTGrRk28u-CUYMP7G7ao4jHE6OdyjgBZgk4EsiXjn2EM1Jq4arHVg8tvkigcoYuY41lZpbCeErkyy4TDXP2nbursulXMvN152s0BRvWRGW_gJrp_mqm1zejs2j0v1EQoyiYVYzf6fWP48lEdoRbIg9wA2Wj3SV10fIonlYAR4R36g5SHmHkqib-OkXRzpmLCkTefpKLoGsI1-onMqtqX8dPnwbGOe6-AscB7sZueja2b3yazD51v298P0VMS8gJpBvr3sqhyClVsCy7bG_KqCZloiMmVIa-tkqylqQ2hQmEvtlezBz5tSOqjYR62ZoMTP1f57FXa0bJMORi27TD3nK-mezAO_9heXOxdpW9a9SNrYVduqRZhuI-59PN1mt9P8oi135-2MoPbW_qBDkDxM-nt3r8KTZEkJDUrvS84avfzKOG_u_T6Km3Cfs5G8B1HMmHS8xJlS5AJyhTN1-1QFMRJ3DghssjKf7hcsaqA5RxHZOeDa-OpBKWy_vMIMfUf6RERUbRYAzENgnGLFks2mo7JLRc-XGBYiWof2D_Cn_1i5yoEcVEPGMH7-Kdx79doEW_4Dy4KFHW=w1030-h1280-s-no?authuser=2",
  },
  // {
  //   id: 3,
  //   name: "Jane Smith",
  //   designation: "Data Scientist",
  //   image:
  //     "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  // },
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
