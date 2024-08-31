import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <button className="header__button header__button--edit-users button">
        Edit users
      </button>
      <button className="header__button header__button--users button button--active">
        Users
      </button>
    </header>
  )
}