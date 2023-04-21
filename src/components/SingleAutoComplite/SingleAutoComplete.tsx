import Autocomplete from "@mui/material/Autocomplete";

import React, { useEffect, useState, SyntheticEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_COMPANY_POSITION_QUERY,
  GET_POSITIONS_QUERY,
} from "../../query/query";
import { useMutation, useQuery } from "@apollo/client";

import {
  InputValueType,
  OptionsType,
  NewValueType,
} from "./SingleAutoComplete.types";

import { Button } from "@mui/material";

import {
  ADD_POSITION_QUERY_OPTIONS,
  AUTOCOMPLETE_ID,
  AUTOCOMPLETE_SX,
  GET_POSITIONS_QUERY_VARIABLES,
} from "./SingleAutoComplete.constants";

import {
  filterOptionsHandler,
  getOptionlabelHandler,
  renderInputHandler,
  renderOptionHandler,
} from "./SingleAutoComplete.utils";

export default function SingleAutoComplete() {
  const [value, setValue] = useState<InputValueType>(null);

  const [options, setOptions] = useState<OptionsType>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [inputNewValue, setInputNewValue] = useState<InputValueType>(null);

  const [addCompanyPosition] = useMutation(
    ADD_COMPANY_POSITION_QUERY,
    ADD_POSITION_QUERY_OPTIONS
  );

  const { data: optionsData } = useQuery(
    GET_POSITIONS_QUERY,
    GET_POSITIONS_QUERY_VARIABLES
  );

  useEffect(() => {
    if (!value) {
      setInputNewValue(null);
    }
  }, [value]);

  useEffect(() => {
    const options = optionsData?.applicantIndividualCompanyPositions.data || [];
    setOptions(options);
  }, [optionsData]);

  const onChangeHandler = async (
    event: SyntheticEvent<EventTarget>,
    newValue: NewValueType
  ) => {
    setErrorMessage("");

    if (typeof newValue === "string") {
      setValue({
        name: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      const newValueEntity = {
        id: uuidv4(),
        name: newValue.inputValue,
      };

      setInputNewValue(newValueEntity);

      setValue({
        name: newValue.inputValue,
      });

      setOptions((prevState: OptionsType) => {
        return [...prevState, newValueEntity];
      });
    } else {
      setValue(newValue);
    }
  };

  const onSaveHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (inputNewValue && inputNewValue.name) {
      const positionEntitey = {
        variables: { name: inputNewValue.name, company_id: 1 },
      };

      try {
        await addCompanyPosition(positionEntitey);
        setInputNewValue(null);
      } catch (error) {
        if (error instanceof Error) {
          onCancelHandler();
          setErrorMessage(error.message);
        }
      }
    }
  };

  const onCancelHandler = () => {
    setOptions((prevState) =>
      prevState.filter((item) => item.id !== inputNewValue?.id)
    );

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
          <Button
            className="myButton"
            onClick={onSaveHandler}
            variant="contained"
            color="success"
          >
            Save
          </Button>
          <Button
            className="myButton"
            onClick={onCancelHandler}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </>
      )}
      <h3>{errorMessage}</h3>
    </>
  );
}
