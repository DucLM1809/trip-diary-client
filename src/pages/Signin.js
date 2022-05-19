import React from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import logo from "../images/logo.png";

const Signin = () => {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 h-3/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="logo" />
          <span className="text-medium-blue font-extrabold text-3xl ml-2 font-logo">
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("account", {required: true})}
            placeholder="User Name or Email"
            className="outline-medium-blue border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.account?.type === "required" && <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
          <input
            type="password"
            {...register("password", {required: true})}
            placeholder="Password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.password?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
          <button
            className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
          >
            Login
          </button>
          <span
            className="text-center text-white text-sm font-normal mb-2 relative after:content-[''] after:absolute after:w-[124px] after:h-[0.05px] after:bg-white after:top-3 after:right-0
          before:content-[''] before:absolute before:w-[124px] before:h-[0.05px] before:bg-white before:top-3 before:left-0"
          >
            or
          </span>
          <div>
            <GoogleLogin
              clientId="925214939780-qg7n3pqem43bv3qopl9jfjg4rthlg4p2.apps.googleusercontent.com"
              buttonText="Login via Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="w-full justify-center"
            />
          </div>
          <div className="flex justify-between text-white mt-2">
            <a className="font-normal cursor-pointer underline hover:text-light-blue">
              Forget Password?
            </a>
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
