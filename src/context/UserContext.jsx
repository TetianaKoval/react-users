import { createContext, useState, useEffect } from 'react';
import initialUsers from "../data/Users.json";

console.log(initialUsers);

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(initialUsers));

    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <UserContext.Provider value={{users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
}