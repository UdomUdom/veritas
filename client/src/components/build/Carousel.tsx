"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as Crs,
  CarouselContent,
  CarouselSlide,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Carousel({ children }: { children?: React.ReactNode }) {
  return (
    <Crs plugins={[Autoplay({ delay: 5000 })]} opts={{ loop: true }}>
      <div className="relative">
        <CarouselSlide
          slide="prev"
          className="absolute left-8 z-10 top-1/2 transform -translate-y-1/2 rounded-full bg-opacity-30 duration-300"
        >
          <ArrowLeft />
        </CarouselSlide>
        <CarouselContent>{children}</CarouselContent>
        <CarouselSlide
          slide="next"
          className="absolute right-8 z-10 top-1/2 transform -translate-y-1/2 rounded-full bg-opacity-30 duration-300"
        >
          <ArrowRight />
        </CarouselSlide>
      </div>
    </Crs>
  );
}
