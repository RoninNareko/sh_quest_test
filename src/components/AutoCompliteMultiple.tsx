import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DataType } from "../types";

interface Iprops {
  data: DataType[];
  setStore: any;
  errorMessage: Boolean | string | null;
}

export default function AutoCompliteMultiple({
  data,
  errorMessage,
  setStore,
}: Iprops) {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        onChange={(event, newValue) => {
          // @ts-ignore
          event.preventDefault(event);
          // @ts-ignore//
          setStore((prevState) => {
            return {
              //
              ...prevState,
              cutomSelectTextAreaData: {
                data: prevState.cutomSelectTextAreaData.data,
                selectedData: newValue,
                error: {
                  errorMessage: null,
                },
              },
            };
          });
        }}
        id="tags-outlined"
        options={data.map((option) => option.name)}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage ? true : false}
            label={`${errorMessage ? errorMessage : "Multiple"}`}
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
