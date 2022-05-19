import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/sign-in" element={<Signin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
