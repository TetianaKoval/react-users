import React, { useContext, useState } from "react";
import "./Filter.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import { DepartmentsFilter } from "./../DepartmentsFilter";

export const Filter = ({ onFilterChange }) => {
  const { departments } = useContext(DataUsersContext);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedDepartments;

    if (checked) {
      updatedDepartments = [value, ...selectedDepartments];
    } else {
      updatedDepartments = selectedDepartments.filter(
        (department) => department !== value
      );
    }

    setSelectedDepartments(updatedDepartments);
    onFilterChange(updatedDepartments);
  };

  const sortedDepartments = [
    ...departments.filter((department) =>
      selectedDepartments.includes(department.value)
    ),
    ...departments.filter(
      (department) => !selectedDepartments.includes(department.value)
    ),
  ];

  return (
    <>
      <DepartmentsFilter values={{selectedDepartments, sortedDepartments, handleCheckboxChange}}/>
    </>
  );
};
