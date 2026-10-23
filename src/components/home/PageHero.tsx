"use client";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

const PageHero = ({
  title = "Our Blog",
  subtitle = "Transforming Workplaces with End-to-End IWMS Solutions Like Consulting, Implementation, Integration, and Support All in One Place",
  bgImage = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1920",
  buttonTitle,
  isHide,
  buttonLink,
  setOpen,
}: {
  title?: string;
  subtitle?: string;
  buttonLink?: string;
  bgImage?: string;
  buttonTitle?: string;
  isHide?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <section className="relative h-[550px] w-full flex items-center justify-center text-center px-4 overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage}
          alt={title || "Page hero background"}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover z-0"
        />
      )}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(0, 0, 0, 0.60)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-5xl hero-font tracking-tight">
          {title}
        </h1>

        {/* Subtext */}
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Reusable Button - Careful with margins to avoid "messing" layout */}
        <div className={`${isHide === true ? "hidden" : "block pt-4"}`}>
          {buttonLink ? (
            <Link href={buttonLink}>
              <button
                className={`bg-[#004242] hover:bg-[#004444] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-lg`}
              >
                {buttonTitle as string}
              </button>
            </Link>
          ) : (
            <PrimaryButton
              text={buttonTitle as string}
              onClick={() => setOpen?.(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
