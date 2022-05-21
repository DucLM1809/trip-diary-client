import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import pageTitles from "./data/pageTitles.json";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  let location = useLocation();
  useEffect(() => {
    setTitle(
      pageTitles.filter((pageTitle) => pageTitle.key === location.pathname)[0]
        .title
    );
  }, [location]);
  document.title = title;

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />}></Route>
      <Route exact path="/sign-in" element={<Signin />}></Route>
      <Route exact path="/sign-up" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
