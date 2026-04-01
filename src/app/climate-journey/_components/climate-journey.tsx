import ClimateJourneyBanner from "./climate-journey-banner";
import CareerServicesTiers from "./career-services-tiers";
import PricingCards from "./pricing-cards";

const ClimateJourney = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <ClimateJourneyBanner />
      <CareerServicesTiers />
      <div className="mt-16 lg:mt-20">
        <PricingCards />
      </div>
    </div>
  );
};

export default ClimateJourney;
