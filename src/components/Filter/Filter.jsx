import React, { useContext, useState, Component } from "react";
import "./Filter.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import cn from "classnames";
import { Scrollbars } from "react-custom-scrollbars-2";

export const Filter = ({ onFilterChange }) => {
  const { departments } = useContext(DataUsersContext);

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedDepartments;

    if (checked) {
      updatedDepartments = [value, ...selectedDepartments];
    } else {
      updatedDepartments = selectedDepartments.filter(
        (department) => department !== value
      );
    }

    setSelectedDepartments(updatedDepartments);
    onFilterChange(updatedDepartments);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortedDepartments = [
    ...departments.filter((department) =>
      selectedDepartments.includes(department.value)
    ),
    ...departments.filter(
      (department) => !selectedDepartments.includes(department.value)
    ),
  ];

  class CustomScrollbars extends Component {
    render() {
      return (
        <Scrollbars
          renderThumbVertical={(props) => (
            <div {...props} className="thumb-vertical" />
          )}
        >
          {this.props.children}
        </Scrollbars>
      );
    }
  }

  return (
    <>
      <div
        className={cn("filter", {
          active: isDropdownOpen,
        })}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onClick={toggleDropdown}
          className={cn("filter__status", {
            active: isDropdownOpen,
          })}
        >
          Selected(
          {selectedDepartments.length})
        </div>

        {isDropdownOpen && (
          <div
            className={cn("filter__list", {
              active: isDropdownOpen,
            })}
          >
            <CustomScrollbars style={{ width: 220, height: 200 }}>
              {sortedDepartments.map((department) => {
                return (
                  <div
                    key={department.value}
                    className={cn("filter__item department", {
                      "filter__item--checked": selectedDepartments.includes(
                        department.value
                      ),
                    })}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value={department.value}
                        onChange={handleCheckboxChange}
                        checked={selectedDepartments.includes(department.value)}
                      />
                      {department.name}
                    </label>
                  </div>
                );
              })}
            </CustomScrollbars>
          </div>
        )}
      </div>
    </>
  );
};
