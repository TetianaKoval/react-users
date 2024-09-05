import React, { useState, Component, useContext } from "react";
import { DataUsersContext } from "./../../context/DataUsersContext"
import cn from "classnames";
import { Scrollbars } from "react-custom-scrollbars-2";

export const CountriesFilter = ({ values }) => {
  const { countries } = useContext(DataUsersContext);
  const {
    selectedCountries,
    handleCountriesChange,
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
    ...countries.filter((country) =>
      selectedCountries.includes(country.value)
    ),
    ...countries.filter(
      (country) => !selectedCountries.includes(country.value)
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
          Selected country
        </div>

        {isDropdownOpen && (
          <div
            className={cn("filter__list", {
              active: isDropdownOpen,
            })}
          >
            <CustomScrollbars style={{ width: 220, height: 200 }}>
              {sortedCountries && sortedCountries.map((country) => {
                return (
                  <div
                    key={country.value}
                    className={cn("filter__item department",
                      {
                        "filter__item--checked": selectedCountries.includes(
                          country.value
                        ),
                      }
                    )}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value={country.value}
                        onChange={handleCountriesChange}
                        checked={selectedCountries.includes(country.value)}
                      />
                      {country.name}
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