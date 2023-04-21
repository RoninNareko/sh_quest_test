import React from "react";
import {AutocompleteRenderInputParams, createFilterOptions, FilterOptionsState, TextField,} from "@mui/material";
import {DataType} from "./SingleAutoComplete.types";


export const renderOptionHandler = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: DataType
) => <li {...props}>{option.name}</li>;

export const renderInputHandler = (params: AutocompleteRenderInputParams) => {
    return <TextField {...params} label={"Select"}/>;
};

export const filterOptionsHandler = (
    options: DataType[],
    params: FilterOptionsState<DataType>
) => {
    const filter = createFilterOptions<DataType>();
    const filtered = filter(options, params);

    const {inputValue} = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.name);

    if (inputValue !== "" && !isExisting) {
        const addEntity = {
            inputValue,
            name: `Add "${inputValue}"`,
        };

        filtered.push(addEntity);
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
};

export const getOptionlabelHandler = (option: DataType | string) => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
        return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
        return option.inputValue;
    }
    // Regular option
    return option.name;
};
