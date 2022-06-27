<<<<<<< HEAD
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
import AfterSearchPage from "./pages/SearchPage/AfterSearchPage";

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
        <Route exact path="/edit/trip/:id" element={<Create />}></Route>
        <Route exact path="/trips" element={<Trips />}></Route>
        <Route exact path="/user" element={<UserHomePage />}></Route>
        <Route exact path="/nexttrip" element={<NextTrip />}></Route>
        <Route exact path="/pasttrip" element={<PastTrip />}></Route>
        <Route exact path="/aftersearchpage" element={<AfterSearchPage/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
=======
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin/Signin";
import Register from "./pages//Register/Register";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UnAuth from "./components/UnAuth/UnAuth";
import Create from "./pages/Create/Create";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import Trips from "./pages/Trips/Trips";
import NextTrip from "./pages/UserHomePage/NextTrip";
import PastTrip from "./pages/UserHomePage/PastTrip";
import RemindTrip from "./pages/RemindTrip/RemindTrip";
import TripBeforeSearch from "./pages/TripBeforeSearch/TripBeforeSearch";
import AfterSearch from "./pages/AfterSearch/AfterSearch";
import travelIconsMap from "./assests/images/11422-travel-icons-map.json";
import Lottie from "lottie-react";
import Profile from "./pages/UserHomePage/Profile";

const Animation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/explore");
    }, 2700);
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Lottie
        animationData={travelIconsMap}
        loop={true}
        style={{ height: "50vh" }}
      />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<UnAuth />}>
        <Route exact path="/" element={<Animation />}></Route>
        <Route exact path="/explore" element={<LandingPage />}></Route>
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
        <Route exact path="/tripbeforesearch" element={<TripBeforeSearch />}></Route>
        <Route exact path="/nexttrip" element={<NextTrip />}></Route>
        <Route exact path="/pasttrip" element={<PastTrip />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
>>>>>>> 146f64a7f921ee7387453da31559b95f1a62546d
