import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../utils/firebase";

/* the verification mechanism is that after the user logs in using Google authentication,
the user's id is stored in the local storage. When the app is loaded,
the id is retrieved from the local storage and used to get the user data from the Firebase database.
*/
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // when app is loaded, check if user is already logged in
  useEffect(() => {
    const id = window.localStorage.getItem("id");
    if (id) {
      firebase.getUser(id).then((userData) => {
        setUser(userData);
        setIsLogin(true);
      });
    }
  }, []);

  const login = async () => {
    try {
      const userData = await firebase.loginWithGoogle();
      setUser(userData);
      setIsLogin(true);
      window.localStorage.setItem("id", userData.id);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLogin(false);
    window.localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, AuthContext };
