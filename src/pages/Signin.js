import React from "react";
import GoogleLogin from "react-google-login";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Signin = () => {
  const onSuccess = (res) => {
    console.log("[Login success] currentUser: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
            {...register("account", { required: true })}
            placeholder="User Name or Email"
            className="outline-medium-blue border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.account?.type === "required" && (
            <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {" "}
              This field is required
            </p>
          )}
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 9,
            })}
            placeholder="Password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.password?.type === "required" && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {" "}
              This field is required
            </p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {" "}
              Password must be 6 to 9 characters
            </p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {" "}
              Password must be 6 to 9 characters
            </p>
          )}
          <button className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray">
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
          <Link to="/forget-password" className="block py-2 px-6 text-sm">
            ForgetPassword
          </Link>
            <a className="font-normal cursor-pointer underline hover:text-light-blue">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
