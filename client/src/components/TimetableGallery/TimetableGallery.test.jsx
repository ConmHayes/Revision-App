import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TimetableGallery from ".";

describe("TimetableGallery", () => {
  let mockTimetables;

  beforeEach(() => {
    mockTimetables = [
      {
        id: 1,
        subject: "Math",
        description: "Algebra class",
        date: "2023-11-15",
      },
      {
        id: 2,
        subject: "Science",
        description: "Biology class",
        date: "2023-11-16",
      },
    ];

    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockTimetables),
      });
  });

  it("Renders the TimetableGallery with fetched timetables", async () => {
    render(
      <BrowserRouter>
        <TimetableGallery />
      </BrowserRouter>
    );

    await new Promise((resolve) => setTimeout(resolve, 0)); // Simulate an async operation

    mockTimetables.forEach((timetable) => {
      expect(screen.getByText(timetable.subject)).toBeTruthy();
      expect(screen.getByText(timetable.description)).toBeTruthy();
      expect(screen.getByText(`Date: ${timetable.date}`)).toBeTruthy();
    });
  });
});
