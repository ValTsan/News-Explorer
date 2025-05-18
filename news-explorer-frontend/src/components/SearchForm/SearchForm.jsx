import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
    } else {
      setError("");
      handleSearch(query);
      setQuery("");
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError("");
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
