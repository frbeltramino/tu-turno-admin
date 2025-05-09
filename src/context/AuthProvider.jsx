import React, { useState } from 'react'
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({ })
  const [errorLogin, setErrorLogin] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authStatus, setAuthStatus] = useState('not-authenticated');
  const [errorRegister, setErrorRegister] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [authState, setAuthState] = useState({
    isAuthenticated: false, // Cambiar a true cuando el usuario inicie sesión
    user: null
  });

  const login = (userData) => {
    setAuthState({
      isAuthenticated: true,
      user: userData
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };



  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        errorLogin,
        setErrorLogin,
        loadingLogin,
        setLoadingLogin,
        authStatus,
        setAuthStatus,
        ...authState,
        login,
        logout,
        errorRegister,
        setErrorRegister,
        loadingRegister,
        setLoadingRegister,
      }}
    >

      {children}
    </AuthContext.Provider>
  )
}