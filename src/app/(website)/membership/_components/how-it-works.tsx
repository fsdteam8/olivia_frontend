const HowItWorks = () => {
  const steps = [
    {
      title: "Apply for Membership",
      description:
        "Fill out our Membership Form so we can learn more about you and your background, interests, and how you'd like to get involved with Act on Climate.",
      icon: "🤝", // Tumi ekhane image ba lucide icon o use korte paro
    },
    {
      title: "Choose the Right Membership",
      description:
        "Explore our membership options and select the one that best fits your career goals, community interests, and the resources you're looking for.",
      icon: "🔍",
    },
    {
      title: "Get Connected",
      description:
        "Introduce yourself in our community space and join an orientation session to learn more about what Act on Climate offers and connect with like-minded changemakers.",
      icon: "🚀",
    },
  ];

  return (
    <section className="bg-[#f0f7f7] py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl  text-[#004D4D] mb-4">How It Works</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Start your climate journey in three simple steps. No complications,
            just action.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 bg-[#eef4f4] rounded-full flex items-center justify-center text-3xl mb-8">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl  text-[#004D4D] mb-5">{step.title}</h3>

              {/* Description */}
              <p className="text-slate-500 leading-relaxed text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
