import React from "react";
import { Outlet } from "react-router-dom";

export const Users = () => {
  return (
    <div>
      Here will be users
      <Outlet />
    </div>
  )
}