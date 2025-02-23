import React, { useEffect } from "react";
import Layout from "./Layout";
import CreateTransaction from "../components/CreateTransaction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <div className="box">
        <CreateTransaction />
      </div>
    </Layout>
  );
};

export default Transactions;
