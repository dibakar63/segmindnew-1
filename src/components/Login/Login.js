import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/auth";
import { API } from "../../Constants/Api";
import { useDispatch } from "react-redux";
import { setLoginDetails } from "../../slice/SessionSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [auth, setAuth] = useAuth();
  const [username, setusername] = useState("");

  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(`${API}/auth/signin`, {
        username,
        password,
      });
      if (res && res.status === 200) {
        toast.success("login successful");
        dispatch(setLoginDetails(res.data))
        setAuth({
          ...auth,
          name: res.data.name,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(auth)

  return (
    <div className="Login">
      <div className="loginw">
        <div className="vector1"></div>
        <div className="vector3"></div>
        <div className="vector2"></div>
        <span>Hi! Welcome To Legacies AI</span>
      </div>
      <div className="loginCard">
        <h1>Login</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <label>New User?</label>{" "}
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "blue",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginTop: "53px",
          }}
        >
          <span>
            <strong>Email</strong>
          </span>

          <input
            type="text"
            placeholder="Enter your name"
            className="signupinput"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />

          <span>
            <strong>Password</strong>
          </span>

          <input
            type="password"
            placeholder="Enter Password"
            className="signupinput"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <br />
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "blue",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Forget Your password?
        </button>
        <br />
        <button
          style={{
            width: "470px",
            height: "49px",
            borderRadius: "15px",
            background: "blue",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={() => handleSubmit()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
