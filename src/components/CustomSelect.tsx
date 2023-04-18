import * as React from "react";

import AutoCompliteMultiple from "./AutoCompliteMultiple";
import SingleAutoComplite from "./SingleAutoComplite";
import { DataType } from "../types";

interface Iprops {
  multiple: true | false;
  data: DataType[];
  setStore: any;
  store: any;
  //@ts-ignore
  errorMessage: Boolean | string | null;
}

export default function CustomSelect({
  multiple = false,
  data,
  setStore,
  errorMessage,
}: Iprops) {
  if (!multiple) {
    return (
      <>
        <SingleAutoComplite
          data={data}
          setStore={setStore}
          errorMessage={errorMessage}
        />
      </>
    );
  } else {
    return (
      <AutoCompliteMultiple
        data={data}
        setStore={setStore}
        errorMessage={errorMessage}
      />
    );
  }
}
