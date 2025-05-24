import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import SearchForms from "../SearchForm/SearchForm";

import "./Header.css";

function Header({
  handleLoginClick,
  isLoggedIn,
  handleLogout,
  isSignInModalOpen,
  handleSearch,
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
      {/* Top Navigation Bar */}
      <div className="header__nav-bar">
        {/* Logo */}
        <p
          className={`header__logo ${isSavedNews ? "header__logo--black" : ""}`}
        >
          NewsExplorer
        </p>

        {/* Hamburger menu */}
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
      </div>

      {/* Hero section */}
      <section className="header__hero">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the news on any topic and save them in your personal account.
        </p>
        <SearchForms handleSearch={handleSearch} />
      </section>

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
