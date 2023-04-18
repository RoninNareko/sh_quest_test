export interface DataType {
  id?: number;
  inputValue?: string;
  name: string;
  __typename?: string;
}

export interface IStore {
  cutomSelectTextInput: {
    data: DataType[] | [];
    selectedData: string[] | [] | DataType[];
    error: {
      errorMessage: Boolean | string | null;
    };
  };
  cutomSelectTextAreaData: {
    data: DataType[] | [];
    selectedData: string[] | [] | DataType[];
    error: {
      errorMessage: Boolean | string | null;
    };
  };
}
