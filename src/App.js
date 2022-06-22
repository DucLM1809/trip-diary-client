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
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import Trips from "./pages/Trips/Trips";
import NextTrip from "./pages/UserHomePage/NextTrip";
import PastTrip from "./pages/UserHomePage/PastTrip";
import RemindTrip from "./pages/RemindTrip/RemindTrip";
import TripBeforeSearch from "./pages/TripBeforeSearch/TripBeforeSearch";
import AfterSearch from "./pages/AfterSearch/AfterSearch";

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
      <Route element={<UnAuth />}>
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
      <Route
        exact
        path="/trips/:id/remind-again"
        element={<RemindTrip />}
      ></Route>

      <Route element={<RequireAuth />}>
        <Route exact path="/home" element={<TripBeforeSearch />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
        <Route exact path="/edit/trip/:id" element={<Create />}></Route>
        <Route exact path="/trips/trip/:id" element={<Trips />}></Route>
        <Route exact path="/trips" element={<Home />}></Route>
        <Route exact path="/trips/search" element={<AfterSearch />}></Route>
        <Route exact path="/user" element={<UserHomePage />}></Route>
        <Route
          exact
          path="/tripbeforesearch"
          element={<TripBeforeSearch />}
        ></Route>
        <Route exact path="/nexttrip" element={<NextTrip />}></Route>
        <Route exact path="/pasttrip" element={<PastTrip />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
