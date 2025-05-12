import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import "./Header.css";

[...document.querySelectorAll("*")].forEach((el) => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log("Overflowing element:", el);
  }
});

function Header({
  handleLoginClick,
  isLoggedIn,
  handleLogout,
  isSignInModalOpen,
}) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`header ${menuOpen ? "menu-open" : ""} ${
        isSavedNews ? "header--saved-news" : ""
      }`}
    >
      <div
        className={`header__logo ${isSavedNews ? "header__logo--black" : ""}`}
      >
        NewsExplorer
      </div>

      <button
        className={`header__menu-icon ${
          isSavedNews ? "header__menu-icon--black" : ""
        } 
          ${
            menuOpen || window.innerWidth > 420 || isSignInModalOpen
              ? "hidden"
              : ""
          }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="header__desktop-nav">
        <Link
          to="/"
          className={
            isSavedNews ? "header__button-home_active" : "header__button-home"
          }
        >
          Home
        </Link>
        {isLoggedIn && (
          <Link
            to="/saved-news"
            className={
              isSavedNews
                ? "header__button-saved_active"
                : "header__button-saved"
            }
          >
            Saved Articles
          </Link>
        )}
        {isLoggedIn ? (
          <p
            onClick={handleLogout}
            className={
              isSavedNews
                ? "header__button-logout_active"
                : "header__button-logout"
            }
          >
            Logout
          </p>
        ) : (
          <p
            onClick={handleLoginClick}
            className={
              isSavedNews
                ? "header__button-signin_active"
                : "header__button-signin"
            }
          >
            Sign In
          </p>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="header__mobile-dropdown">
          <Link
            to="/"
            className="header__mobile-dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className="header__mobile-dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          )}
          {isLoggedIn ? (
            <button
              className={`header__mobile-dropdown-signin_button ${
                isSavedNews
                  ? "header__mobile-dropdown-signin_button--black"
                  : ""
              }`}
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="header__mobile-dropdown-signin_button"
              onClick={() => {
                handleLoginClick();
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
