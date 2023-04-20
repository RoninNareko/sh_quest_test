export interface DataType {
  id?: number;
  inputValue?: string;
  name: string;
  __typename?: string;
}

export type newValueType = string | DataType | null;
