"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedPin0, AnimatedPin1, AnimatedPin2, AnimatedPin3 } from "./pins";

export function AnimatedPinDemo() {
  const cardComponents = [
    AnimatedPin0,
    AnimatedPin1,
    AnimatedPin2,
    AnimatedPin3,
  ];
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col items-center">
      {" "}
      {/* Center the carousel and slide */}
      <div className="mb-4 text-center"></div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-screen-lg"
        setApi={setApi}
      >
        {/* Increase total width */}
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1 lg:basis-1/2">
              <div className="p-1">
                {/* Use Card1 and Card2 components instead of placeholders */}
                {React.createElement(
                  cardComponents[index % cardComponents.length]
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
