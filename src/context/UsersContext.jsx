import { createContext, useState, useEffect } from "react";
import initialUsers from "../data/Users.json";

export const UsersContext = createContext();

export const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers));

    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <UsersContext.Provider value={{users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}