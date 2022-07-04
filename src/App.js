import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import SearchAppBar from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchAppBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
