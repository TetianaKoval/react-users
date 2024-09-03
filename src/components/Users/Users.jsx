import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UsersContext } from "./../../context/UsersContext";
import { DataUsersContext } from "./../../context/DataUsersContext";
import { DeleteIcon } from './../DeleteIcon';
import "./Users.scss";


export const Users = () => {
  const { users } = useContext(UsersContext);

  const { departments } = useContext(DataUsersContext);
  return (
    <div className="users">
      <h1 className="users__title title">Users</h1>
      <div className="users__filter">
        {departments.map(department => {
          return(
            <React.Fragment key={department.name}>
              {department.name}
            </React.Fragment >
          )
        })}
      </div>
      <div className="users__table table">
        <div className="table__header">Full Name</div>
        <div className="table__header">Department</div>
        <div className="table__header">Country</div>
        <div className="table__header">Status</div>
        <div className="table__header"></div>

        <div className="table__divider"></div>

        {users.map(({ name, status, department, country }) => {
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