import React, { useState } from "react";
import "./Results.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFoundImage from "../../assets/not-found.svg";

function Results({
  isLoading,
  error,
  articles,
  showMoreArticles,
  visibleArticles,
  handleCardLike,
  handleCardDelete,
  savedArticles,
  isLoggedIn,
}) {
  console.log("Results component received:", { articles, isLoading, error });

  if (isLoading) {
    return (
      <div className="results-list">
        <div className="results-list__page-title">Search Results</div>
        <div className="results-list__preloader">
          <Preloader />
          <div>Searching for news...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results">
        <img
          className="results__image"
          src={notFoundImage}
          alt="Not Found Image"
        ></img>
        <p>
          <span className="results__not-found-title">Nothing found</span>{" "}
        </p>
        <span className="results__not-found-description">
          Sorry, but nothing matched your search terms.
        </span>
      </div>
    );
  }

  return (
    <div className="results-list">
      <div className="results-list__page-title">Search Results</div>
      {Array.isArray(articles) && articles.length > 0 && (
        <div className="results-list__cards">
          {articles.slice(0, visibleArticles).map((article, index) => {
            console.log("Rendering article:", article.title || article);
            return (
              <NewsCard
                key={index}
                article={article}
                isLoggedIn={isLoggedIn}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                savedArticles={savedArticles}
              />
            );
          })}
        </div>
      )}
      {visibleArticles < articles.length && (
        <button className="result-show-more" onClick={showMoreArticles}>
          Show More
        </button>
      )}
    </div>
  );
}

export default Results;
