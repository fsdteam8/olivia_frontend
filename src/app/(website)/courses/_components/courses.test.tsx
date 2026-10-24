import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CoursesHero from "./courses-hero";
import PartnerLogosStrip from "./partner-logos-strip";
import HearFromExperts from "./hear-from-experts";
import { getCourseOutcomes, Course } from "@/lib/course-utils";

describe("Courses Page Components", () => {
  test("renders CoursesHero with explanation and triggers suggest modal", () => {
    const handleSuggest = jest.fn();
    render(<CoursesHero onOpenSuggestModal={handleSuggest} />);

    expect(screen.getByText("Explore Climate Courses")).toBeInTheDocument();
    expect(
      screen.getByText(/Act on Climate curates and offers high-impact courses/i),
    ).toBeInTheDocument();

    const suggestBtn = screen.getByRole("button", {
      name: "Submit Course Idea",
    });
    fireEvent.click(suggestBtn);
    expect(handleSuggest).toHaveBeenCalledTimes(1);
  });

  test("renders PartnerLogosStrip with institutional credibility", () => {
    render(<PartnerLogosStrip />);

    expect(
      screen.getByText(
        /Curated in collaboration with leading universities/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Harvard")).toBeInTheDocument();
    expect(screen.getByText("Oxford")).toBeInTheDocument();
    expect(screen.getByText("Stanford")).toBeInTheDocument();
    expect(screen.getByText("Cambridge")).toBeInTheDocument();
    expect(screen.getByText("Terra.do")).toBeInTheDocument();
    expect(screen.getByText("Columbia")).toBeInTheDocument();
  });

  test("renders HearFromExperts with expert profiles and quotes", () => {
    render(<HearFromExperts />);

    expect(screen.getByText("Hear From the Experts")).toBeInTheDocument();
    expect(screen.getByText("Dr. Maya Patel")).toBeInTheDocument();
    expect(screen.getByText("Marcus Vance")).toBeInTheDocument();
    expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();
  });

  test("getCourseOutcomes returns dynamic outcomes only if set, and empty array if none (no static data)", () => {
    const courseWithOutcomes: Course = {
      _id: "1",
      title: "Sample Course",
      learningOutcomes: ["Master Carbon Accounting", "Earn Certificate"],
    };
    expect(getCourseOutcomes(courseWithOutcomes)).toEqual([
      "Master Carbon Accounting",
      "Earn Certificate",
    ]);

    const courseWithoutOutcomes: Course = {
      _id: "2",
      title: "Another Course",
    };
    expect(getCourseOutcomes(courseWithoutOutcomes)).toEqual([]);
  });
});
