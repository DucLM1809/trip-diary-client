import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assests/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { forgetPassword, loadingPage } from "../../redux/actions";
import Loading from "../Loading/Loading";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(loadingPage(true));
    handleForgetPassword(data);
  };

  const handleForgetPassword = async (data) => {
    let res = await api
      .post("/users/forgot-password", {
        email: data.account,
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.detail);
        setSuccess("");
        setLoading(false);
      });

    if (res) {
      dispatch(forgetPassword());
      setSuccess("Check your email to reset password");
      setError("");
    }
  };

  let page = useSelector((state) => state.page);
  useEffect(() => {
    setLoading(page.loading);
  }, [page]);

  const handleClick = () => {
    dispatch(loadingPage(false));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              {success ? (
                <>
                  <div className="bg-light-success border-1 border-success text-success py-2 px-2 mt-3 rounded-3 relative text-center">
                    <span className="block sm:inline">{success}</span>
                  </div>
                </>
              ) : (
                <></>
              )}
              {error ? (
                <>
                  <div className="bg-light-pink border-1 border-red text-red py-2 px-2 mt-3 rounded-3 relative text-center max-w-[18.125rem]">
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
              <button className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray">
                Send request
              </button>
            </form>
            <button
              className="bg-danger w-[18rem]  mt-1 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray"
              onClick={handleClick}
            >
              <Link to="/sign-in" className="block w-full h-full py-[0.6rem]">Cancel</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
