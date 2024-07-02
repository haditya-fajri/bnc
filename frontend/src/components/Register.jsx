import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [corporateAccountNo, setCorporateAccountNo] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        corporateAccountNo,
        corporateName,
        userId,
        role,
        phoneNo,
        email,
        password,
        userName,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-white-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={register} className="box">
                <p className="has-text-centered">{msg}</p>
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
                  <label className="label">Corporate Name</label>
                  <div className="control">
                    <input
                      type="text"
                      value={corporateName}
                      onChange={(e) => setCorporateName(e.target.value)}
                      className="input"
                      placeholder="Corporate Name"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">User ID</label>
                  <div className="control">
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="input"
                      placeholder="User ID"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">User Name</label>
                  <div className="control">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input"
                      placeholder="User Name"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Role</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="maker">Maker</option>
                        <option value="approver">Approver</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Phone No.</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="Phone No"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="button is-warning is-fullwidth"
                  >
                    Submit
                  </button>
                </div>
                <div className="is-light has-text-centered">
                  ALready have an account
                  <NavLink to="/" className="pl-2 has-text-warning">
                    Login Now {">"}
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

export default Register;
