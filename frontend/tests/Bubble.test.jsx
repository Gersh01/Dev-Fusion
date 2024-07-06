import { describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Bubble from "../src/components/reusable/Bubble";

describe("Bubble", () => {
    it("render the bubble text", () => {
        render(
            <Bubble 
                countable={false}
                text="this is text"
                removable={false}
                useContainer={true}
                children="this is also text"
                writable={false}
            />
        )
        expect(screen.getByTestId("text-field")).toHaveTextContent("this is text");
        expect(screen.getByTestId("children-field")).toHaveTextContent("this is also text");
    })

    it("render the bubble count", () => {
        render(
            <Bubble 
                countable={true}
                text="this is text"
                count={3}
            />
        )
        expect(screen.getByTestId("text-field")).toHaveTextContent("this is text");
        expect(screen.getByTestId("count")).toHaveTextContent("3");
    })

    it("render the onClick", () => {
        const handleCount = vi.fn();
        const handleRemove = vi.fn();
        render(
            <Bubble 
                countable={true}
                onCountChange={handleCount}
                onRemove={handleRemove}
                text="this is text"
                removable={true}
            />
        )
        fireEvent.click(screen.getByTestId("countable-button"));
        expect(handleCount).toHaveBeenCalledOnce();

        fireEvent.click(screen.getByTestId("remove-button"));
        expect(handleRemove).toHaveBeenCalledOnce();
    })
    
})