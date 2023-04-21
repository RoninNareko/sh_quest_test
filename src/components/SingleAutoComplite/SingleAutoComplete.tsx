import Autocomplete, {
  AutocompleteRenderInputParams,
  createFilterOptions,
} from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import React, { SyntheticEvent } from "react";

import {
  ADD_COMPANY_POSITION_QUERY,
  GET_POSITIONS_QUERY,
} from "../../query/query";
import { useMutation, useQuery } from "@apollo/client";
import {
  DataType,
  InputValueType,
  OptionsType,
  NewValueType,
} from "./SingleAutoComplete.types";
import { Button, FilterOptionsState } from "@mui/material";
import {
  ADD_POSITION_QUERY_OPTIONS,
  AUTOCOMPLETE_ID,
  AUTOCOMPLETE_SX,
  GET_POSITIONS_QUERY_VARIABLES,
} from "./SingleAutoComplete.constants";

export default function SingleAutoComplete() {
  const filter = createFilterOptions<DataType>();

  const [value, setValue] = React.useState<InputValueType>(null);
  console.log(value);

  const [options, setOptions] = React.useState<OptionsType>([]);

  const [inputNewValue, setInputNewValue] =
    React.useState<InputValueType>(null);

  const [addCompanyPosition, { data }] = useMutation(
    ADD_COMPANY_POSITION_QUERY,
    ADD_POSITION_QUERY_OPTIONS
  );

  const { data: optionsData } = useQuery(
    GET_POSITIONS_QUERY,
    GET_POSITIONS_QUERY_VARIABLES
  );
  React.useEffect(() => {
    if (!value) {
      setInputNewValue(null);
    }
  }, [value]);

  React.useEffect(() => {
    console.log("optionsData", optionsData);
    const options = optionsData?.applicantIndividualCompanyPositions.data || [];
    setOptions(options);
  }, [optionsData]);

  const onChangeHandler = async (
    event: SyntheticEvent<EventTarget>,
    newValue: NewValueType
  ) => {
    console.log("ollllllllllllllll");
    if (typeof newValue === "string") {
      setValue({
        name: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      const _newValueEntity = {
        id: Math.floor(Math.random() * 100 + 1),
        name: newValue.inputValue,
        __typename: "ApplicantIndividualCompanyPosition",
      };

      setInputNewValue(_newValueEntity);

      setValue({
        name: newValue.inputValue,
      });

      setOptions((prevState: OptionsType) => {
        return [...prevState, _newValueEntity];
      });
    } else {
      setValue(newValue);
    }
  };

  const getOptionlabelHandler = (option: DataType | string) => {
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

  const filterOptionsHandler = (
    options: DataType[],
    params: FilterOptionsState<DataType>
  ) => {
    const filtered = filter(options, params);

    const { inputValue } = params;
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
  const renderOptionHandler = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: DataType
  ) => <li {...props}>{option.name}</li>;
  const renderInputHandler = (params: AutocompleteRenderInputParams) => {
    return <TextField {...params} label={"Single"} />;
  };
  const onSaveHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("inputNewValue", inputNewValue);

    if (inputNewValue && inputNewValue.name) {
      const potitionEntitey = {
        variables: { name: inputNewValue.name, company_id: "1" },
      };

      await addCompanyPosition(potitionEntitey);

      setInputNewValue(null);

      const succesAddedStatus =
        data?.createApplicantIndividualCompanyPosition || [];

      console.log(succesAddedStatus);
    }
  };

  const onCancelHandler = () => {
    const optionsCopy = [...options];
    optionsCopy.pop();

    setOptions(optionsCopy);

    setInputNewValue(null);
    setValue(null);
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={onChangeHandler}
        filterOptions={filterOptionsHandler}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id={AUTOCOMPLETE_ID}
        options={options}
        getOptionLabel={getOptionlabelHandler}
        renderOption={renderOptionHandler}
        sx={AUTOCOMPLETE_SX}
        freeSolo
        renderInput={renderInputHandler}
      />
      {inputNewValue && value && (
        <>
          <Button onClick={onSaveHandler} variant="contained" color="success">
            Save
          </Button>
          <Button onClick={onCancelHandler} variant="outlined" color="error">
            Cancel
          </Button>
        </>
      )}
    </>
  );
}
