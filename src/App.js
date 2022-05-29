import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin/Signin";
import Register from "./pages//Register/Register";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import pageTitles from "./data/pageTitles.json";
import { useEffect, useState } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { useSelector } from "react-redux";
import UnAuth from "./components/UnAuth/UnAuth";
import Create from "./pages/Create/Create";
<<<<<<< HEAD
import HomePage from "./pages/HomePage/HomePage";
=======
import Trips from "./pages/Trips/Trips";
>>>>>>> c3b6414f1d440aa809b32bd0b260c1f7dc2d3ac5

function App() {
  // const [title, setTitle] = useState("");
  const [auth, setAuth] = useState(false);

  // let location = useLocation();
  // console.log(location);

  // useEffect(() => {
  //   setTitle(
  //     pageTitles.filter((pageTitle) => pageTitle.key === location.pathname)[0]
  //       .title
  //   );
  // }, [location]);
  // document.title = title;

  let userAccount = useSelector((state) => state.user);
  useEffect(() => {
    setAuth(userAccount.auth);
  }, [userAccount]);

  return (
    <Routes>
      <Route element={<UnAuth auth={auth} />}>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/sign-in" element={<Signin />}></Route>
        <Route exact path="/sign-up" element={<Register />}></Route>
        <Route
          exact
          path="/forget-password"
          element={<ForgetPassword />}
        ></Route>
        <Route
          exact
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
      </Route>

      <Route element={<RequireAuth auth={auth} />}>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
        <Route exact path="/trips" element={<Trips />}></Route>
      </Route>

      <Route element={<HomePage />} exact path="/homepage"></Route>
    </Routes>
  );
}

export default App;
