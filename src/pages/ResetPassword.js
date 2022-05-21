import React from "react";

import { useForm } from "react-hook-form";
import logo from "../images/logo.png";


const ResetPassword = () => {
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
          <img src={logo} width={50} height={50} alt="logo" />
          <span className="text-white font-extrabold text-5xl ml-2 mt-2 font-logo">
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 9
            })}
            placeholder="New password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.password?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
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
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 9
            })}
            placeholder="Confirm your password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.password?.type === "required" && <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] "> This field is required</p>}
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
          <button
            className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
          >
            Reset Password
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
