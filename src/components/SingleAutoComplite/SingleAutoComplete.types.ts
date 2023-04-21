export interface DataType {
  id?: number;
  inputValue?: string;
  name: string;
  __typename?: string;
}

export type NewValueType = string | DataType | null;

export type InputValueType = DataType | undefined | null;

export type OptionsType = DataType[] | [];

export type ErrorType = boolean | undefined;
