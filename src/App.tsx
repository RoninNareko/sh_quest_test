import "./App.css";
import CustomSelect from "./components/CustomSelect";

function App() {
  return (
    <div className="App">
      <div>
        <p className={"myP"}>
          <b>Positions</b>
        </p>
        <CustomSelect />
      </div>
    </div>
  );
}

export default App;
