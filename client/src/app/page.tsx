"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { DividerCard, ImageCard } from "@/components/Card";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <header className="min-h-screen flex flex-col justify-center items-center">
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
        </div>
      </header>
      <main
        id="details"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <article>
          <section className="flex flex-col justify-center items-center">
            {/* <DividerCard
              image="https://picsum.photos/200"
              title="Lorem ipsum"
              subtitle="Lorem ipsum dolor sit amet"
              paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing"
              link="#"
              linkdetails="Read more"
            />

            <ImageCard
              altimg="image"
              image="https://scontent.xx.fbcdn.net/v/t1.15752-9/477064992_1153866132992113_4605356045664250075_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_ohc=rNNJ2cYtl5cQ7kNvgHlgf2r&_nc_oc=AdjLYl5k9pg75dwPDcxt7GWI8G-ogNnxfDmf7CP7KyYWp_CaCxBTVxZcSH2947s6rPM5qAc-_XQwcqgrYUISFPuC&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1gG2iV1LLuTPjdmjSEYAieW_zCI5x5eHOZ4WLZqovXlFvQ&oe=67D31062"
              title="Lorem ipsum"
              subtitle=""
              onUse={false}
            /> */}
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
      <Footer />
    </div>
  );
}
