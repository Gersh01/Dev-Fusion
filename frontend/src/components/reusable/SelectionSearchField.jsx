import { useState } from "react";
import { MdAdd } from "react-icons/md";

// * selectionFunc should refer to a function that returns a list of options when passed a keyword
// * onAdd should refer to a function to perform when add button is clicked
// * onFocus: refers to function to call when input is focused, selection is changed, or add is clicked
const SelectionSearchField = ({ selectionFunc, onAdd, onFocus }) => {
    const [optionsList, setOptionsList] = useState(selectionFunc(""));
    const [selectedOption, setSelectedOption] = useState("");

    const renderedTechnologiesOptions = optionsList.map((value) => {
        return (
            <option key={value} value={value}>
                {value}
            </option>
        );
    });

    return (
        <div className="flex gap-2 h-8 min-w-0">
            <input
                className="grow min-w-0 bg-gray-200 dark:bg-gray-700 rounded-md px-2 focus:outline-none
				 text-white poppins text-base"
                type="text"
                placeholder="Type to search"
                onChange={(e) => {
                    const options = selectionFunc(e.target.value);
                    setOptionsList(options);
                    setSelectedOption(options[0]);
                }}
                onFocus={onFocus}
            ></input>

            <select
                className="w-40 bg-gray-200 dark:bg-gray-700 rounded-md px-1 focus:outline-none
				gap-2 items-center text-base"
                value={selectedOption}
                onChange={(e) => {
                    setSelectedOption(e.target.value);
                    onFocus?.();
                }}
            >
                {renderedTechnologiesOptions}
            </select>
            <button
                onClick={() => {
                    onFocus?.();
                    onAdd(selectedOption);
                }}
            >
                <MdAdd className="text-2xl" />
            </button>
        </div>
    );
};

export default SelectionSearchField;
