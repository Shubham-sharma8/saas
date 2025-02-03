"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export function ClaudeCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Claude 3.5 Sonnet
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Anthropic&apos;s most powerful AI model. Claude 3.5 Sonnet outperforms
          competitor models and Claude 3 Opus at higher speeds
        </CardItem>
        <Link href="/claude-3.5" className="flex items-center">
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://beginswithai.com/wp-content/uploads/2024/06/claude-3.5-sonnet.png.webp"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </Link>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/claude-3.5"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Claude 3.5 Sonnet
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function ImagenCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Imagen 3
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          This brings Google&apos;s state of the art image generative AI,
          products that transform their user&apos;s imagination into high
          quality visual assets using AI generation, in seconds.
        </CardItem>
        <Link href="/image" className="flex items-center">
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://images.gizbot.com/webp/img/2024/10/whatsappimage2024-10-10at4-10-16pm1-1728556960.jpeg"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </Link>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/imagen3"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Imagen3
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function Gpt4o() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          GPT-4o
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          OpenAI&apos;s most advanced model yet—setting new benchmarks for
          performance, speed, and innovation in every conversation{" "}
        </CardItem>
        <Link href="/chatgpt" className="flex items-center">
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://lh3.googleusercontent.com/pw/AP1GczPVJ_XFQGNu3ghhrxWzMNJ65sQyj0zRDZaLrQ_3JcRfPLO_NS0YmPsDXIV1wVtNd-VytkcEIYwTNM5-uJsHgjAE2_Q64GnkdYlBhtciB4Wpliexqy527TrOlxoz4iSuK6ui2PIIEGXq_68KqRi89LscfQ=w1200-h628-s-no?authuser=0"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </Link>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/chatgpt"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Gpt-4o
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
