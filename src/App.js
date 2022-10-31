import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import ButtonAppBar from "./components/Header";
import Loader from "./components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.utils";
import { createContext, useState } from "react";

export const Context = createContext();

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export function App() {
  // const [user, loading, error] = useAuthState(auth);
  const loading = useAuthState(auth)[1];
  const [coinList, setCoinList] = useState([]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Context.Provider value={[coinList, setCoinList]}>
        <BrowserRouter>
          <ButtonAppBar />
          <AppRouter />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

//export default App;
