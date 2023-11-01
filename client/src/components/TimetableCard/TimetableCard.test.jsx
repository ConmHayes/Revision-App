import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import TimetableCard from ".";

describe("TimetableCard", () => {
  let timetable;

  beforeEach(() => {
    timetable = {
      subject: "Math",
      description: "Algebra class",
      date: "2023-11-15",
    };
  });

  it("Renders the TimetableCard with the correct information", () => {
    const { getByText } = render(<TimetableCard timetable={timetable} />);

    // Test for the presence of subject, description, and date
    expect(getByText(timetable.subject)).toBeInTheDocument();
    expect(getByText(timetable.description)).toBeInTheDocument();
    expect(getByText(`Date: ${timetable.date}`)).toBeInTheDocument();
  });
});
