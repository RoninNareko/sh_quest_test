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
    loading: relationsDataQueryLoadins,
    error: relationsDataQueryError,
    data: relationsDataQuery,
  } = useQuery(GET_RELATIONS);
  const {
    loading: positionsDataQueryLoadins,
    error: positionsDataQueryError,
    data: positionsDataQuery,
  } = useQuery(GET_POSITIONS);

  useEffect(() => {
    console.log("positionsDataQuery", positionsDataQuery);

    if (!relationsDataQueryLoadins) {
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
    if (!positionsDataQueryLoadins) {
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
    relationsDataQueryLoadins,
    positionsDataQueryLoadins,
  ]);
  console.log(positionsDataQuery);
  console.log(relationsDataQuery);
  return (
    <div className="App">
      <span>Relations</span>
      {/* <DisplayLocations /> */}
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
        data={store.cutomSelectTextAreaData.data}
      />
    </div>
  );
}

export default App;
