import React, { useContext, useState } from "react";
import "./Filter.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import { UsersContext } from "./../../context/UsersContext";
import { DepartmentsFilter } from "./../DepartmentsFilter";
import { CountriesFilter } from "./../CountriesFilter";

export const Filter = ({ onFilterChange, onDepartmentCountThree }) => {
  const { users } = useContext(UsersContext);

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [canOtherFiltering, setCanOtherFiltering] = useState(false);

  const handleDepartmentChange = (event) => {
    const { value, checked } = event.target;
    let updatedDepartments;

    if (checked) {
      updatedDepartments = [value, ...selectedDepartments];
    } else {
      updatedDepartments = selectedDepartments.filter(
        (department) => department !== value
      );
    }

    if (updatedDepartments.length > 2) {
      onDepartmentCountThree(true);
      setCanOtherFiltering(true);
    } else {
      onDepartmentCountThree(false);
      setCanOtherFiltering(false);
      setSelectedCountries([]);
    }

    setSelectedDepartments(updatedDepartments);
    applyFilter(updatedDepartments, selectedCountries);
  };

  const handleCountriesChange = (event) => {
    const { value, checked } = event.target;
    let updatedCountries;

    if (checked) {
      updatedCountries = [value, ...selectedCountries];
    } else {
      updatedCountries = selectedCountries.filter(
        (country) => country !== value
      );
    }

    setSelectedCountries(updatedCountries);
    applyFilter(selectedDepartments, updatedCountries);
  };

  const applyFilter = (departments, countries) => {
    let filteredUsers = users;

    if (departments.length > 0) {
      filteredUsers = filteredUsers.filter(user => departments.includes(user.department.value));
    }

    if (departments.length >= 3 && countries.length > 0) {
      filteredUsers = filteredUsers.filter(user => countries.includes(user.country.value));
    }

    onFilterChange(filteredUsers);
  }

  return (
    <>
      <DepartmentsFilter values={{
        selectedDepartments,
        handleDepartmentChange,
        }}/>
        <CountriesFilter values={{
          selectedCountries,
          handleCountriesChange,
          canOtherFiltering,
        }}/>
    </>
  );
};
