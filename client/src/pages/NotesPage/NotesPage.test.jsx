import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { BrowserRouter } from "react-router-dom";

import NotePage from "./NotePage"; 
import { afterEach, describe, it, vi } from "vitest";

describe("NotePage", () => {

  const fetchSpy = vi.spyOn(global, "fetch");
  afterEach(() => {
    cleanup();
    fetchSpy.mockRestore();
  });


  it("fetch note", async () => {
    const mockResponse = {
      "note_id": 1,
      "note": "This is the note text 1",
      "topic": "Topic 1"
    };
    const mockResolvedValue = {
      ok: true,
      json: () => new Promise((resolve) => resolve(mockResponse))
    };
    fetchSpy.mockReturnValue(mockResolvedValue);

   
    render(
      <BrowserRouter>
        <NotePage />
      </BrowserRouter>
    );

   
    const topic = await screen.findByText("Topic 1");
    expect(topic).toBeInTheDocument();

   
    const noteText = await screen.findByText("This is the note text 1");
    expect(noteText).toBeInTheDocument();

  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://time-table-server.onrender.com/notes/1"
    );

  });
});
