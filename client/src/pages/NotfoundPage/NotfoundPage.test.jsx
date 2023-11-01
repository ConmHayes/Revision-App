import React from "react";
import {screen, render, cleanup} from "@testing-library/react";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import NotfoundPage from ".";
import userEvent from "@testing-library/user-event";

describe("NotfoundPage", () => {
    beforeEach(() => {
        render(<BrowserRouter><NotfoundPage /></BrowserRouter>);
    });
    afterEach(() => {
        cleanup();
    });

    it("displays a h1 with  appropriate text", () =>{
        const heading = screen.getByRole("heading")
        expect(heading).toBeInTheDocument()
        expect(heading.textContent).toBe("Not Found Page")

    })

    it("renders NotfoundPage", () => {
        expect(screen.getByText("Not Found Page")).toBeInTheDocument();
    });
});