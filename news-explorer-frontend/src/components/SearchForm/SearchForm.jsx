import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  // 'handleSearch' is passed from App.jsx
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
    } else {
      setError("");
      handleSearch(query); // Pass the search query to App.jsx
      setQuery(""); // Optionally clear the search field after submission
    }
  };

  // Clear error message when user types in the search input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError(""); // Clear error when the user starts typing again
    }
  };

  return (
    <form onSubmit={onSubmit} className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Enter topic"
      />
      {error && <p className="search-error">{error}</p>}
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
