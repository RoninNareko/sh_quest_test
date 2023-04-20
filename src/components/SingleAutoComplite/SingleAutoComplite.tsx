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
import { DataType, newValueType } from "./SingleAutoComplite.types";
import { Button, FilterOptionsState } from "@mui/material";
import {
  ADD_POSITION_QUERY_OPTIONS,
  GET_POSITIONS_QUERY_VARIABLES,
} from "./SingleAutoComplite.constants";

export default function SingleAutoComplete() {
  const filter = createFilterOptions<DataType>();

  const [value, setValue] = React.useState<DataType | undefined | null>(null);
  const [options, setOptions] = React.useState<DataType[] | []>([]);

  const [inputNewValue, setInputNewValue] = React.useState<
    DataType | undefined | null
  >(null);

  const [addCompanyPosition, { data }] = useMutation(
    ADD_COMPANY_POSITION_QUERY,
    ADD_POSITION_QUERY_OPTIONS
  );

  const { data: optionsData, refetch } = useQuery(
    GET_POSITIONS_QUERY,
    GET_POSITIONS_QUERY_VARIABLES
  );

  React.useEffect(() => {
    setOptions(optionsData?.applicantIndividualCompanyPositions.data || []);
  }, [optionsData]);

  const onChangeHandler = async (
    event: SyntheticEvent<EventTarget>,
    newValue: newValueType
  ) => {
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
      //@ts-ignore
      setOptions((prevState) => {
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
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
      });
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  };

  const onSaveHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("inputNewValue", inputNewValue);
    if (inputNewValue && inputNewValue.name) {
      await addCompanyPosition({
        variables: { name: inputNewValue.name, company_id: "1" },
      });

      const succesAddedStatus =
        data?.createApplicantIndividualCompanyPosition || [];
      console.log(succesAddedStatus);
      try {
        await refetch({
          page: 73,
        });
      } catch (error) {}
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
        id="free-solo-with-text-demo"
        options={options}
        getOptionLabel={getOptionlabelHandler}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params: AutocompleteRenderInputParams) => {
          return <TextField {...params} label={"Single"} />;
        }}
      />
      <Button onClick={onSaveHandler} variant="contained" color="success">
        Save
      </Button>
      {inputNewValue && (
        <Button onClick={onCancelHandler} variant="outlined" color="error">
          Cancel
        </Button>
      )}
    </>
  );
}
