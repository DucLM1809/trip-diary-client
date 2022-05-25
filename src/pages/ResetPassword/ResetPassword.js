import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assests/images/logo.png";
import api from "../../api/axios";

const ResetPassword = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    handleResetPassword(data);
    console.log(data);
  };

  console.log(window.location.pathname);

  let { prefix, id, token } = useParams();
  console.log(id, token);

  const handleResetPassword = async (data) => {
    let res = await api({
      url: `/users/reset-password/${id}/${token}`,
      method: "post",
      data: {
        password: data.password,
      },
    });

    if (res) {
      navigate("/sign-in");
    }

    console.log(res);
  };

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 h-3/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="logo" className="w-9" />
          <span className="text-white font-extrabold text-5xl ml-2 mt-2 font-logo">
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            placeholder="New password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.password && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.password?.message}
            </p>
          )}
          <input
            type="password"
            {...register("confirm", {
              required: "You must specify a confirm password",
              validate: (value) =>
                value === watch("password") || "The passwords do not match",
            })}
            placeholder="Confirm your password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.confirm && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.confirm?.message}
            </p>
          )}
          <button
            className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
            onClick={handleSubmit(onSubmit)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
