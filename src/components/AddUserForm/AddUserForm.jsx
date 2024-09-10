import { useContext, useEffect, useRef, useState } from "react";
import "./AddUserForm.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import cn from "classnames";

export const AddUserForm = ({ setShowAddUserForm }) => {
  const { departments, countries, statuses, CustomScrollbars } = useContext(DataUsersContext);
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(["Select department", false]);
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [listDepOpen, setListDepOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddUserForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAddUserForm]);

  return (
    <div className="container-bg">
      <div className="add-user-form" ref={formRef}>
        <h2 className="title">Add User</h2>

        <form className="add-user-form__form form">
          <div className="form__inputs">
            <div className="form__input">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form__input">
              <label htmlFor="department">Department:</label>

              <div
                className={cn("form__input--input", {
                  selected: department[1],
                  "form__input--input-active": listDepOpen,
                })}
                onClick={() => {
                  setListDepOpen(!listDepOpen);
                }}
              >
                {department}
                <span className={cn({
                  'arrow-active': listDepOpen,
                })}></span>
              </div>

              {listDepOpen && (
                <ul className="form__input-list">
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {departments.map((dep) => (
                      <li
                        key={dep.value}
                        onClick={() => {
                          setDepartment([dep.name, true]);
                          setListDepOpen(false);
                        }}
                        className="form__input-item"
                      >
                        {dep.name}
                      </li>
                    ))}
                  </CustomScrollbars>
                </ul>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
