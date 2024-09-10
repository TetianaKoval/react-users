import React, { useContext, useState } from "react";
import "./Filter.scss";
import { UsersContext } from "./../../context/UsersContext";
import { DepartmentsFilter } from "./../DepartmentsFilter";
import { CountriesFilter } from "./../CountriesFilter";
import { StatusesFilter } from "./../StatusesFilter";

export const Filter = ({ onFilterChange, onDepartmentCountThree }) => {
  const { users } = useContext(UsersContext);

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
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
      setSelectedStatuses([]);
    }

    setSelectedDepartments(updatedDepartments);
    applyFilter(updatedDepartments, selectedCountries, selectedStatuses);
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
    applyFilter(selectedDepartments, updatedCountries, selectedStatuses);
  };

  const handleStatusesChange = (event) => {
    const { value, checked } = event.target;
    let updatedStatuses;

    if (checked) {
      updatedStatuses = [value, ...selectedStatuses];
    } else {
      updatedStatuses = selectedStatuses.filter(
        (status) => status !== value
      );
    }

    setSelectedStatuses(updatedStatuses);
    applyFilter(selectedDepartments, selectedCountries, updatedStatuses);
  };

  const applyFilter = (departments, countries, statuses) => {
    let filteredUsers = users;

    if (departments.length > 0) {
      filteredUsers = filteredUsers.filter(user => departments.includes(user.department.value));
    }

    if (departments.length >= 3 && countries.length > 0) {
      filteredUsers = filteredUsers.filter(user => countries.includes(user.country.value));
    }

    if (departments.length >= 3 && statuses.length > 0) {
      filteredUsers = filteredUsers.filter(user => statuses.includes(user.status.value));
    }

    onFilterChange(filteredUsers);
  }

  const handleDeleteFilter = () => {
    applyFilter([], [], [])
    setSelectedDepartments([]);
    onDepartmentCountThree(false);
    setCanOtherFiltering(false);
    setSelectedCountries([]);
    setSelectedStatuses([]);
    onFilterChange([])
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
        <StatusesFilter values={{
          selectedStatuses,
          handleStatusesChange,
          canOtherFiltering,
        }} />
        <div
          className="filter__clear-filters"
          onClick={handleDeleteFilter}
        ></div>
    </>
  );
};
