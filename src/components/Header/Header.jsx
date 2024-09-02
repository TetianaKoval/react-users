import './Header.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Header = () => {
  return (
    <header className="header">
      <NavLink
        to="/edit-users"
        className={({ isActive }) =>
          cn('header__button', 'header__button--edit-users', 'button',
            {'button--active': isActive}
          )
        }
      >
        Edit users
      </NavLink>
      <NavLink 
        to="/users"
        className={({ isActive }) =>
          cn('header__button', 'header__button--edit-users', 'button',
            {'button--active': isActive}
          )
        }
      >
        Users
      </NavLink>
    </header>
  )
}