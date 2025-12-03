import { createContext, useState, useEffect } from "react";
import API from "@/utils/api";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load token + user ONLY on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse user from local storage", e);
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/api/auth/login", { email, password });

    if (res.data.user && res.data.token) {
      setUser(res.data.user);
      setToken(res.data.token);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    }
  };

  const register = async (name, email, password) => {
    await API.post("/api/auth/signup", { name, email, password });
  };

  const logout = () => {
    setUser(null);
    setToken("");

    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

