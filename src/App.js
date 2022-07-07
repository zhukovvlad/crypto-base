import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import SearchAppBar from "./components/Header";
import Loader from "./components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.utils";

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }
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
