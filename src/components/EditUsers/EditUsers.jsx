import React, { useContext, useState } from "react";
import { DataUsersContext } from "./../../context/DataUsersContext";
import { UsersContext } from "./../../context/UsersContext";
import "./EditUsers.scss";
import cn from "classnames";

export const EditUsers = () => {
  const { CustomScrollbars } =
    useContext(DataUsersContext);

  const [selectedUserName, setSelectedUserName] = useState(null);
  const { users } = useContext(UsersContext);
  const [listOpen, setListOpen] = useState(false);

  const handleUserSelect = (name) => {
    setSelectedUserName(name);
    setListOpen(false);
  }

  return (
    <div className="edit-user">
      <h1 className="edit-user__title title">Edit user</h1>

      <div className="form__input edit-user__input">
        <label htmlFor="name">User</label>
        <div
          className={cn("form__input--input", {
            'selected': selectedUserName,
            "form__input--input-active": listOpen,
          })}
          onClick={() => setListOpen(!listOpen)}
        >
            {selectedUserName || 'Select User'}
            <span
              className={cn({
                "arrow-active": listOpen,
              })}
            ></span>
          </div>

          {listOpen && (
            <ul className="form__input-list">
              <CustomScrollbars style={{ width: 280, height: 100 }}>
                {users.map((user) => (
                  <li
                    key={user.value}
                    onClick={() => handleUserSelect(user.name)}
                    className="form__input-item"
                  >
                    {user.name}
                  </li>
                ))}
              </CustomScrollbars>
            </ul>
          )}
      </div>
    </div>
  );
};
