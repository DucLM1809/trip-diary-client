import React from "react";
import { useForm } from "react-hook-form";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 h-3/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-left items-center ">
          <img src={logo} alt="logo" width={50} height={50} />
          <span className="text-white font-extrabold text-5xl mt-2 ml-2 font-logo">
            TriPari's
          </span>
        </div>
        <div className="flex flex-col justify-left items-center text-white mt-3">
          Forgot your password?
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
            className="outline-medium-blue border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.account && (
            <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.account?.message}
            </p>
          )}
          <button className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray" onSubmit={handleSubmit}>
            <Link to="/reset-password" className="block text-sm">
              Send request
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
