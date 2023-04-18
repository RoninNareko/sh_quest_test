import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { DataType } from "../types";
import Canceler from "./Canceler";

const filter = createFilterOptions<DataType>();

interface Iprops {
  data: DataType[];
  setStore: any; // ts-ignore
  errorMessage: Boolean | string | null;
}

export default function SingleAutoComplite({
  data,
  errorMessage,
  setStore,
}: Iprops) {
  const [value, setValue] = React.useState<DataType | undefined | null>(null);
  const [cancel, setCancel] = React.useState<true | false>(false);
  return (
    <>
      <Autocomplete
        value={value}
        // @ts-ignore
        onChange={(event, newValue) => {
          // @ts-ignore
          if (newValue) {
            //@ts-ignore
            setStore((prevState) => {
              return {
                ...prevState,
                cutomSelectTextInput: {
                  data: [...prevState.cutomSelectTextInput.data],
                  value: newValue,
                  selectedData: [newValue],
                  error: {
                    errorMessage: null,
                  },
                },
              };
            });
          }
          if (typeof newValue === "string") {
            setValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              name: newValue.inputValue,
            });
            // @ts-ignore
            setStore((prevState) => {
              const newArr = [...prevState.cutomSelectTextInput.data];
              const newEntity = {
                id: Math.random()
                  .toString(36)
                  .substring(2, 6 + 2),
                name: newValue.inputValue,
                __typename: "ApplicantIndividualCompanyPosition",
              };
              newArr.push(newEntity);

              setCancel(true);
              return {
                ...prevState,

                cutomSelectTextInput: {
                  value: newEntity,
                  data: newArr,
                  selectedData: [newEntity],
                  error: {
                    errorMessage: null,
                  },
                },
              };
            });
          } else {
            setValue(newValue);
          }
        }}
        // //   @ts-ignore
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          //
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );

          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={data}
        //   @ts-ignore
        getOptionLabel={(option) => {
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
        }}
        //   @ts-ignore
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        //   @ts-ignore
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage ? true : false}
            label={`${errorMessage ? errorMessage : "Single"}`}
          />
        )}
      />
      {data && cancel ? (
        <Canceler
          setValue={setValue}
          setCancel={setCancel}
          data={data}
          multiple={false}
          setStore={setStore}
        />
      ) : null}
    </>
  );
}
