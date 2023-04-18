import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const filter = createFilterOptions<DataType>();
interface DataType {
  id?: number;
  inputValue?: string;
  name: string;
  __typename?: string;
}

interface Iprops {
  data: DataType[];
  setStore: any;
}

export default function AutoCompliteMultiple({ data, setStore }: Iprops) {
  console.log("mydata AutoCompliteMultiple", data);

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        onChange={(event, newValue) => {
          console.log(newValue, "newValue");
          // @ts-ignore
          setStore((prevState) => {
            // const newArr = [...prevState.cutomSelectTextAreaData.data];
            // console.log("newArr", newArr);
            // newArr.push({
            //   id: Math.random()
            //     .toString(36)
            //     .substring(2, 6 + 2),
            //   name: newValue,
            //   __typename: "ApplicantIndividualCompanyPosition",
            // });
            // return {
            //   ...prevState,
            //   cutomSelectTextAreaData: {
            //     selectedData: newValue,
            //   },
            // };
            return {
              ...prevState,
              cutomSelectTextAreaData: {
                data: [],

                selectedData: [],
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
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
