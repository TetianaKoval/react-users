import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UsersContext } from "./../../context/UsersContext";

import { Filter } from "./../Filter";
import { DeleteIcon } from './../DeleteIcon';
import "./Users.scss";

export const Users = () => {
  const { users } = useContext(UsersContext);
  const [ filteredUsers, setFilteredUsers] = useState([]);

  const handleFilterChange = (selectedDepartments) => {
    if (selectedDepartments.length === 0) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(users.filter((user) => {
        return selectedDepartments.includes(user.department.value);
      }))
    }

    console.log(filteredUsers);
  }

  return (
    <div className="users">
      <h1 className="users__title title">Users</h1>
      <div className="filters-container">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <div className="users__table table">
        <div className="table__header">Full Name</div>
        <div className="table__header">Department</div>
        <div className="table__header">Country</div>
        <div className="table__header">Status</div>
        <div className="table__header"></div>

        <div className="table__divider"></div>

        {filteredUsers.map(({ name, status, department, country }) => {
          return (
            <React.Fragment key={name}>
              <div className="table__cell table__cell--name table__cell--start">{name}</div>
              <div className="table__cell">{department.name}</div>
              <div className="table__cell">{country.name}</div>
              <div className="table__cell">{status.name}</div>
              <div className="table__cell table__cell--end"><DeleteIcon /></div>
            </React.Fragment>
          )
        })}
      </div>
      
      <Outlet />
    </div>
  )
}