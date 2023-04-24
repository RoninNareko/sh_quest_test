export interface DataType {
  id?: number | string;
  inputValue?: string;
  name: string;
  __typename?: string;
}

export interface IFormInput {
  textInput: String;
  positions: String[];
  relations: String[];
  textArea: String;
}
