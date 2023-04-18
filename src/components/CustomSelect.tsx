import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions<DataType>();

interface Iprops {
  multiple: true | false;
  data: DataType[];
  setStore: any;
  store: any;
}

export default function CustomSelect({
  multiple = false,
  data,
  setStore,
}: Iprops) {
  const [value, setValue] = React.useState<DataType | undefined | null>(null);

  console.log(data, "data");

  return (
    <Autocomplete
      // multiple={true}
      value={value}
      // multiple={multiple}
      // @ts-ignore
      onChange={(event, newValue) => {
        console.log(newValue, "newValue");
        // @ts-ignore

        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      // //   @ts-ignore
      filterOptions={(options, params) => {
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
        <TextField {...params} label="Free solo with text demo" />
      )}
    />
  );
}

interface DataType {
  id?: number;
  inputValue?: string;
  name: string;
  __typename?: string;
}
