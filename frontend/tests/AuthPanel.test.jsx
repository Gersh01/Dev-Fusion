import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthPanel from "../src/components/reusable/AuthPanel";

describe("AuthPanel", () => {
    it("renders AuthPanel", () => {
        render(<AuthPanel children="this is the text" width={360} />);
        expect(screen.getByTestId("auth-panel")).toHaveTextContent("this is the text");
    })
})