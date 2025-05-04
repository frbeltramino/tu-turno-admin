import React, { useState } from 'react'
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({ })
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authStatus, setAuthStatus] = useState('not-authenticated');


  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        error,
        setError,
        loadingLogin,
        setLoadingLogin,
        authStatus,
        setAuthStatus
      }}
    >

      {children}
    </AuthContext.Provider>
  )
}