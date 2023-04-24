import ValidationForm from "./components/ValidationForm/ValidationForm";
import SingleAutoComplete from "./components/SingleAutoComplite/SingleAutoComplete";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className={"container"}>
        <section>
          <ValidationForm />
        </section>
        <section>
          <SingleAutoComplete />
        </section>
      </div>
    </div>
  );
}

export default App;
