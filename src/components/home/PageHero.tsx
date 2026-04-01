"use client";
import PrimaryButton from "./PrimaryButton";

const PageHero = ({
  title = "Our Blog",
  subtitle = "Transforming Workplaces with End-to-End IWMS Solutions Like Consulting, Implementation, Integration, and Support All in One Place",
  bgImage = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1920",
  buttonTitle,
  isHide,
  setOpen,
}: {
  title?: string;
  subtitle?: string;
  bgImage?: string;
  buttonTitle?: string;
  isHide?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <section
      className="relative h-[550px] w-full flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
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
          <PrimaryButton
            text={buttonTitle as string}
            onClick={() => setOpen?.(true)}
          />
        </div>
      </div>
    </section>
  );
};

export default PageHero;
