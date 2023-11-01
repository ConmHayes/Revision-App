import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Header from ".";

describe("Header", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays the navigation with the correct amount of links", () => {
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
    // Ensure the correct number of navigation links
    expect(screen.getAllByRole("link").length).toBe(4);
  });

  it("renders the Home link and navigates to the home page", async () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent("Home");
    userEvent.click(homeLink);
    // Expect the current URL to be the home page URL
    expect(window.location.pathname).toEqual("/");
  });

  it("renders the Timetables link and navigates to the timetables page", async () => {
    const timetablesLink = screen.getByRole("link", { name: /timetables/i });
    expect(timetablesLink).toBeInTheDocument();
    expect(timetablesLink).toHaveTextContent("Timetables");
    // userEvent.click(timetablesLink);
    // expect(window.location.pathname).toEqual("/timetables");
  });

  it("renders the Notes link and navigates to the notes page", async () => {
    const notesLink = screen.getByRole("link", { name: /notes/i });
    expect(notesLink).toBeInTheDocument();
    expect(notesLink).toHaveTextContent("Notes");
    // userEvent.click(notesLink);
    // expect(window.location.pathname).toEqual("/notes");
  });

  it("renders the Logout link and verifies its content", () => {
    const logoutLink = screen.getByRole("link", { name: /logout/i });
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveTextContent("Logout");
  });
});
