import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./../images/loading.svg";
import "./Login.css";

export const Login = () => {
  const { status, loginUserWithCredentials } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const loginHandler = async () => {
    if (loginCredentials.username && loginCredentials.password) {
      const result = await loginUserWithCredentials(
        loginCredentials.username,
        loginCredentials.password
      );
      if (result === true) {
        navigate(state?.from ? state.from : "/");
      }
    } else {
      setLoginCredentials({
        ...loginCredentials,
        msg: "Username is required & Password is required",
      });
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <div className='login-input'>
        <input
          type='text'
          className='input-txt-error'
          required
          value={loginCredentials.username}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              msg: "",
              username: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-user'></i> Username
        </span>
      </div>

      <div className='login-input'>
        <input
          className='input-txt-error'
          required
          type={loginCredentials.showPassword ? "text" : "password"}
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              msg: "",
              password: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-lock'></i> Password
        </span>
        <button
          className='show-pass'
          onClick={() =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              showPassword: !loginCredentials.showPassword,
            }))
          }
        >
          {loginCredentials.showPassword ? (
            <i className='far fa-lg fa-eye-slash'></i>
          ) : (
            <i className='far fa-lg  fa-eye'></i>
          )}
        </button>
      </div>
      <h3>
        {status.loading && (
          <img className='loading' src={Loading} alt={Loading} />
        )}
      </h3>
      <p>{loginCredentials.msg}</p>
      <button className='btn btn-main' onClick={loginHandler}>
        Login
      </button>
      <p>
        Don't have an account?
        <Link to='/signup'>
          <span className='pink-txt'> Sign up!</span>
        </Link>
      </p>
    </div>
  );
};
