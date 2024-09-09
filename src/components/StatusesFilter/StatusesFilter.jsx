import React, { useState, Component, useContext } from "react";
import { DataUsersContext } from "./../../context/DataUsersContext"
import cn from "classnames";
import { Scrollbars } from "react-custom-scrollbars-2";

export const StatusesFilter = ({ values }) => {
  const { statuses } = useContext(DataUsersContext);
  const {
    selectedStatuses,
    handleStatusesChange,
    canOtherFiltering,
  } = values;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const sortedCountries = [
    ...statuses.filter((status) =>
      selectedStatuses.includes(status.value)
    ),
    ...statuses.filter(
      (status) => !selectedStatuses.includes(status.value)
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
    <div
        className={cn("filter", {
          active: isDropdownOpen,
          disable: !canOtherFiltering,
        })}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onClick={toggleDropdown}
          className={cn("filter__status", {
            active: isDropdownOpen,
          })}
        >
          Select status
        </div>

        {isDropdownOpen && (
          <div
            className={cn("filter__list", {
              active: isDropdownOpen,
            })}
          >
            <CustomScrollbars style={{ width: 220, height: 200 }}>
              {sortedCountries && sortedCountries.map((status) => {
                return (
                  <div
                    key={status.value}
                    className={cn("filter__item department",
                      {
                        "filter__item--checked": selectedStatuses.includes(
                          status.value
                        ),
                      }
                    )}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value={status.value}
                        onChange={handleStatusesChange}
                        checked={selectedStatuses.includes(status.value)}
                      />
                      {status.name}
                    </label>
                  </div>
                );
              })}
            </CustomScrollbars>
          </div>
        )}
      </div>
  )
}