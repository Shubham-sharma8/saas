"use state";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-cards";
import Link from "next/link";

export function Card1() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
      
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Claymation-style elderly woman watering a garden with an orange watering can surrounded by flowers and trees.{" "}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/a57ea900-d7d5-4b5e-bcf6-3a2ce58204b3/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export function Card2() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         Hot air balloon floating over Cappadocia&apos;s arid landscape with unique rock formations under a clear blue sky{" "}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/b6b3f5ca-621d-4917-86a3-57ce6d6814e4/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function Card3() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
Whimsical wooden robot with glowing eyes, covered in grass and flowers, holding a bluebird in a vibrant meadow with a waterfall and trees in the background.        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/ef90e63e-ce43-4592-831f-83bf25982861/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function Card4() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-semibold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Whimsical wooden robot with glowing eyes, covered in grass and flowers, holding a bluebird in a vibrant meadow with a waterfall and trees in the background.{" "}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/33b09afa-aed8-42c0-8dca-ec2cf05e8568/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function Card5() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-semibold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          A stunning still-life with vibrant flowers in a blue porcelain vase, fruits on the table, and a dark background in classic Dutch style{" "}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/82e69067-fef8-4411-861c-c6237b8296ff/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
export function Card6() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-semibold text-neutral-600 dark:text-white"
        >
          Image Generation
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Comic-style sunset scene with two figures standing on a grassy hill and a speech bubble saying, 'The sun will rise again..{" "}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ucarecdn.com/7bc3dbe3-caab-4751-86da-12b42f676e5a/-/preview/960x672/"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
          <Link href="/dashboard">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Get start →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
