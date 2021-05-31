import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const AuthContext = createContext();

export const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (logoutUser, navigate) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        console.log("here");
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
};

export const AuthProvider = ({ children }) => {
  // const [login, setLogin] = useState(false);
  const { token: savedToken } = JSON.parse(localStorage?.getItem("token")) || {
    token: null,
  };
  if (savedToken) {
    setupAuthHeaderForServiceCalls(savedToken);
  }
  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ loading: "", success: "", error: "" });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loginFromApi = JSON.parse(localStorage?.getItem("login"));
  //   loginFromApi?.login && setLogin(true);
  // }, []);

  useEffect(() => {
    const userFromApi = JSON.parse(localStorage?.getItem("user"));
    userFromApi?._id && setUser({ ...userFromApi });
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus({ loading: "Checking.." });
      const response = await axios.post(
        "https://api-pretube.prerananawar1.repl.co/auth/login",
        {
          username: username,
          password: password,
        }
      );
      console.log({ response });
      if (response.data.success) {
        setUser(response.data.user);
        console.log(response.data.token);
        localStorage?.setItem(
          "token",
          JSON.stringify({ token: response.data.token })
        );
        setToken(response.data.token);
        setupAuthHeaderForServiceCalls(response.data.token);
        localStorage?.setItem("user", JSON.stringify(response.data.user));
        setStatus({ success: `Hello, login successful ${username}` });
      }
      return response.data.success;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus({ error: error.response.data.errorMessage });
      }
      return error;
    }
  };

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus({ loading: "Adding..." });
      const response = await axios.post(
        "https://api-pretube.prerananawar1.repl.co/auth/signup",
        {
          username: username,
          password: password,
          email: email,
        }
      );
      console.log({ response });
      if (response.data.success) {
        setUser(response.data.user);
        console.log(response.data.token);
        localStorage?.setItem(
          "token",
          JSON.stringify({ token: response.data.token })
        );
        setToken(response.data.token);
        setupAuthHeaderForServiceCalls(response.data.token);
        localStorage?.setItem("user", JSON.stringify(response.data.user));
        setStatus({ success: `Hurray! Signup Successful ${username}` });
      }
      return response.data.success;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus({ error: error.response.data.errorMessage });
      }
    }
  };

  const logout = () => {
    setToken("");
    setStatus({ loading: "", success: "", error: "" });
    setUser({
      _id: "",
      username: "",
      email: "",
      password: "",
    });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        status,
        setStatus,
        signUpUserWithCredentials,
        loginUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
