import { useContext, useEffect, useRef, useState } from "react";
import "./AddUserForm.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import cn from "classnames";

export const AddUserForm = ({ setShowAddUserForm, addUser }) => {
  const { departments, countries, statuses, CustomScrollbars } = useContext(DataUsersContext);
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(["Select department", false, null]);
  const [country, setCountry] = useState(["Select country", false, null]);
  const [status, setStatus] = useState(["Select status", false, null]);
  const [listOpen, setListOpen] = useState([false, false, false]);
  const [enoughInfo, setEnoughInfo] = useState(false);

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

  useEffect(() => {
    if(name.length && department[1] && country[1] && status[1]) {
      setEnoughInfo(true);
    } else {
      setEnoughInfo(false);
    }

  }, [name, department, country, status])

  const hendleSelectItem = (category, selectedItem, selectedValue) => {

    switch (category) {
      case 'departments':
        setDepartment([selectedItem, true, selectedValue]);
        break;

      case 'countries':
        setCountry([selectedItem, true, selectedValue]);
        break;

      case 'statuses':
        setStatus([selectedItem, true, selectedValue]);
        break;

      default:
        console.log("error");
    }

    setListOpen([false, false, false]);
  }

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

            <div
              className="form__input"
              onMouseLeave={() => setListOpen([false, false, false])}
            >
              <label htmlFor="department">Department:</label>

              <div
                className={cn("form__input--input", {
                  selected: department[1],
                  "form__input--input-active": listOpen[0],
                })}
                onClick={() => {
                  setListOpen([!listOpen[0], listOpen[1], listOpen[2]]);
                }}
              >
                {department[0]}
                <span className={cn({
                  'arrow-active': listOpen[0],
                })}></span>
              </div>

              {listOpen[0] && (
                <ul
                  className="form__input-list"
                >
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {departments.map((dep) => (
                      <li
                        key={dep.value}
                        onClick={() => {
                          hendleSelectItem('departments', dep.name, dep.value)
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

            <div
              className="form__input"
              onMouseLeave={() => setListOpen([false, false, false])}
            >
              <label htmlFor="department">Country:</label>

              <div
                className={cn("form__input--input", {
                  selected: country[1],
                  "form__input--input-active": listOpen[1],
                })}
                onClick={() => {
                  setListOpen([listOpen[0], !listOpen[1], listOpen[2]]);
                }}
              >
                {country[0]}
                <span className={cn({
                  'arrow-active': listOpen[1],
                })}></span>
              </div>

              {listOpen[1] && (
                <ul
                  className="form__input-list"
                >
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {countries.map((coun) => (
                      <li
                        key={coun.value}
                        onClick={() => {
                          hendleSelectItem('countries', coun.name, coun.value)
                        }}
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
              className="form__input"
              onMouseLeave={() => setListOpen([false, false, false])}
            >
              <label htmlFor="department">Status:</label>

              <div
                className={cn("form__input--input", {
                  selected: status[1],
                  "form__input--input-active": listOpen[2],
                })}
                onClick={() => {
                  setListOpen([listOpen[0], listOpen[1], !listOpen[2]]);
                }}
              >
                {status[0]}
                <span className={cn({
                  'arrow-active': listOpen[2],
                })}></span>
              </div>

              {listOpen[2] && (
                <ul
                  className="form__input-list"
                  
                >
                  <CustomScrollbars style={{ width: 280, height: 100 }}>
                    {statuses.map((stat) => (
                      <li
                        key={stat.value}
                        onClick={() => {
                          hendleSelectItem('statuses', stat.name, stat.value)
                        }}
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

          <div className="form__submit">
            <div
              className="btn btn--cancel"
              onClick={() => setShowAddUserForm(false)}
            >
              Cancel
            </div>
            <div
              className={cn('btn', {
                'disable': !enoughInfo,
              })}
              onClick={() => {
                addUser({
                  name: name,
                  status: {
                    name: status[0],
                    value: status[2],
                  },
                  department: {
                    name: department[0],
                    value: department[2]
                  },
                  country: {
                    name: country[0],
                    value: country[2]
                  }
                })
              }}
            >Add</div>
          </div>
        </form>
      </div>
    </div>
  );
};
