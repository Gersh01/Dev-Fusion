import { describe, it } from "vitest";
import AboutUsIndivual from '../src/components/reusable/AboutUsIndivual';
import { render, screen } from "@testing-library/react";
import Picture from "../src/assets/DFLogoFinal.png";

describe("About us individual card", () => {
    const role = [
        {
            name: "John Smith",
            link: "https://google.com",
            picture: Picture,
        },
        
        {
            name: "Jane Doe",
            link: "https://google.com",
            picture: Picture,
        },

        {
            name: "Adam West",
            link: "https://google.com",
            picture: Picture,
        },
    ];

    it("renders about us individual's name", () => {
        render(<AboutUsIndivual members={role} />);
        expect(screen.getAllByTestId("member-name")[0]).toHaveTextContent("John Smith");
    });

    it("renders about us individual's length of members", () => {
        render(<AboutUsIndivual members={role} />);
        expect(screen.getAllByTestId("member-name").length).toBe(3);
    });


})