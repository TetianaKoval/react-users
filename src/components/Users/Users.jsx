import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { AddUserForm } from "../AddUserForm/AddUserForm";
import { UsersContext } from "./../../context/UsersContext";

import { Filter } from "./../Filter";
import { DeleteIcon } from './../DeleteIcon';
import "./Users.scss";

export const Users = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleFilterChange = (filteredUsersList) => {
    setFilteredUsers(filteredUsersList);
  };

  const hendlerClickOnAddUserBtn = () => {
    setShowAddUserForm(!showAddUserForm);
  }

  const addUser = (newUser) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    setShowAddUserForm(false);
  };

  return (
    <div className="users">
      <h1 className="users__title title">Users</h1>

      {!showHelpMessage && (
        <p className="users__help-message">
          Please add at least 3 departmetns to be able to proceed next steps
        </p>
      )}

      <div className="users__filters-container">
        <Filter onFilterChange={handleFilterChange} onDepartmentCountThree={setShowHelpMessage} />
        <div className="users__add-user-container">
          <div
            className="users__add-user-btn"
            onClick={hendlerClickOnAddUserBtn}
          >
            Add User
          </div>
        </div>
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

      {showAddUserForm && (
        <AddUserForm
          setShowAddUserForm={setShowAddUserForm}
          addUser={addUser}
        />
      )}

      <Outlet />
    </div>
  )
}