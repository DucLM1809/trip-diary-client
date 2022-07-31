import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../redux/actions";
import api from "../../api/axios";

const VerifyAccount = () => {
  const dispatch = useDispatch();
  let { prefix, id, token } = useParams();
  const navigate = useNavigate();

  console.log(token);

  const handleVerify = async () => {
    const res = await api.post(`/users/${id}/verify/${token}`).catch((err) => {
      dispatch(verifyAccount({error: true, msg: err.response.data.detail}));
      navigate("/sign-in");
    });
    if (res) {
      console.log(res);
      dispatch(verifyAccount("Verify Account Successfully!"));
      navigate("/sign-in");
    }
  };

  handleVerify();
};

export default VerifyAccount;
