import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ loading: "", success: "", error: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loginFromApi = JSON.parse(localStorage?.getItem("login"));
    loginFromApi?.login && setLogin(true);
  }, []);

  useEffect(() => {
    const userFromApi = JSON.parse(localStorage?.getItem("user"));
    userFromApi?._id && setUser({ ...userFromApi });
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
        setLogin(true);
        localStorage?.setItem("login", JSON.stringify({ login: true }));
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
        localStorage?.setItem("login", JSON.stringify({ login: true }));
        localStorage?.setItem("user", JSON.stringify(response.data.user));
        setLogin(true);
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
    setLogin(false);
    setStatus({ loading: "", success: "", error: "" });
    setUser({
      _id: "",
      username: "",
      email: "",
      password: "",
    });
    localStorage?.removeItem("login");
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
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
