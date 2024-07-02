import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [corporateAccountNo, setCorporateAccountNo] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ corporateAccountNo, userId, password }));
  };

  return (
    <section className="hero has-background-white-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                <div className="field">
                  <label className="label">Corporate Account No.</label>
                  <div className="control">
                    <input
                      type="text"
                      value={corporateAccountNo}
                      onChange={(e) => setCorporateAccountNo(e.target.value)}
                      className="input"
                      placeholder="Corporate Account No."
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">User ID</label>
                  <div className="control">
                    <input
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      type="text"
                      className="input"
                      placeholder="User ID"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Login Password</label>
                  <div className="control">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="input"
                      placeholder="Login Password"
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="button is-warning is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
                <div className="is-light has-text-centered">
                  Without Account?
                  <NavLink to="/register" className="pl-2 has-text-warning">
                    Register Now {">"}
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
