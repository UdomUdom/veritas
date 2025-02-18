"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Banner from "@/components/Banner";
import Detail from "@/components/Detail";
import { FeatureCard } from "@/components/Card";
import { FireExtinguisher } from "lucide-react";

export default function Home() {
  const item = [
    {
      logo: <FireExtinguisher size={24} />,
      title: "Feature 1",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      logo: <FireExtinguisher size={24} />,
      title: "Feature 2",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      logo: <FireExtinguisher size={24} />,
      title: "Feature 3",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      logo: <FireExtinguisher size={24} />,
      title: "Feature 3",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section
        id="home"
        className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]"
      >
        <div className="relative z-20 flex flex-col w-full gap-6 lg:w-1/2 xl:mt-10 px-4 sm:px-6 lg:px-8">
          <div className="leading-8 text-center md:text-left">
            <div className="inline-block max-w-full">
              <div className="leading-tight text-center md:text-left">
                <h1 className="tracking-tight inline font-bold text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,4rem)] lg:text-5xl">
                  Embark on&nbsp;
                </h1>
                <h1 className="tracking-tight inline font-bold text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,4rem)] lg:text-5xl">
                  your path&nbsp;
                </h1>
                <h1 className="tracking-tight inline font-bold text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,4rem)] lg:text-5xl">
                  transform your&nbsp;
                  <span className="text-emerald-500 drop-shadow-[0px_0px_15px_rgba(0,255,64,0.5)] hover:drop-shadow-[0px_0px_25px_rgba(0,255,64,1)] transition duration-300 ease-in-out">
                    perspective&nbsp;
                  </span>
                  build the tomorrow
                </h1>
              </div>
            </div>
          </div>
          <h2 className="md:w-1/2 text-base lg:text-lg font-normal text-gray-600 dark:text-gray-400 block max-w-full !w-full text-center md:text-left lg:pr-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            repellendus, amet deserunt placeat eligendi qui consequatur, quae
            nulla porro obcaecati?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 ">
            <Link href="#" className="w-full md:w-auto">
              <Button className="w-full font-medium py-3 px-6" color="primary">
                Get Started
                <MoveRight size={24} />
              </Button>
            </Link>
            <Link href="#" className="w-full md:w-auto">
              <Button
                className="w-full font-medium py-3 px-6"
                color="default"
                variant="bordered"
              >
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 ">
          <Banner />
        </div>
      </section>
      <section
        id="details"
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 "
      >
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Details</h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            maxime eveniet eum delectus aut, dicta deleniti cum iure placeat
            quidem aspernatur vitae sunt, repudiandae deserunt rem eos
            perferendis natus tempora.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-8">
          <Detail />
        </div>
        <div className="max-w-4xl w-full text-center my-12">
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-6">Features</h3>
          <p className="text-lg sm:text-xl leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            maxime eveniet eum delectus aut, dicta deleniti cum iure placeat
            quidem aspernatur vitae sunt, repudiandae deserunt rem eos
            perferendis natus tempora.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {item.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        <section className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Contact us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            maxime eveniet eum delectus aut, dicta deleniti cum iure placeat
            quidem aspernatur vitae sunt, repudiandae deserunt rem eos
            perferendis natus tempora.
          </p>
        </section>
      </section>
    </main>
  );
}
