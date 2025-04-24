import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import "../Header/Header.css";

const Header = ({
  handleLoginClick,
  isLoggedIn,
  handleLogoutClick,
  isSignInModalOpen,
}) => {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`header ${menuOpen ? "menu-open" : ""} ${
        isSavedNews ? "header--saved-news" : ""
      }`}
    >
      {/* LOGO */}
      <div
        className={`header__logo ${isSavedNews ? "header__logo--black" : ""}`}
      >
        NewsExplorer
      </div>
      {/* HAMBURGER MENU ICON */}
      <button
        className={`header__menu-icon ${
          isSavedNews ? "header__menu-icon--black" : ""
        } ${
          menuOpen || window.innerWidth > 420 || isSignInModalOpen
            ? "hidden"
            : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>
      {/* DESKTOP NAVIGATION */}
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
                ? "header__button-saved-news_active"
                : "header__button-saved-news"
            }
          >
            Saved Articles
          </Link>
        )}
        {isLoggedIn ? (
          <p
            onClick={handleLogoutClick}
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
      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <nav className="mobile__dropdown">
          <Link
            to="/"
            className="mobile__dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className="mobile__dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          )}
          {isLoggedIn ? (
            <button
              className="mobile__dropdown-signin_button"
              onClick={() => {
                handleLogoutClick();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="mobile__dropdown-signin_button"
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
};

export default Header;
