"use client";
import PageHero from "@/components/home/PageHero";
import React from "react";
import SpeakerModal from "./SpeakerModal";
import WhyEventsMatter from "./WhyEventsMatter";
import ExploreEvents from "./ExploreEvents";
import SpeakerCTA from "./SpeakerCTA";
import { Newsletter } from "@/components/home/Newsletter";
import CommunitySection from "@/components/home/CommunitySection";

const EventMain = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <PageHero
        setOpen={setIsModalOpen}
        buttonTitle="Apply to Speak"
        title="Our Events"
        subtitle="Act on Climate events bring together ambitious professionals 
        who are ready to grow, collaborate, and drive real impact in the climate space."
        bgImage="/eventHero.jpg"
      />
      <WhyEventsMatter />
      <ExploreEvents />
      <SpeakerCTA setOpen={setIsModalOpen} />
      <Newsletter />
      <CommunitySection />
      <SpeakerModal isOpen={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default EventMain;
