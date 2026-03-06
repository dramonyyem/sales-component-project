import Image from "next/image";

export const Advertising = ({ ad, index, currentSlide }: any) => {
  return (
    <div
      
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={ad.image}
        alt={ad.title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{ad.title}</h2>
        <p className="mt-4 text-lg md:text-xl">{ad.subtitle}</p>
      </div>
    </div>
  );
};
