import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { BrowserRouter } from "react-router-dom";
import NotesPage from ".";
import { afterEach, describe, expect } from "vitest";

describe("NotesPage", () => {
  const fetchSpy = vi.spyOn(global, "fetch");
  afterEach(() => {
    cleanup();
    fetchSpy.mockRestore();
  });
  it("fetch notes", async () => {
    const mockResponse = {
      id: 1,
      // "title": "Note 1"
    };
    const mockResolvedValue = {
      ok: true,
      json: () => new Promise((resolve) => resolve(mockResponse)),
    };
    fetchSpy.mockReturnValue(mockResolvedValue);
    render(
      <BrowserRouter>
        <NotesPage />
      </BrowserRouter>
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/notes");
    // await screen.findByText("Note 1");

    // const heading = await screen.findByText("");
    // expect(heading).toBeInTheDocument();
  });
});
