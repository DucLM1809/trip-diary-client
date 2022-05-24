import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import logo from "../../assests/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { loginAccount, loginGoogle, logOut } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    handleLoginGoogle(response);
    dispatch(loginGoogle(response));
    navigate(from, { replace: true });
  };

  const handleLoginGoogle = async (data) => {
    // let res = await api.post("/api/login/google", {
    let res = await api.post("/login/google", {
      tokenId: data.tokenId,
    });

    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    console.log(res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleLoginAccount(data);
    // dispatch(loginAccount(data));
  };

  const handleLoginAccount = async (data) => {
    let res = await api
      .post(
        // "/api/login/",
        "/login/",
        {
          username: data.account,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((error) => {
        console.log(error);
        alert(error.response.data.detail)
      });

    if (res) {
      dispatch(loginAccount(data));
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    }
    // else {
    //   navigate("/sign-in");
    // }
    console.log(res);
  };

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="logo" className="w-9" />
          <span className="text-white font-extrabold text-3xl ml-2 font-logo">
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("account", {
              required: "You must specify an email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm outline-medium-blue"
          />
          {errors?.account && (
            <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors.account.message}
            </p>
          )}
          <input
            type="password"
            {...register("password", {
              required: "You must specify password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              maxLength: {
                value: 10,
                message: "Password must have maximum 10 characters",
              },
            })}
            placeholder="Password"
            className="border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm outline-medium-blue"
          />
          {errors?.password && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors.password.message}
            </p>
          )}
          <button
            className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
            // onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
          <span className="text-center text-white text-sm font-normal mb-2">
            or
          </span>
          <div>
            <GoogleLogin
              clientId="518727150893-4c80ip0io9lbbnmbrujki5l8cn4vrvvv.apps.googleusercontent.com"
              buttonText="Login via Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="w-full justify-center"
            />
          </div>
          <div className="flex justify-between text-white mt-2">
            <Link
              to="/forget-password"
              className="font-normal underline hover:text-light-blue"
            >
              Forget password?
            </Link>
            <Link
              to="/sign-up"
              className="font-normal underline hover:text-light-blue"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
