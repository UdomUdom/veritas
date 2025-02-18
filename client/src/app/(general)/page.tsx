"use client";
import Hero from "@/components/Hero";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="container mx-auto">
      <header
        id="home"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Hero className=" text-center md:text-left px-4 ">
            <h1 className="text-3xl font-bold md:text-5xl leading-tight">
              Design Your Journey
              <br /> Elevate Your{" "}
              <span className="text-emerald-500 drop-shadow-[0px_0px_53px_rgba(0,255,64,0.5)] hover:drop-shadow-[0px_0px_53px_rgba(0,255,64,1)] duration-300">
                Experience
              </span>
              <br /> Shape the Future
            </h1>
            <p className="text-default-600 opacity-90 mt-4 w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis, metus eget ultricies mollis, justo diam suscipit purus,
              nec tincidunt velit arcu id felis.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
              <Link href="#" className="w-full md:w-auto">
                <Button className="w-full font-medium" color="primary">
                  Get Started
                  <MoveRight size={24} />
                </Button>
              </Link>
              <Link href="#" className="w-full md:w-auto">
                <Button
                  className="w-full font-medium"
                  color="default"
                  variant="bordered"
                >
                  Get in touch
                </Button>
              </Link>
            </div>
          </Hero>
          <Banner />
        </div>
      </header>
      <main
        id="details"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <article>
          <section className="flex flex-col justify-center items-center">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            facilisis, metus eget ultricies mollis, justo diam suscipit purus,
            nec tincidunt velit arcu id felis. Donec auctor, libero
          </p>
        </article>
      </main>
      <main
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <section>
          <h2>Contact us</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            maxime eveniet eum delectus aut, dicta deleniti cum iure placeat
            quidem aspernatur vitae sunt, repudiandae deserunt rem eos
            perferendis natus tempora.
          </p>
        </section>
      </main>
    </div>
  );
}
