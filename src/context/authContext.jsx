import { createContext, useState } from "react";

export const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {
  const [questionData, setAnswerData] = useState(null);

  const loginUser = (userData) => {
    setAnswerData(userData);
  };

  const logoutUser = () => {
    setAnswerData(null);
  };

  return (
    <AuthContext.Provider value={{ questionData, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
