// testing done using jest and react-testing-library

import React from "react";
import { render, screen, waitFor, expect, describe, it, global, jest } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotePage from "./NotePage";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
        "note_id": 1,
        "note": "This is the note text 1",
        "topic": "Topic 1"
        }),
  })
);

describe("NotePage", () => {
  it("fetches and displays a note", async () => {
    render(
      <BrowserRouter>
        <NotePage />
      </BrowserRouter>
    );

   
    await waitFor(() => {
      expect(screen.getByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
