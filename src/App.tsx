import { useState, useEffect } from "react";
import "./App.css";
import { GET_POSITIONS, GET_RELATIONS } from "./query/query";
import { useQuery } from "@apollo/client";
import CustomSelect from "./components/CustomSelect";

import { IStore } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";

function App() {
  const [store, setStore] = useState<IStore>({
    cutomSelectTextInput: {
      data: [],
      selectedData: [],
      error: {
        errorMessage: null,
      },
    },
    cutomSelectTextAreaData: {
      data: [],
      selectedData: [],
      error: {
        errorMessage: null,
      },
    },
  });

  const {
    loading: relationsDataQueryLoading,
    error: relationsDataQueryError,
    data: relationsDataQuery,
  } = useQuery(GET_RELATIONS);
  const {
    loading: positionsDataQueryLoading,
    error: positionsDataQueryError,
    data: positionsDataQuery,
  } = useQuery(GET_POSITIONS);

  if (positionsDataQueryError || relationsDataQueryError) console.log("error");
  useEffect(() => {
    if (!relationsDataQueryLoading) {
      //@ts-ignore
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextInput: {
            data: relationsDataQuery.applicantIndividualCompanyRelations.data,
            selectedData: [],
            error: {
              errorMessage: null,
            },
          },
        };
      });
    }

    if (!positionsDataQueryLoading) {
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextAreaData: {
            data: positionsDataQuery.applicantIndividualCompanyPositions.data,
            selectedData: [],
            error: {
              errorMessage: null,
            },
          },
        };
      });
    }
  }, [
    relationsDataQuery,
    positionsDataQuery,
    relationsDataQueryLoading,
    positionsDataQueryLoading,
  ]);

  const { handleSubmit } = useForm();
  //@ts-ignore
  const onSubmit: SubmitHandler = (data) => {
    const inputTextInputValue = document.querySelectorAll("input")[1].value;
    const buttons = document.querySelectorAll(".myButton");
    if (buttons.length > 1) {
      // @ts-ignore
      buttons[0].style.display = "none";
    }
    if (
      store.cutomSelectTextAreaData.selectedData.length === 0 ||
      !store.cutomSelectTextAreaData.selectedData
    ) {
      console.log("error пустое поле!!");
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextAreaData: {
            data: prevState.cutomSelectTextAreaData.data,
            selectedData: prevState.cutomSelectTextAreaData.selectedData,
            error: {
              errorMessage: "Пусто",
            },
          },
        };
      });
    } else if (
      store.cutomSelectTextInput.selectedData.length === 0 ||
      !store.cutomSelectTextInput.selectedData ||
      !inputTextInputValue.length
    ) {
      //@ts-ignore
      console.log("error пустое поле!!");
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextInput: {
            //
            data: prevState.cutomSelectTextInput.data,
            selectedData: prevState.cutomSelectTextInput.selectedData,
            error: {
              errorMessage: "Пусто",
            },
          },
        };
      });
    } else {
      console.log("sucess-values", store);
      const succesText = document.querySelector("h3");
      if (succesText) {
        succesText.textContent = " Успех -Посмотрите данные в консоли";
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={"myP"}>
          <b>Relations</b>
        </p>

        <CustomSelect
          errorMessage={store.cutomSelectTextAreaData.error.errorMessage}
          setStore={setStore}
          multiple={true}
          store={store}
          data={store.cutomSelectTextAreaData.data}
        />
        <p className={"myP"}>
          <b>Positions</b>
        </p>

        <CustomSelect
          errorMessage={store.cutomSelectTextInput.error.errorMessage}
          multiple={false}
          store={store}
          setStore={setStore}
          data={store.cutomSelectTextInput.data}
        />
        <Button className={"myButton"} variant={"contained"} type={"submit"}>
          Check validation
        </Button>
        <h3 style={{ color: "green" }}>{null}</h3>
      </form>
    </div>
  );
}

export default App;
