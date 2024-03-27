import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/appContext';
import { logoutUser } from '../../services/sessionsService';

export const NavBar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateHome = event => {
    event.preventDefault();
    navigate(`/`);
  };

  const logout = async event => {
    event.preventDefault();
    await logoutUser();
    setUser(null);
  };

  return (
    <nav className="navbar navbar-default navbar-fixed-top w-100">
      <div className="row no-gutters w-100">
        <div className="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
          <div className="row no-gutters">
            <div className="col col-*">
              <a
                className="navbar-brand"
                href="#"
                onClick={navigateHome}
              >
                <span className="navbar-brand mb-0 h1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </span>
              </a>
            </div>
            {user && (
              <div className="col col-auto mx-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search for..."
                  ></input>
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default search-btn"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            )}
            {user && (
              <div className="col col-auto">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center justify-content-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span id="user-icon">{user}</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={event => navigate(`/feed/${user}`)}
                      >
                        {user}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                      >
                        Lists
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                      >
                        Help
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                      >
                        Keyboard shortcuts
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={logout}
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
