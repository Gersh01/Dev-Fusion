import AuthHeader from "../src/components/reusable/AuthHeader";
import { describe } from "vitest";
import { render, screen } from "@testing-library/react";

describe("AuthHeader", () => {
    it("renders AuthHeader", () => {
        render(<AuthHeader title="this is the title" />);
        expect(screen.getByTestId("title")).toHaveTextContent("this is the title");        
    })
})