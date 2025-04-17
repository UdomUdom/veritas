"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as Crs,
  CarouselContent,
  CarouselSlide,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface corouselProps {
  hidden?: boolean;
  children?: React.ReactNode;
}

export function Carousel({ hidden, children }: corouselProps) {
  return (
    <Crs plugins={[Autoplay({ delay: 5000 })]} opts={{ loop: true }}>
      <div className="relative">
        <CarouselSlide
          slide="prev"
          className="absolute left-8 top-1/2 transform -translate-y-1/2 rounded-full bg-opacity-30"
        >
          {hidden ? null : <ArrowLeft />}
        </CarouselSlide>
        <CarouselContent>{children}</CarouselContent>
        <CarouselSlide
          slide="next"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 rounded-full bg-opacity-30"
        >
          {hidden ? null : <ArrowRight />}
        </CarouselSlide>
      </div>
    </Crs>
  );
}
