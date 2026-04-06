"use client";

const benefits = [
  {
    title: "Career Advancement",
    description:
      "Gain in-demand skills recognized by top sustainability firms and global environmental organizations.",
  },
  {
    title: "Career Advancement",
    description:
      "Gain in-demand skills recognized by top sustainability firms and global environmental organizations.",
  },
  {
    title: "Career Advancement",
    description:
      "Gain in-demand skills recognized by top sustainability firms and global environmental organizations.",
  },
];

const CourseBenefits = () => {
  return (
    <section className="bg-[#eef4f5] py-16">
      <div className="container">
        <div className="space-y-8">
          {/* Section Heading */}
          <h2 className="text-2xl font-extrabold text-[#004242] tracking-tight">
            How This Course Helps You
          </h2>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200"
              >
                <div className="space-y-4">
                  {/* Benefit Title */}
                  <h3 className="text-[#004242]  text-sm uppercase tracking-wide">
                    {benefit.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseBenefits;
