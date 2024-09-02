import React from "react";
import { Users } from "./components/Users";
import { HomePage } from "./components/HomePage";
import { EditUsers } from "./components/EditUsers";
import { AddUser } from "./components/AddUser";
import { Routes, Route} from "react-router-dom";
import { App } from "./App";

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="users" element={<Users />}>
        <Route path="add-user" element={<AddUser />} />
      </Route>
      <Route path="edit-users" element={<EditUsers />} />
      <Route path="*" element={<p>Not found</p>} />
    </Route>
  </Routes>
);
