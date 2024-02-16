import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    name: null,
    token: "",
  });

  

 

  useEffect(() => {
    const data = localStorage.getItem("auth");
    console.log("authdata",data)
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        name: parseData.name,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
