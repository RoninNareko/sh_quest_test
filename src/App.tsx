import "./App.css";

import SingleAutoComplete from "./components/SingleAutoComplite/SingleAutoComplete";

function App() {
  return (
    <div className="App">
      <div>
        <p className={"myP"}>
          <b>Positions</b>
        </p>
        <SingleAutoComplete />
      </div>
    </div>
  );
}

export default App;
