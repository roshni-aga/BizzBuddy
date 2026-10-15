import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // load token from localStorage on refresh
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // LOGIN
  const login = (newToken) => {
    localStorage.setItem("token", newToken); 
    setToken(newToken);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
