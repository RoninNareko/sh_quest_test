import { useState, useEffect } from "react";
import "./App.css";
import { GET_POSITIONS, GET_RELATIONS } from "./query/query";
import { useQuery } from "@apollo/client";
import CustomSelect from "./components/CustomSelect";

function App() {
  const [store, setStore] = useState({
    cutomSelectTextInput: {
      data: [],
      selectedData: [],
    },
    cutomSelectTextAreaData: {
      data: [],
      selectedData: [],
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

  useEffect(() => {
    if (!relationsDataQueryLoading) {
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextInput: {
            data: relationsDataQuery.applicantIndividualCompanyRelations.data,
            selectedData: [],
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
  console.log(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    store.cutomSelectTextInput.data
  );

  return (
    <div className="App">
      <span>Relations</span>

      <CustomSelect
        setStore={setStore}
        multiple={true}
        store={store}
        data={store.cutomSelectTextInput.data}
      />
      <span>Positions</span>

      <CustomSelect
        multiple={false}
        store={store}
        setStore={setStore}
        data={store.cutomSelectTextInput.data}
      />
    </div>
  );
}

export default App;
