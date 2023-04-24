import "./App.css";
import MyForm from "./components/MyForm/MyForm";
import SingleAutoComplete from "./components/SingleAutoComplite/SingleAutoComplete";

function App() {
  return (
    <div className="App">
      <div className={"container"}>
        <section>
          <MyForm />
        </section>
        <section>
          <SingleAutoComplete />
        </section>
      </div>
    </div>
  );
}

export default App;
