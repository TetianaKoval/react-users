import React, { useContext, useEffect, useState } from "react";
import { DataUsersContext } from "./../../context/DataUsersContext";
import { UsersContext } from "./../../context/UsersContext";
import "./EditUsers.scss";
import cn from "classnames";

export const EditUsers = () => {
  const { departments, countries, statuses, CustomScrollbars } =
    useContext(DataUsersContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [ediedName, setEdiedName] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { users, setUsers } = useContext(UsersContext);
  const [listUsersNamesOpen, setListUsersNamesOpen] = useState(false);
  const [listDepartmentsOpen, setListDepartmentsOpen] = useState(false);
  const [listCountriesOpen, setListCountriesOpen] = useState(false);
  const [listStatusesOpen, setListStatusesOpen] = useState(false);
  const [addUndo, setAddUndo] = useState(false);

  const handleUserSelect = (dataUser) => {
    setSelectedUser(dataUser);
    setListUsersNamesOpen(false);
    setSelectedDepartment(null);
    setSelectedCountry(null);
    setSelectedStatus(null);
    setName(dataUser.name);
    setEdiedName(false);
  };

  const handleDepartmentSelect = (dep) => {
    setSelectedDepartment([dep.name, dep.value]);
    setListDepartmentsOpen(false);

    if (dep.name === selectedUser.department.name) {
      setSelectedDepartment(null);
    }
  };

  const handleCountrySelect = (coun) => {
    setSelectedCountry([coun.name, coun.value]);
    setListCountriesOpen(false);

    if (coun.name === selectedUser.country.name) {
      setSelectedCountry(null);
    }
  };

  const handleStatusSelect = (stat) => {
    setSelectedStatus([stat.name, stat.value]);
    setListStatusesOpen(false);

    if (stat.name === selectedUser.status.name) {
      setSelectedStatus(null);
    }
  };

  const setNewFullName = (newName) => {
    if (newName !== selectedUser.name) {
      setEdiedName(true);
    } else {
      setEdiedName(false);
    }

    setName(newName);
  };

  const saveEditUserInfo = () => {
    const newUsers = [...users].map(user => {
      if (user.name === selectedUser.name) {
        return {
          name: name,
          status: {
            name: selectedStatus ? selectedStatus[0] : user.status.name,
            value: selectedStatus ? selectedStatus[1] : user.status.value,
          },
          department: {
            name: selectedDepartment ? selectedDepartment[0] : user.department.name,
            value: selectedDepartment ? selectedDepartment[1] : user.department.value,
          },
          country: {
            name: selectedCountry ? selectedCountry[0] : user.country.name,
            value: selectedCountry ? selectedCountry[1] : user.country.value,
          }
        }
      } else {
        return user;
      }
    })

    setUsers([...newUsers]);

    setSelectedUser(null)

    setSelectedDepartment(null);
    setSelectedCountry(null);
    setSelectedStatus(null);
    setName('');
    setEdiedName(false);
  }

  useEffect(() => {
    if (selectedDepartment || selectedCountry || selectedStatus || ediedName) {
      setAddUndo(true);
    } else {
      setAddUndo(false);
    }
  }, [selectedDepartment, selectedCountry, selectedStatus, ediedName]);

  return (
    <div className="edit-user">
      <h1 className="edit-user__title title">Edit user</h1>

      <div
        className="form__input edit-user__input edit-user__input--users"
        onMouseLeave={() => setListUsersNamesOpen(false)}
      >
        <label htmlFor="name">User</label>
        <div
          className={cn("form__input--input", {
            selected: selectedUser,
            "form__input--input-active": listUsersNamesOpen,
          })}
          onClick={() => setListUsersNamesOpen(!listUsersNamesOpen)}
        >
          {selectedUser ? selectedUser.name : "Select User"}
          <span
            className={cn({
              "arrow-active": listUsersNamesOpen,
            })}
          ></span>
        </div>

        {listUsersNamesOpen && (
          <ul className="form__input-list">
            <CustomScrollbars style={{ width: 280, height: 100 }}>
              {users.map((user) => (
                <li
                  key={user.name}
                  onClick={() => handleUserSelect(user)}
                  className="form__input-item"
                >
                  {user.name}
                </li>
              ))}
            </CustomScrollbars>
          </ul>
        )}
      </div>

      {selectedUser && (
        <div>
          <div className="edit-user__sub-title">User Information</div>
          <div className="edit-user__form">
            <div className="form__input edit-user__input">
              <label htmlFor="name">Full name</label>

              <input
                className={cn("form__input--input", {
                  selected: ediedName,
                })}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setNewFullName(e.target.value)}
                required
                placeholder={selectedUser.name}
              />
            </div>

            <div
              className="form__input edit-user__input"
              onMouseLeave={() => setListDepartmentsOpen(false)}
            >
              <label htmlFor="department">Department</label>
              <div
                className={cn("form__input--input", {
                  selected: selectedDepartment,
                  "form__input--input-active": listDepartmentsOpen,
                })}
                onClick={() => setListDepartmentsOpen(!listDepartmentsOpen)}
              >
                { selectedDepartment ? selectedDepartment[0] : selectedUser.department.name }
                <span
                  className={cn({
                    "arrow-active": listDepartmentsOpen,
                  })}
                ></span>
              </div>

              {listDepartmentsOpen && (
                <ul className="form__input-list">
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {departments.map((dep) => (
                      <li
                        key={dep.name}
                        onClick={() => handleDepartmentSelect(dep)}
                        className="form__input-item"
                      >
                        {dep.name}
                      </li>
                    ))}
                  </CustomScrollbars>
                </ul>
              )}
            </div>

            <div
              className="form__input edit-user__input"
              onMouseLeave={() => setListCountriesOpen(false)}
            >
              <label htmlFor="name">Country</label>
              <div
                className={cn("form__input--input", {
                  selected: selectedCountry,
                  "form__input--input-active": listCountriesOpen,
                })}
                onClick={() => setListCountriesOpen(!listCountriesOpen)}
              >
                { selectedCountry ? selectedCountry[0] : selectedUser.country.name}
                <span
                  className={cn({
                    "arrow-active": listCountriesOpen,
                  })}
                ></span>
              </div>

              {listCountriesOpen && (
                <ul className="form__input-list">
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {countries.map((coun) => (
                      <li
                        key={coun.name}
                        onClick={() => handleCountrySelect(coun)}
                        className="form__input-item"
                      >
                        {coun.name}
                      </li>
                    ))}
                  </CustomScrollbars>
                </ul>
              )}
            </div>

            <div
              className="form__input edit-user__input"
              onMouseLeave={() => setListStatusesOpen(false)}
            >
              <label htmlFor="name">Status</label>
              <div
                className={cn("form__input--input", {
                  selected: selectedStatus,
                  "form__input--input-active": listStatusesOpen,
                })}
                onClick={() => setListStatusesOpen(!listStatusesOpen)}
              >
                {selectedStatus ? selectedStatus[0] : selectedUser.status.name}
                <span
                  className={cn({
                    "arrow-active": listStatusesOpen,
                  })}
                ></span>
              </div>

              {listStatusesOpen && (
                <ul className="form__input-list">
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {statuses.map((stat) => (
                      <li
                        key={stat.name}
                        onClick={() => handleStatusSelect(stat)}
                        className="form__input-item"
                      >
                        {stat.name}
                      </li>
                    ))}
                  </CustomScrollbars>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="edit-user__buttons">
        {addUndo && (
          <div className="btn btn--undo" onClick={() => handleUserSelect(selectedUser)}>
            Undo
          </div>
        )}

        {selectedUser && (
          <div
            className={cn("btn", {
              'disable': !addUndo,
            })}
            onClick={saveEditUserInfo}
          >
            Save
          </div>
        )}
        
      </div>
    </div>
  );
};
