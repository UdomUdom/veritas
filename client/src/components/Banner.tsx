import Image from "next/image";
import apple from "@/asset/apple.gif";
export default function Banner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-full max-w-2xl h-[400px] overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="absolute w-64 h-64 bg-black/10 dark:bg-white/10 rounded-full blur-lg animate-bounce-slow"
            style={{ top: "20%", left: "10%" }}
          ></div>
          <div
            className="absolute w-48 h-48 bg-black/20 dark:bg-white/20 rounded-full blur-md animate-float"
            style={{ bottom: "15%", right: "10%" }}
          ></div>
          <div
            className="absolute w-32 h-32 bg-black/10 dark:bg-white/10 rounded-full blur-sm animate-bounce-slow"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center items-center">
            <Image
              src={apple}
              width={280}
              height={280}
              alt="A juicy red apple with a leaf"
              priority
              className=" animate-bounce-slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
