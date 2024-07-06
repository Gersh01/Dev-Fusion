import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../src/components/reusable/Button";

describe("button components", () => {
    it("renders button", () => {
        render(<Button children="this is a button" />);
        expect(screen.getByTestId("button")).toHaveTextContent("this is a button");
    });

    it("should emit clicked button", () => {
        const handleClick = vi.fn();
        render(<Button children="this is a button" onClick={handleClick} />);
        fireEvent.click(screen.getByTestId("button"));
        expect(handleClick).toHaveBeenCalledOnce();
    });
})