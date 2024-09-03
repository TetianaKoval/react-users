import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./../../context/UserContext"


export const Users = () => {
  const { users } = useContext(UserContext);
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.name}>{user.name}</div>
        )
      })}
      <Outlet />
    </div>
  )
}