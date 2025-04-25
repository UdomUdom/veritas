import Link from "next/link";
import HomeLogo from "@/assets/home_logo.png";
import Image from "../build/Image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={HomeLogo.src}
        alt="Logo"
        width={100}
        style={{ maxWidth: "200px", maxHeight: "50px" }}
        className="text-black dark:text-white overflow-auto"
      />
    </Link>
  );
}
