export interface DataType {
  id?: number | string;
  inputValue?: string;
  name: string;
  __typename?: string;
}

export type NewValueType = string | DataType | null;

export type InputValueType = DataType | undefined | null;

export type OptionsType = DataType[] | [];

