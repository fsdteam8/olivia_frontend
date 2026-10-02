import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClimateProfileForm from "./ClimateProfileForm";
import { api } from "@/lib/api";

jest.mock("@/lib/api", () => ({ api: { get: jest.fn(), request: jest.fn() } }));
jest.mock("sonner", () => ({ toast: { success: jest.fn() } }));
const get = api.get as jest.Mock;
const request = api.request as jest.Mock;

beforeEach(() => jest.clearAllMocks());

test("creates once then updates the same account profile with array payloads", async () => {
  get.mockResolvedValue({ data: { data: null } });
  request.mockResolvedValue({ data: { data: null } });
  render(<ClimateProfileForm />);
  await screen.findByRole("button", { name: "Create profile" });
  fireEvent.change(screen.getByLabelText("Full name *"), {
    target: { value: "Sarah Jenkins" },
  });
  fireEvent.change(screen.getByLabelText("Professional title *"), {
    target: { value: "Climate Leader" },
  });
  fireEvent.change(screen.getByLabelText("Skills"), {
    target: { value: "Energy, Engineering, Energy" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add skill" }));
  fireEvent.click(screen.getByRole("button", { name: "Create profile" }));
  await waitFor(() =>
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/meet-climate-people/me",
        data: expect.objectContaining({
          skills: ["Energy", "Engineering"],
          isVisible: false,
        }),
      }),
    ),
  );
  await screen.findByRole("button", { name: "Update profile" });
  await waitFor(() =>
    expect(screen.getByLabelText("Full name *")).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText("Full name *"), {
    target: { value: "Sarah Updated" },
  });
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Update profile" }),
    ).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Update profile" }));
  await waitFor(() =>
    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({ method: "PUT" }),
    ),
  );
});

test("loads an existing profile and saves using PUT", async () => {
  get.mockResolvedValue({
    data: {
      data: {
        name: "Sarah",
        professionalTitle: "Leader",
        skills: ["Energy"],
        education: [{ school: "MIT", degree: "B.S.", year: "2020" }],
        isVisible: true,
      },
    },
  });
  request.mockResolvedValue({ data: { data: null } });
  render(<ClimateProfileForm />);
  await screen.findByDisplayValue("Sarah");
  expect(
    screen.getByRole("button", { name: "Remove skill Energy" }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("school")).toHaveValue("MIT");
  fireEvent.change(screen.getByLabelText("Location"), {
    target: { value: "Dhaka" },
  });
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Update profile" }),
    ).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Update profile" }));
  await waitFor(() =>
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "PUT",
        data: expect.objectContaining({
          location: "Dhaka",
          education: [{ school: "MIT", degree: "B.S.", year: "2020" }],
        }),
      }),
    ),
  );
});

test("does not offer creation when loading the account profile fails", async () => {
  get.mockRejectedValue(new Error("Network unavailable"));
  render(<ClimateProfileForm />);
  await screen.findByRole("alert");
  expect(
    screen.queryByRole("button", { name: "Create profile" }),
  ).not.toBeInTheDocument();
  expect(request).not.toHaveBeenCalled();
});
