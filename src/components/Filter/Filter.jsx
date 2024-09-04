import React, { useContext, useState } from "react";
import "./Filter.scss";
import { DataUsersContext } from "./../../context/DataUsersContext";
import cn from "classnames";


export const Filter = ({onFilterChange}) => {
  const { departments } = useContext(DataUsersContext);

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedDepartments;

    if (checked) {
      updatedDepartments = [value, ...selectedDepartments];
    } else {
      updatedDepartments = selectedDepartments.filter(department => department !== value);
    }

    setSelectedDepartments(updatedDepartments);
    onFilterChange(updatedDepartments);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const sortedDepartments = [
    ...departments.filter(department => selectedDepartments.includes(department.value)),
    ...departments.filter(department => !selectedDepartments.includes(department.value))
  ]


  return (
    <div
      className={cn('filter', 
        {
          'active': isDropdownOpen,
        })
      }
    >
      <div
        onClick={toggleDropdown}
        className={cn('filter__status', 
          {
            'active': isDropdownOpen,
          })
        }
      >
        Selected(
          {selectedDepartments.length}
        )
      </div>

      {isDropdownOpen && (
        <div
          className={cn('filter__list', 
            {
              'active': isDropdownOpen,
            })
          }
        >
          {sortedDepartments.map(department => {
            return (
              <div
                key={department.value}
                className={cn('filter__item depurtment')}
              >
                <input
                  type="checkbox"
                  value={department.value}
                  onChange={handleCheckboxChange}
                  checked={selectedDepartments.includes(department.value)}
                />
                {department.name}
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}