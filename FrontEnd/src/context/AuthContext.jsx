import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user from localStorage on app start
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Date.now() > parsed.expiry) {
        localStorage.removeItem("user");
        setUser(null);
      } else {
        setUser(parsed.user);
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    const data = {
      user: userData,
      expiry: Date.now() + 10 * 1000
    };

    localStorage.setItem("user", JSON.stringify(data));
    setUser(userData);
  };

  // 🔹 Logout → clear everything
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
