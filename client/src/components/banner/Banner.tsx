import Image from "../build/Image";

interface BannerProps {
  src: string;
  alt: string;
  className?: string;
  text?: string;
}

export default function Banner({
  src,
  alt,
  className = "",
  text,
}: BannerProps) {
  return (
    <div className={`relative w-full overflow-hidden shadow-lg ${className}`}>
      <div>
        <Image
          src={src}
          alt={alt}
          className="w-full h-auto max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover blur-xs scale-105"
        />
      </div>
      <div className="container">
        <h1>
          <span className="absolute top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl font-bold">
            {text}
          </span>
        </h1>
      </div>
    </div>
  );
}
