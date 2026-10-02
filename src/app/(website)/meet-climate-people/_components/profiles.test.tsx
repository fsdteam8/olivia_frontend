import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { ProfileDetails, ProfileDirectory } from "./profiles";

jest.mock("axios", () => {
  const get = jest.fn();
  return {
    __esModule: true,
    default: { get, create: () => ({ get }), isAxiosError: () => false },
    get,
  };
});
const get = (axios as unknown as { get: jest.Mock }).get;
beforeEach(() => get.mockReset());

test("lists profiles, paginates, and applies both filters on page one", async () => {
  get.mockResolvedValue({
    data: {
      data: [
        { _id: "abc", name: "Olivia", climateInterests: ["Climate Tech"] },
      ],
      meta: { total: 13, totalPage: 2 },
    },
  });
  render(<ProfileDirectory />);
  await screen.findByText("Olivia");
  expect(
    screen.getByRole("link", { name: "View Olivia's profile" }),
  ).toHaveAttribute("href", "/meet-climate-people/abc");
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  await waitFor(() =>
    expect(get).toHaveBeenLastCalledWith(
      "/meet-climate-people",
      expect.objectContaining({
        params: expect.objectContaining({
          page: 2,
          limit: 12,
          sortBy: "createdAt",
          sortOrder: "desc",
        }),
      }),
    ),
  );
  fireEvent.change(screen.getByLabelText("Search the community"), {
    target: { value: "Olivia" },
  });
  fireEvent.change(screen.getByLabelText("Climate interest"), {
    target: { value: "Climate Tech" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Find people" }));
  await waitFor(() =>
    expect(get).toHaveBeenLastCalledWith(
      "/meet-climate-people",
      expect.objectContaining({
        params: expect.objectContaining({
          page: 1,
          search: "Olivia",
          climateInterest: "Climate Tech",
        }),
      }),
    ),
  );
});

test("loads details and renders education and safe external links", async () => {
  get.mockResolvedValue({
    data: {
      data: {
        _id: "abc",
        name: "Sarah",
        about: "Working in climate",
        education: [{ school: "MIT", degree: "B.S.", year: "2020" }],
        website: "https://example.com",
        portfolio: "javascript:alert(1)",
      },
    },
  });
  render(<ProfileDetails id="abc" />);
  await screen.findByRole("heading", { name: "Sarah" });
  expect(get).toHaveBeenCalledWith(
    "/meet-climate-people/abc",
    expect.anything(),
  );
  expect(screen.getByText("MIT")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
    "href",
    "https://example.com/",
  );
  expect(
    screen.queryByRole("link", { name: "Portfolio" }),
  ).not.toBeInTheDocument();
});
