import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";

import { DataType, IFormInput } from "./MyForm.types";
import { GET_POSITIONS_QUERY, GET_RELATIONS_QUERY } from "./MyForm.queries";

import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  ERROR_COLOR,
  FORM_BUTTON_TYPE,
  SELECT_POSITIONS_ERROR_MESSAGE,
  SELECT_POSITIONS_LABEL_ID,
  SELECT_POSITIONS_LABEL_VALUE,
  SELECT_POSITIONS_NAME,
  SELECT_POSITIONS_PROPS_ID,
  SELECT_POSITIONS_PROPS_LABEL_ID,
  SELECT_POSITIONS_PROPS_LABEL_VALUE,
  SELECT_RELATIONS_ERROR_MESSAGE,
  SELECT_RELATIONS_LABEL_ID,
  SELECT_RELATIONS_LABEL_VALUE,
  SELECT_RELATIONS_NAME,
  SELECT_RELATIONS_PROPS_ID,
  SELECT_RELATIONS_PROPS_LABEL_ID,
  SELECT_RELATIONS_PROPS_LABEL_VALUE,
  TEXTAREA_ERROR_MESSAGE,
  TEXTAREA_LABEL,
  TEXTAREA_NAME,
  TEXTINPUT_ERROR_MESSAGE,
  TEXTINPUT_LABEL,
  TEXTINPUT_NAME,
} from "./MyForm.constants";

import styles from "./MyForm.module.scss";

export default function MyForm() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("success-data", data);
  };

  const { data: positionsData } = useQuery(GET_POSITIONS_QUERY);
  const { data: relationsData } = useQuery(GET_RELATIONS_QUERY);

  const positionsOptions: DataType[] | [] =
    positionsData?.applicantIndividualCompanyPositions.data || [];

  const relationsOptions: DataType[] | [] =
    relationsData?.applicantIndividualCompanyRelations.data || [];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classNames(styles.inp_title)}>textInput</h1>
        <Controller
          rules={{ required: TEXTINPUT_ERROR_MESSAGE }}
          name={TEXTINPUT_NAME}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                onChange={onChange}
                value={value}
                error={Boolean(errors.textInput?.message)}
                label={errors.textInput?.message || TEXTINPUT_LABEL}
              />
            );
          }}
        />

        <ErrorMessage
          errors={errors}
          name={TEXTINPUT_NAME}
          render={({ message }) => (
            <p className={classNames(styles.p)}>{message}</p>
          )}
        />

        <h1 className={classNames(styles.inp_title)}>textArea</h1>

        <Controller
          rules={{ required: TEXTAREA_ERROR_MESSAGE }}
          name={TEXTAREA_NAME}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              error={Boolean(errors.textArea?.message)}
              value={value}
              label={errors.textArea?.message || TEXTAREA_LABEL}
            />
          )}
        />

        <ErrorMessage
          errors={errors}
          name={TEXTAREA_NAME}
          render={({ message }) => (
            <p className={classNames(styles.p)}>{message}</p>
          )}
        />

        <h1 className={classNames(styles.inp_title)}>positions</h1>

        <Controller
          rules={{ required: SELECT_POSITIONS_ERROR_MESSAGE }}
          name={SELECT_POSITIONS_NAME}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <FormControl fullWidth>
                <InputLabel
                  id={SELECT_POSITIONS_LABEL_ID}
                  style={{
                    color: errors.positions?.message && ERROR_COLOR,
                  }}
                >
                  {errors.positions?.message || SELECT_POSITIONS_LABEL_VALUE}
                </InputLabel>
                <Select
                  labelId={SELECT_POSITIONS_PROPS_LABEL_ID}
                  id={SELECT_POSITIONS_PROPS_ID}
                  value={value}
                  label={SELECT_POSITIONS_PROPS_LABEL_VALUE}
                  error={Boolean(errors.positions?.message)}
                  onChange={onChange}
                >
                  {positionsOptions?.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        />

        <ErrorMessage
          errors={errors}
          name={SELECT_POSITIONS_NAME}
          render={({ message }) => (
            <p className={classNames(styles.p)}>{message}</p>
          )}
        />

        <h1 className={classNames(styles.inp_title)}>relations</h1>

        <Controller
          rules={{ required: SELECT_RELATIONS_ERROR_MESSAGE }}
          name={SELECT_RELATIONS_NAME}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <FormControl fullWidth>
                <InputLabel
                  id={SELECT_RELATIONS_LABEL_ID}
                  style={{
                    color: errors.relations?.message && ERROR_COLOR,
                  }}
                >
                  {errors.relations?.message || SELECT_RELATIONS_LABEL_VALUE}
                </InputLabel>
                <Select
                  labelId={SELECT_RELATIONS_PROPS_LABEL_ID}
                  id={SELECT_RELATIONS_PROPS_ID}
                  value={value}
                  label={SELECT_RELATIONS_PROPS_LABEL_VALUE}
                  error={Boolean(errors.relations?.message)}
                  onChange={onChange}
                >
                  {relationsOptions?.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        />

        <ErrorMessage
          errors={errors}
          name={SELECT_RELATIONS_NAME}
          render={({ message }) => (
            <p className={classNames(styles.p)}>{message}</p>
          )}
        />

        <button type={FORM_BUTTON_TYPE} className={classNames(styles.button)}>
          Отправить
        </button>
      </form>
    </div>
  );
}
