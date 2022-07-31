import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const VerifyAccount = () => {
  let { prefix, id, token } = useParams();
  const navigate = useNavigate();

  console.log(token);

  const handleVerify = async () => {
    const res = await api.post(`/users/${id}/verify/${token}`);
    if (res) {
      console.log(res);
      navigate("/sign-in");
    }
  };

  handleVerify();
};

export default VerifyAccount;
