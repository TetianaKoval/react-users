import { createContext, useState, useEffect } from "react";
import Departments from "../data/Departments.json";
import Countries from "../data/Countries.json";
import Statuses from "../data/Statuses.json";

export const DataUsersContext = createContext();

export const DataUsersProvider = ({children}) => {
  const [departments, setDepartments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    setDepartments(JSON.parse(localStorage.getItem('departments') || JSON.stringify(Departments)));

    setCountries(JSON.parse(localStorage.getItem('countries') || JSON.stringify(Countries)));

    setStatuses(JSON.parse(localStorage.getItem('statuses') || JSON.stringify(Statuses)));
  }, []);

  return (
    <DataUsersContext.Provider
      value={{departments, countries, statuses}}
    >
      {children}
    </DataUsersContext.Provider>
  )
}