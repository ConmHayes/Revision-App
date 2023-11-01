// import React from "react";
// import { render, screen, fireEvent, cleanup} from "@testing-library/react";
// import * as matchers from "@testing-library/jest-dom/matchers";
// expect.extend(matchers);
// import { BrowserRouter } from "react-router-dom";
// import SearchForm from ".";
// import { describe, it, expect, afterEach  } from "vitest";

// describe("SearchForm", () => {
//   afterEach(() => {
//     cleanup();
//   });

//   it("displays search results", async () => {
//     const mockResponse = [
//       { show: { id: 1, title: "Show 1" } },
//       { show: { id: 2, title: "Show 2" } },
//     ];

   
//     const originalFetch = globalThis.fetch;
//     globalThis.fetch = async (url) => {
//       if (url === "https://time-table-server.onrender.com/notes") {
//         return {
//           ok: true,
//           json: async () => mockResponse,
//         };
//       }
//     };

//     render(<BrowserRouter><SearchForm /></BrowserRouter>);

//     const inputElement = screen.getByRole("textbox");
//     const submitButton = screen.getByRole("button", { name: "Search" });

//     fireEvent.change(inputElement, { target: { value: "searchQuery" } });
//     fireEvent.click(submitButton);

//     const show1 = await screen.findByText("Show 1");
//     const show2 = await screen.findByText("Show 2");

//     expect(show1).toBeTruthy();
//     expect(show2).toBeTruthy();

  
//     globalThis.fetch = originalFetch;
//   });
// });
