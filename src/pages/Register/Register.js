import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assests/images/logo.png";
import api from "../../api/axios";

const FormSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleRegister(data);
  };

  const handleRegister = async (data) => {
    // let res = await api.post("/api/users/", {
    let res = await api
      .post("/users/", {
        email: data.account,
        username: data.username,
        password: data.password,
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.detail);
        setError(error.response.data.detail);
      });

    if (res) {
      navigate("/sign-in");
    }
    console.log(res);
  };

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
          {error ? (
            <>
              <div className="bg-light-pink border-1 border-red text-red py-2 px-3 mt-3 rounded-3 relative text-center">
                <span className="block sm:inline">{error}</span>
              </div>
            </>
          ) : (
            <></>
          )}
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
          <input
            type="text"
            {...register("username", {
              required: "You must specify user name",
            })}
            placeholder="Username"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.username && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.username?.message}
            </p>
          )}
          <input
            type="password"
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            placeholder="Password"
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
            placeholder="Confirm Password"
            className="outline-medium-blue border-solid border-gray border-1 mt-4 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.confirm && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.confirm?.message}
            </p>
          )}
          <button className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray">
            Register
          </button>
        </form>
        <div className="outline-medium-blue mt-0 py-2 w-100 p-3 rounded-3 font-normal text-sm text-justify text-white">
          Do you already have an account?{" "}
          <Link to="/sign-in" className="underline hover:text-light-blue">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormSignup;
