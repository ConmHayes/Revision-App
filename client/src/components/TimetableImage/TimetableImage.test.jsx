import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import TimetableCard from ".";
import TimetableImage from ".";

describe("TimetableImage", () => {
  let mockTimetable;

  beforeEach(() => {
    mockTimetable = {
      imageUrl: "https://example.com/image.jpg",
      title: "Sample Timetable",
      description: "Sample description for the timetable",
    };
  });

  it("Renders the TimetableImage with correct content", () => {
    render(<TimetableImage timetable={mockTimetable} />);

    const imageElement = screen.getByRole("img");
    const titleElement = screen.getByText(mockTimetable.title);
    const descriptionElement = screen.getByText(mockTimetable.description);

    expect(imageElement).toHaveAttribute("src", mockTimetable.imageUrl);
    expect(imageElement).toHaveAttribute("alt", mockTimetable.title);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
