import { describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../src/components/reusable/Input";
import { act } from "react";

describe("Input", () => {
    it("render input title and placeholder", () => {
        render(
            <Input 
                titleText="Title"
                placeholder="placeholder"
                password={false}
            />
        )
        expect(screen.getByTestId("title-text")).toHaveTextContent("Title");
    })

    it("render inputted text", () => {
        const { getByTestId } = render(
            <Input 
                titleText="Title"
                placeholder="placeholder"
                password={true}
            />
        )
        
        const input = getByTestId('input');

        act(() => {
            fireEvent.change(input, {target: {value: "this is the test value"}});
        })

        expect(screen.getByDisplayValue("this is the test value")).toBeInTheDocument();
        

    })
})