import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useCart } from "../../context/cartContext";
import "./login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Login() {
  const [email, setEmail] = useState("batman@gmail.com");
  const [password, setPassword] = useState("batman@12");
  const [error, setError] = useState("");
  const { user, loginUserWithCredentials } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { message, success } = await loginUserWithCredentials(
      email,
      password
    );
    if (success) {
      navigate(state?.from ? state?.from : "/", { replace: true });
    } else {
      setError(message);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    const { message, success } = await loginUserWithCredentials(
      "batman@gmail.com",
      "batman@12"
    );
    if(success) {
      navigate(state?.from ? state?.from : "/" , { replace : true });
    } else { 
      setError(message)
    }
  }
  useEffect(() => {
    user && navigate("/", { replace: true });
  }, []);

  return (
    <div className="login">
      <div className="login__wrapper">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          className="login__input login__email"
          placeholder="batman@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="login__input login__password"
          placeholder="batman@12"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login__btn primary" onClick={(e) => handleLogin(e)}>
          Login
        </button>

        <button className="login__btn primary" onClick={(e) => handleGuestLogin(e)}>
          Login with guest user
        </button>

        <span className="login__forgot">Forgot Password</span>

        <Link to="/signup">
          <button
            className="login__btn secondary"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
