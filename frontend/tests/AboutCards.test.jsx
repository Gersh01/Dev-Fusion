import { describe, it } from "vitest";
import AboutCards from '../src/components/reusable/AboutCards';
import { render, screen } from "@testing-library/react";
import Picture from "../src/assets/DFLogoFinal.png";

describe('About Card', () => {
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

    it('renders AboutCards with right role message', () => {
        render(<AboutCards role="role" members={role} />);
        expect(screen.getByTestId("role-card")).toHaveTextContent("role");
    })
})