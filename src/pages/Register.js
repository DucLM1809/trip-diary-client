import React from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import logo from "../images/logo.png";

const FormSignup = ({ submitForm }) => {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 h-4/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center mt-0">
        <img src={logo} alt="logo" className="w-9" />
          <span className="text-white font-extrabold text-3xl ml-2 font-logo">
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("account", {required: true})}
            placeholder="Email"
            className="outline-medium-blue border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.account?.type === "required" && <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
          <input
            type="text"
            {...register("username", {required: true})}
            placeholder="Username"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.username?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
          <input
            type="password"
            {...register("password", {required: true})}
            placeholder="Password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
            {errors?.password?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
            <input
            type="password"
            {...register("cpassword", {required: true})}
            placeholder="Confirm Password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
            {errors?.cpassword?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
          <button
            className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
          >
            Register
          </button>
        </form>
            <div className="outline-medium-blue mt-0 py-2 w-100 p-3 rounded-3 font-normal text-sm text-justify text-white">
                By registering, I agree to processing of personal data and Terms of Use of the app.
            </div>
            <div className="outline-medium-blue mt-0 py-2 w-100 p-3 rounded-3 font-normal text-sm text-justify text-white">
            Do you already have an account? <a href="#">Login</a>
            </div>
      </div>
    </div>
  );
};

export default FormSignup;
